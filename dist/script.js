"use strict";
// {
//     id: Integer,
//     name: String,
//     status: String,
//     city: String,
//     state: String,
//     country: String,
//     postal_code: String,
//     starred: Boolean,
//     created_at: Datetime,
//     comment: String (Optional)
//    }
//    We would like you to use HTML, CSS, and JavaScript to read the below JSON object and display the contents in an organized way. In addition,
//    you should add some sort of sorting and filtering mechanic on the front-end.
//    Feel free to use any framework you would like to accomplish this task.
//    The possible status values are:
//    Upcoming - violet
//    In Progress - yellow
//    Completed - green
//    Cancelled - red

// Selecting Elements from HTML
const logList = document.querySelector(".logList");

// Function that populates the list items
const renderLogs = function (log, sort = false) {
  const id = log.id;
  const name = log.name;
  const city = log.city;
  const state = log.state;
  const zip = log.postal_code;
  const country = log.country;
  const starred = log.starred;
  const starImg = starred ? "goldStar" : "grayStar";
  const status = log.status;
  const comment = !log.comment
    ? "<em>No comment at this time</em>"
    : log.comment;
  // Only want to return the hour min and am/pm
  const timestamp = log.created_at;
  const timestampString = new Date(timestamp).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // am/pm
  });

  const timeDateString = new Date(timestamp).toLocaleDateString("en-us", {
    month: "numeric", // 02
    day: "numeric", // 03
    year: "numeric", // 2020
  });

  // html that will be rendered to log <ul>
  const html = `
            <li class="logItem --${status}">
            <article>
              <div class="itemHeader">
                <img src="img/${starImg}.png" /><span class="status --${status}"
                  >${status} <sup class="icon --${status}"></sup
                ></span>

              </div>
              <div class="itemBody">
              <h2>${name}</h2>
                <p>
                  "${comment}"
                </p>
                <address>${city}, ${state} ${zip}</address>
              </div>
              <div class="itemFoot">
                <h3>${country}</h3>
                <time datetime="${timestamp}">
                  ${timestampString}<br />
                  ${timeDateString}
                </time>
              </div>
            </article>
          </li>
    `;

  logList.insertAdjacentHTML("beforeend", html);
  logList.style.opacity = 1;
};
// end function

const renderError = function (log) {
  logList.insertAdjacentText("beforeend", log);
};

///////////////////////////////////////////////////
// function to populate log transcript
const getlogTranscript = function () {
  // get data from url
  fetch("projects.json")
    .then((res) => {
      // If fetch doesn't work throw error here
      if (!res.ok) throw new Error(`Could Not Fetch Data (${res.status})`);

      return res.json();
    })
    .then((data) => {
      const projects = data.projects;
      if (!projects)
        throw new Error(`Project Data could not be found (${data.status})`);

      // For each individual log render it to the page
      projects.forEach((log) => {
        renderLogs(log);
      });
    })
    .catch((err) => {
      console.error(`${err}`);
      renderError(
        `✋🏾🛑🤚🏾 Something went wrong ✋🏾🛑🤚🏾 ${err.message}. Try again!`
      );
    })
    .finally(() => {
      logList.style.opacity = 1;
    });
};
//end function

///////////////////////////////////////////////////
// MAKE IT ALL WORK!!
getlogTranscript();
