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
      ${createMain(rovers)}
    </main>
    <section class='rover-data'>
    ${state.get('name') ? displayRover(state) : ''}
    </section>
    <footer id='footer'>${createFooter()}</footer>
  `;
};

// listening for load event because page should load before any JS is called
// window.addEventListener('load', () => {

// });

const handleClick = async (e) => {
  if (e.textContent) {
    const newState = await getRoverData(e.textContent);
    //updateStore(store, newState);
    //console.log(store.toJS());
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

const createMain = (rovers) => {
  return `
    <h2 class='main-title'>Discover Mars Rovers</h2>
    <div class='btns-container'>
      ${createBtns(rovers)}
    </div>
  `;
};

const displayRover = (state) => {
  console.log(state.toJS());
  console.log(state.get('name'));
  console.log(state.get('rovers'));
  return `
    <div>
      <img src="" alt="">
      <div class="rover-info">
        <div class="rover-name">Rover: ${state.get('name')}</div>
        <div class="img-date">Image Taken on: ${state.get('earth_date')}</div>
        <div class="rover-status">Status: ${state.get('status')}</div>
        <div class="rover-launch-date">Launch Date: ${state.get(
          'launch_date'
        )}</div>
        <div class="rover-landing-date">Landing Date: ${state.get(
          'landing_date'
        )}</div>
      </div>
    </div>
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

render(root, store);
