export let users = JSON.parse(localStorage.getItem('users')) || [];

export const addUser = (user) => {
    users.push(user);
    console.log('there');
    localStorage.setItem('users', JSON.stringify(users));
}