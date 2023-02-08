import { baseUrl } from "../variables.js";
async function getEvents(userName) {
  const response = await fetch(`${baseUrl}/${userName}/events`);
  const eventsList = await response.json();
  const validEvents = eventsList
    .filter((event) =>
      event.type === "CreateEvent" || event.type === "PushEvent" ? true : false
    )
    .map(function (event) {
      const repoName = event.repo.name;
      const commitMessage =
        event.payload.commits?.[0].message ?? "Criação de branch/tag";
      return { repoName: repoName, commitMessage: commitMessage };
    });
  return validEvents.length > 10 ? validEvents.slice(0, 10) : validEvents;
}

export { getEvents };
