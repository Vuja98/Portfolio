"use strict";
const gitProfile = document.querySelector(".git__projects-wrapper");
const API_URL = "https://api.github.com/users/";
const gitUsername = "Vuja98";
const token = "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";
const url = `https://api.github.com/users/${gitUsername}/repos?sort=updated&per_page=6`;
const body = document.body;
const loaderEl = document.querySelector(".loader");
const roller = document.querySelector(".lds-roller");
const yearEl = document.getElementById("year");
const year = new Date().getFullYear();
const navLinks = document.querySelectorAll(".nav__item-link");
const navItems = document.querySelector(".nav_items");
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
getLatestRepos();
