const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `
    <div class="info">
    <img src="${user.avatarUrl}" alt = "Foto do perfil do usuário" />
                    <div class="data">
                        <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
                        <p>${user.bio ?? "Não possui bio cadastrada"}</p>
                        <p>Seguidores: ${user.followers}</p>
                        <p>Seguindo: ${user.following}</p>
                    </div>
                    </div>
                        `;

    let repositoriesItems = "";
    user.repositories.forEach(function (repo) {
      repositoriesItems += `<li class="repo">
      <a href="${repo.html_url}" target="_blank">
      <p>${repo.name}</p>
      <ul class = "repo-data">
        <li>🍴 ${repo.forks_count}</li>
        <li>⭐ ${repo.stargazers_count}</li>
        <li>👀 ${repo.watchers_count}</li>
        <li>👨‍💻 ${repo.language ?? "não identificado"}</li>
      </ul>
      </a>
      </li>`;
    });

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                      <h2>Repositórios</h2>
                                      <ul>${repositoriesItems}</ul>
                                      </div>`;
    }

    let eventsItems = "";

    user.events.forEach(function (event) {
      eventsItems += `<li><strong>${event.repoName}</strong> - ${event.commitMessage}</li>`;
    });

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `<div class="events section">
                                      <h2>Eventos</h2>
                                      <ul>${eventsItems}</ul>
                                     </div>`;
    } else {
      this.userProfile.innerHTML += `<div class="events section">
                                      <h2>Eventos</h2>
                                      <p>O usuário ainda não gerou eventos 😞</p>
                                     </div>`;
    }
  },
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
  },
};

export { screen };
