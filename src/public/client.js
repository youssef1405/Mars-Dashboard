let store = Immutable.Map({
  headerTitle: 'Mars Dashboard',
  menuTitle: 'Discover Mars Rovers',
  rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
});

// add our markup to the page
const root = document.getElementById('root');

/**
 * updates the state of the app based on the rover selected by the user
 * @param {*} store the state of the app
 * @param {*} newState rover data
 * @returns return an updated state
 */
const updateStore = (store, newState) => {
  return store.merge(newState);
};

/**
 * add html to the root element by calling the App() function
 * @param {*} root an elements containing all the compoenents of the app
 * @param {*} state state of the app
 */
const render = async (root, state) => {
  root.innerHTML = App(state);
  document.querySelectorAll('.rover-btn').forEach((btn) => {
    btn.addEventListener('click', handleClick);
  });
};

/**
 * This function gets called when user clicks a button
 * it updates the state of the app with the rover data
 * then re-render the components of the app
 */
const handleClick = async (e) => {
  const newState = await getRoverData(e.target.textContent);
  render(root, updateStore(store, newState));
};

/**
 * gets rover data
 * @param {*} roverName
 * @returns data about a rover
 */
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

/*--------------------- BEGIN COMPONENTS SECTION-------------------*/
/**
 * populates the root element with html
 * @param {*} state state of the app
 * @returns html of all html of the app
 */
const App = (state) => {
  const rovers = state.get('rovers').toJS();
  const createHeader = createHtml('h1');
  const createFooter = createHtml('div');
  return `
    <header id='header'>${createHeader(
      state.get('headerTitle'),
      'title'
    )}</header>

    <main id='main'>
      ${createMenu(rovers, state.get('menuTitle'))}
      ${state.get('name') ? createRoverSection(state) : ''}
    </main>

    <footer id='footer'>${createFooter(
      'Copyright© 2022. Youssef Girgeis Built with LOVE ❤',
      'copyright'
    )}</footer>
  `;
};

// higher order function to create the header and footer
const createHtml = (elem) => {
  return (text, className) => {
    return `<${elem} class="${className}">${text}</${elem}>`;
  };
};

/**
 * creates button elements based on the rovers names
 * @param {*} rovers array of rovers names
 * @returns a text which represent the html of three buttons
 */
const createBtns = (rovers) => {
  const btns = rovers.map(
    (rover) => `<button class='rover-btn''>${rover}</button>`
  );
  return btns.join(' ');
};

/**
 * creates a menu based on the buttons created above
 * @param {*} rovers array of rovers names
 * @param {*} menuTitle title of the menu
 * @returns html container containing the the button created in the function above
 */
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

/**
 * create an html section representing info about a rover
 * @param {*} state the updated state
 * @returns html of the rover info: image, status, landing date, etc...
 */
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
