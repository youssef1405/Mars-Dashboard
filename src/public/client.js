let store = Immutable.Map({
  rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
});

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  // store = Object.assign(store, newState);
  let updatedStore = store.merge(newState);
  console.log(updatedStore.toJS());
  // render(root, updatedStore);
  return updatedStore;
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  const rovers = state.get('rovers').toJS();
  return `
    <header id='header'>${createHeader()}</header>
    <main id='main'>
      ${createMenu(rovers)}

      ${state.get('name') ? displayRover(state) : ''}
    </main>
   
    

    <footer id='footer'>${createFooter()}</footer>
  `;
};

const handleClick = async (e) => {
  if (e.textContent) {
    const newState = await getRoverData(e.textContent);
    render(root, updateStore(store, newState));
  }
};

// ------------------------------------------------------  COMPONENTS

const createHeader = () => {
  return `
  <img src="" alt="" />
  <h1 class="title">Mars Dashboard</h1>
  `;
};

const createFooter = () => {
  return `
    <p>Copyright© 2022. Youssef Girgeis Built with LOVE ❤</p>
  `;
};

const createBtns = (rovers) => {
  const btns = rovers.map(
    (rover) =>
      `<button class='rover-btn' onclick='handleClick(this)'>${rover}</button>`
  );
  return btns.join(' ');
};

const createMenu = (rovers) => {
  return `
    <section class="rovers-menu">
      <h2 class='main-title'>Discover Mars Rovers</h2>
      <div class='btns-container'>
        ${createBtns(rovers)}
      </div>
    </section>
  `;
};

const displayRover = (state) => {
  console.log(state.toJS());
  console.log(state.get('name'));
  console.log(state.get('rovers'));
  return `
    <section class="rover-data">
      <img src="${state.get('img_src')}" class="rover-img" alt="">
      <div class="rover-info">
        <div class="rover-name"><b>Rover:</b> ${state.get('name')}</div>
        <div class="img-date"><b>Image Date:</b> ${state.get(
          'earth_date'
        )}</div>
        <div class="rover-status"><b>Status:</b> ${state.get('status')}</div>
        <div class="rover-launch-date"><b>Launch Date:</b> ${state.get(
          'launch_date'
        )}</div>
        <div class="rover-landing-date"><b>Landing Date:</b> ${state.get(
          'landing_date'
        )}</div>
      </div>
    </section>
  `;
};

const getRoverData = async (roverName) => {
  try {
    const response = await fetch(`http://localhost:3000/rover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roverName }),
    });
    const roverData = await response.json();
    return roverData;
  } catch (error) {
    console.log(error);
  }
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
  render(root, store);
});
