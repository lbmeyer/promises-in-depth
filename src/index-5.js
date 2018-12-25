/**
 * ------------------------------------------
 * Create a rejected promise in JS 
 * (allows us to see stack trace)
 * ------------------------------------------
 */


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

fetch(API_URL + "movies")
  .then(res => {
    if (!res.ok) {
      // instead of throwing an error, we can create a rejected promise
      // throw Error("Unsuccessful response");

      // By rejecting the promise with an instance of error, 
      // We see a stack trace of the error (easier for debugging)
      return Promise.reject(
        new Error("Unsuccessful response")
      );
    }
    return res.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  // finally method used to execute some sort of clean up logic
  .finally(() => {
    spinner.remove();
  })

