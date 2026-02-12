import { users, currentUser, activeChat, updateActiveChat, addMessage, messages } from "./dataBase.js";

const usersListEl = document.querySelector(".users-list");
const userPEl = document.querySelector(".user-p");
const formEl = document.querySelector(".form-cont");
const inputEl = document.querySelector(".chat-input");
const chatsContEl = document.querySelector(".chats-cont");

let usersList = "";
let onlineClass = "";

users.forEach(({name, img, online}) => {

    if(online) {
        onlineClass = "";
    }

    else {
        onlineClass = "off";
    }

    if(name !== currentUser){   
      usersList += `<div class="user" data-user-name='${name}'>
                <div class="img-container">
                    <img class="img-1" src=${img} alt="profile image">
                    <div class="online ${onlineClass}"></div>
                </div>

                <div class="container-2">
                    <div class="text-conatiner">
                        <h3>${name}</h3>
                        <p>I have it</p>
                    </div>
                    <time datetime="14:30">14:30</time>
                </div>
            </div>`;
    }
});

usersListEl.innerHTML = usersList;

const userEl = document.querySelectorAll(".user");
let currentBtn = '';

userEl.forEach((user) => {
    user.addEventListener('click', () => {
        currentBtn = user.dataset.userName;
        updateActiveChat(currentBtn);
        userEl.forEach((user0) => {
            user0.style.background = "transparent";
        })
        user.style.background = "#00003D";

        displayChat(currentBtn);
    })
})

formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const mess = inputEl.value;
    const now = new Date();
    const time = now.getHours() + ":" + now.getMinutes();

    addMessage(mess, currentUser, activeChat, time);

    inputEl.value = "";
})




function displayChat(userName){
    users.forEach(({name, img, online}) => {
        if(name === userName){
            userPEl.innerHTML = `<img class="img-1" src="${img}" alt="user-pic">
                                <div class="text-conatiner">
                                 <h3>${name}</h3>
                                 <p>${online ? 'Online' : 'Offline'}</p>
                                </div>`;
        }
    })

    let chatsH = "";

    messages.forEach(({usersId, messagesList}) => {
        if(usersId === currentUser + activeChat || usersId === activeChat + currentUser) {
            messagesList.forEach(({message, time, writer}) => {
                if(writer === currentUser){
                    chatsH += `<div class="my-mess-cont">
                                <div class="my-mess">
                                    <p>${message}</p>
                                    <time datetime="${time}">${time}</time>
                                </div>
                            </div>`;
                }

                else {
                    chatsH += `<div class="them-mess-cont">
                    <div class="them-mess">
                        <p>${message}</p>
                        <time datetime="${time}">${time}</time>
                    </div>
                </div>`;
                }    
            });
        }
    })

    chatsContEl.innerHTML = chatsH;
}