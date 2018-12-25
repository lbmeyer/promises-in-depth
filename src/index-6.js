// using promise resolve 

// #region Setup
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function getFilmTitles(films) {
  return films
    .sort((a, b) => a.episode_id - b.episode_id)
    .map(film => `${film.episode_id}. ${film.title}`)
    .join("\n");
}
// #endregion

// If we didn't resolve $.getJSON, the code won't run since Jquery 
// doesn't have method finally(). Promise.resolve allows none standard 
// promise returned by the getJSON method will be converted to a proper 
// native promise
Promise.resolve($.getJSON(API_URL + "films"))
  .then(films => {
    output.innerText = getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  // finally method used to execute some sort of clean up logic
  .finally(() => {
    spinner.remove();
  })

