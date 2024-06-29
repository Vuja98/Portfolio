"use strict";

const gitProfile = document.querySelector(".git__projects-wrapper");

const API_URL = "https://api.github.com/users/";
const gitUsername = "Vuja98";
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const modalWrapper = document.getElementById("modal-wrapper");
const close = document.getElementById("close");
const form = document.getElementById("form");
const result = document.getElementById("result");
const url = `https://api.github.com/users/${gitUsername}/repos?sort=updated&per_page=6`;
const btn = document.getElementById("nav_btn");
const body = document.body;
const loaderEl = document.querySelector(".loader");
const roller = document.querySelector(".lds-roller");
const yearEl = document.getElementById("year");
const year = new Date().getFullYear();
const navLinks = document.querySelectorAll(".nav__item-link");
const navItems = document.querySelector(".nav_items");
const cta = document.querySelector("#readMore");
const git = document.querySelector("projects__project-wrapper");
const burger = document.querySelector(".burger");

setTimeout(() => {
  loaderEl.style.opacity = 0;
  roller.style.opacity = 0;
  body.style.overflowY = "visible";
  setTimeout(() => {
    loaderEl.style.display = "none";
    roller.style.display = "none";
  }, 400);
}, 1000);
let width = -5;

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

yearEl.innerText = year;
document.querySelector(".refresh").addEventListener("click", () => {
  location.reload();
});

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navItems.classList.toggle("active");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    navItems.classList.remove("active");
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    removeActive();
    link.classList.add("active");
  });
});

document.querySelector(".nav__items").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__item-link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelector(".footer__list").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("footer__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

function removeActive() {
  navLinks.forEach((link) => link.classList.remove("active"));
}
async function getLatestRepos() {
  try {
    const response = await fetch(url, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const data = await response.json();

    const cards = data
      .map(
        (repo) => ` 
        <div class="project">
          <div class="card-body">
            <h5 class="project-name gradient-text">${repo.name}</h5>
            <div class="git-links">
            <a href="${repo.html_url}" target="_blank" class="git-link">GitHub</a>
            <a href="${repo.homepage}" target="_blank" class="live-link">Website</a>
            </div>
          
          </div>
          
        </div>
      `
      )
      .join("");
    const wrapper = document.createElement("div");
    wrapper.classList.add("git-wrapper");
    const title = document.createElement("h3");
    title.classList.add("tc");
    title.classList.add("mb-sm");
    title.classList.add("heading-tertiary");
    title.innerText = "Latest Projects";
    wrapper.insertAdjacentElement("beforebegin", title);
    gitProfile.innerHTML = cards;

    gitProfile.appendChild(wrapper);
  } catch (error) {
    console.error(error);
  }
}
const repose = getLatestRepos();

btn.addEventListener("click", (e) => {
  modalWrapper.classList.add("active");
  setTimeout(() => {
    overlay.classList.add("activate");
    modal.classList.add("active");
  }, 1);
});

overlay.addEventListener("click", () => {
  setTimeout(() => {
    modalWrapper.classList.remove("active");
  }, 100);
  overlay.classList.remove("activate");
  modal.classList.remove("active");
});

close.addEventListener("click", () => {
  setTimeout(() => {
    modalWrapper.classList.remove("active");
  }, 100);
  overlay.classList.remove("activate");
  modal.classList.remove("active");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        setTimeout(() => {
          setTimeout(() => {
            modalWrapper.classList.remove("active");
          }, 100);
          overlay.classList.remove("activate");
          modal.classList.remove("active");
        }, 500);
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});
