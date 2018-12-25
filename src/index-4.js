/**
 * ------------------------------------------
 * Execute cleanup logic in JS chain with finally()
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


fetch(API_URL + "films")
  .then(res => {
    if (!res.ok) {
      throw Error("Unsuccessful response");
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

