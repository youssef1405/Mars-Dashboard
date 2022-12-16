const store = Immutable.Map({
  rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
});

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
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

  //   return `
  //         <header></header>
  //         <main>
  //             ${Greeting(store.user.name)}
  //             <section>
  //                 <h3>Put things on the page!</h3>
  //                 <p>Here is an example section.</p>
  //                 <p>
  //                     One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
  //                     the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
  //                     This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
  //                     applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
  //                     explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
  //                     but generally help with discoverability of relevant imagery.
  //                 </p>
  //                 ${ImageOfTheDay(apod)}
  //             </section>
  //         </main>
  //         <footer></footer>
  //     `;
  // return `
  //   <div class="btns-container">
  //   ${renderRoversBtns(state)}
  //   </div>
  // `;
};

const renderRoversBtns = (state) => {
  const rovers = state.get('rovers').toJS();
  return rovers
    .map((rover) => {
      return `<button class="rover-btn ${rover}-btn">${rover}</button>`;
    })
    .join('');
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
  render(root, store);
  //   document
  //     .querySelector('.rover')
  //     .addEventListener('click', (e) => console.log(e.target.textContent));

  document.querySelectorAll('.rover-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      getRoverData(e.target.textContent);
    });
    // console.log(btn);
  });
});

// ------------------------------------------------------  COMPONENTS

const createHeader = () => {
  return `
  <img src="" alt="" />
  <h1 class="title">Mars Dashboard</h1>
  `;
};

const createFooter = () => {
  return `
    <p>Copyright© 2022. Youssed Girgeis Built with LOVE ❤</p>
  `;
};

const createMain = (rovers) => {
  return `
    <h2 class='main-title'>Discover Mars Rovers</h2>
    <div class='btns-container'>
      <button class='rover-btn'>${rovers[0]}</button>
      <button class='rover-btn'>${rovers[1]}</button>
      <button class='rover-btn'>${rovers[2]}</button>
    </div>
  `;
};

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
// const Greeting = (name) => {
//   if (name) {
//     return `
//             <h1>Welcome, ${name}!</h1>
//         `;
//   }

//   return `
//         <h1>Hello!</h1>
//     `;
// };

// Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {
//   // If image does not already exist, or it is not from today -- request it again
//   const today = new Date();
//   const photodate = new Date(apod.date);
//   console.log(photodate.getDate(), today.getDate());

//   console.log(photodate.getDate() === today.getDate());
//   if (!apod || apod.date === today.getDate()) {
//     getImageOfTheDay(store);
//   }

//   // check if the photo of the day is actually type video!
//   if (apod.media_type === 'video') {
//     return `
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `;
//   } else {
//     return `
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `;
//   }
// };

// ------------------------------------------------------  API CALLS

// Example API call
// const getImageOfTheDay = (state) => {
//   let { apod } = state;

//   fetch(`http://localhost:3000/apod`)
//     .then((res) => res.json())
//     .then((apod) => updateStore(store, { apod }));

//   return data;
// };

const getRoverData = async (roverName) => {
  //   console.log(roverName);
  const response = await fetch(`http://localhost:3000/rover`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ roverName }),
  });

  try {
    const { name, img_src, landing_date, launch_date, status } =
      await response.json();
    console.log(img_src);
    // return roverData;
  } catch (error) {
    console.log(error);
  }
};
