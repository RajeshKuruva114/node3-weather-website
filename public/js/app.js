// console.log("Client Side JS file is loaded");

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    // console.log(location);
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';

    const url = `/weather?address=${encodeURIComponent(location)}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = `${data.location}, ${data.country}`;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});