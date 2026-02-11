export let users = JSON.parse(localStorage.getItem('users')) || [];
export let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || '';

export const addUser = (user) => {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
};




// currentUser functions

export const updateCurrentUser = (username) => {
    currentUser = username;
    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
}