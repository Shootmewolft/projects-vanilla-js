import { UserNameNotFound } from "./components/errors.js";
import { FailedFetch } from "./components/errors.js";
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  getUserNameData(event);
});

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new UserNameNotFound("Usuario no encontrado");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const errorFetch = new FailedFetch(`Error en procesar la API. ${error}`);
    return { isError: true, message: errorFetch };
  }
}

function getUserNameData(event) {
  event.preventDefault();
  const userName = form.querySelector("input").value;
  fetchData(`https://api.github.com/users/${userName}`).then((response) => {
    if (response.isError) {
      const containerRepos = document.querySelector(".container__wrapper");
      containerRepos.innerHTML = `<h1 class="container__title-error">${response.message.message}</h1>`;
    } else {
      addCard(
        response.avatar_url,
        response.login,
        response.followers,
        response.following,
        response.public_repos,
        response.repos_url
      );  
    }
  });
}

function addCard(avatarUrl, login, followers, following, repos, reposUrl) {
  fetchData(reposUrl).then((response) => {
    const section = document.querySelector(".container__wrapper");
    let reposLinks = "";
    let profileDataCard = "";
    for (let index = 0; index < 6; index++) {
      const repo = response[index];
      reposLinks += `<a href="${repo?.html_url}" target="_blank" rel=”noopener noreferrer”>${repo.name}</a>`;
      profileDataCard = `
      <article class="container__profile">
        <picture class="container__img-profile">
          <img src=${avatarUrl}>
        </picture>
        <div class="container__data-profile">
          <h3>${login}</h3>
          <div class="container__stadistics-profile">
            <div class="container__stadistic-profile">
              <span>${followers}</span>
              <p>Followers</p> 
            </div>
            <div class="container__stadistic-profile">
              <span>${following}</span>
              <p>Following</p>
            </div>
            <div class="container__stadistic-profile">
              <span>${repos}</span>
              <p>Repos</p>
            </div>
          </div>
          <div class="container__repos-profile">
          ${reposLinks}
          </div>
        </div>
      </article>`;
      section.innerHTML = profileDataCard;
    }
  });
}
