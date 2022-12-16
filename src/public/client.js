let store = Immutable.Map({
  headerTitle: 'Mars Dashboard',
  menuTitle: 'Discover Mars Rovers',
  rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
});

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  let updatedStore = store.merge(newState);
  console.log(updatedStore.toJS());
  return updatedStore;
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

/*--------------------- BEGIN COMPONENTS SECTION-------------------*/

const App = (state) => {
  const rovers = state.get('rovers').toJS();
  return `
    <header id='header'>${createHeader(state.get('headerTitle'))}</header>
    <main id='main'>
      ${createMenu(rovers, state.get('menuTitle'))}
      ${state.get('name') ? createRoverSection(state) : ''}
    </main>
    <footer id='footer'>${createFooter()}</footer>
  `;
};

const createHeader = (title) => {
  return `
  <img src="" alt="" />
  <h1 class="title">${title}</h1>
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

const createMenu = (rovers, menuTitle) => {
  return `
    <section class="rovers-menu">
      <h2 class='main-title'>${menuTitle}</h2>
      <div class='btns-container'>
        ${createBtns(rovers)}
      </div>
    </section>
  `;
};

const createRoverSection = (state) => {
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

/*--------------------- END COMPONENTS SECTION-------------------*/

const handleClick = async (e) => {
  if (e.textContent) {
    const newState = await getRoverData(e.textContent);
    await render(root, updateStore(store, newState));
  }
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
