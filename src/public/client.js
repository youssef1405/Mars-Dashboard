const store = Immutable.Map({
  rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
});

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  // store = Object.assign(store, newState);
  const updatedStore = store.merge(newState);
  console.log(updatedStore.toJS());
  render(root, store);
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
    <footer id='footer'>${createFooter()}</footer>
  `;
};

// listening for load event because page should load before any JS is called
// window.addEventListener('load', () => {

// });

const handleClick = async (e) => {
  if (e.textContent) {
    const newState = await getRoverData(e.textContent);
    console.log(newState);
    updateStore(store, newState);
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

const createMain = (rovers) => {
  return `
    <h2 class='main-title'>Discover Mars Rovers</h2>
    <div class='btns-container'>
      <button class='rover-btn' onclick='handleClick(this)'>${rovers[0]}</button>
      <button class='rover-btn' onclick='handleClick(this)'>${rovers[1]}</button>
      <button class='rover-btn' onclick='handleClick(this)'>${rovers[2]}</button>
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
