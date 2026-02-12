import { currentUser, users, logOut } from "./dataBase.js";

const profileContEl = document.querySelector(".profile-cont");

users.forEach(({name, img, about}) => {
    name === currentUser && (profileContEl.innerHTML = `<img src=${img}>
            <h2>
                ${name} <i class="material-icons">edit</i>
            </h2>
            <h3>
                About me <i class="material-icons">edit</i>
            </h3>

            <p>${about}</p>
            
            <button class="p-btn">Log out</button>`)
});

const pBtnEl = document.querySelector(".p-btn");

pBtnEl.addEventListener('click', () => {
    logOut(currentUser);
    window.location.href = "../index.html";
})