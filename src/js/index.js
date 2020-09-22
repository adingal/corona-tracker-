const curDate = new Date();
const copyrightYear = document.querySelector('.year');
const country = document.getElementById('country');

// Copyright year
copyrightYear.innerText = curDate.getFullYear();

async function getData() {
    const res = await fetch('https://corona-api.com/countries');

    if ( res.status === 200 ) {
        const data = res.json();
        return data;
    }

}

// Create options based on the given array
function createOptions(arr) {

    if ( ! arr instanceof Array ) return;

    for (let i = 0; i < arr.length; i++) {
        const optionItem = document.createElement('option');

        optionItem.setAttribute('value', arr[i].code);
        optionItem.innerText = arr[i].name;
        country.append(optionItem);
    }

}

getData()
    .then(res => {
        const arrData = res.data.sort((a, b) => a - b);
        createOptions(arrData);;
    })
    .catch(err => {
        console.log('Error encountered: ', err);
    });