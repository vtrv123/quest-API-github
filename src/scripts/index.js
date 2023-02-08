"use strict";

import { getUser } from "../scripts/services/user.js";
import { getRepositories } from "../scripts/services/repositories.js";
import { getEvents } from "../scripts/services/events.js";

import { user } from "../scripts/objects/user.js";
import { screen } from "../scripts/objects/screen.js";

document.getElementById("btn-search").addEventListener("click", function () {
  const userName = document.getElementById("input-search").value;
  if (validateEmptyInput(userName)) return;
  getUserData(userName);
});

document
  .getElementById("input-search")
  .addEventListener("keypress", function (e) {
    const userName = this.value;
    if (e.key === "Enter") {
      if (validateEmptyInput(userName)) return;
      getUserData(userName);
    }
  });

function validateEmptyInput(userName) {
  if (userName.length === 0) {
    alert("Preencha o campo com o nome do usuario do github");
    return true;
  }
}

async function getUserData(userName) {
  const userResponse = await getUser(userName);

  if (userResponse.message === "Not Found") {
    screen.renderNotFound();
    return;
  }

  const repositoriesResponse = await getRepositories(userName);
  const eventsResponse = await getEvents(userName);

  user.setInfo(userResponse);
  user.setRepositories(repositoriesResponse);
  user.setEvents(eventsResponse);
  screen.renderUser(user);
}
