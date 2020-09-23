// Global variables
const items = {

    active          : document.querySelector('[name="active"]'),
    todayDeaths     : document.querySelector('[name="today-deaths"]'),
    todayCases      : document.querySelector('[name="today-cases"]'),
    tallyDeaths     : document.querySelector('[name="tally-deaths"]'),
    tallyConfirmed  : document.querySelector('[name="tally-confirmed"]'),
    recovered       : document.querySelector('[name="recovered"]'),
    critical        : document.querySelector('[name="critical"]'),
    heading         : document.querySelector('h1'),
    country         : document.getElementById('country'),
    copyrightYear   : document.querySelector('.year'),
    curDate         : new Date(),
    axios           : require('axios')

}

// Copyright year
items.copyrightYear.innerText = items.curDate.getFullYear();

// Get all data
const getData = async() => {
    try {
        const res = await items.axios.get('https://coronavirus-19-api.herokuapp.com/countries');
        const { data } = res;
        return data;
    } catch(err) {
        console.log(err);
    }
}

// Get data of selected country
const getSelected = async(country = 'World') => {
    try {
        const res = await items.axios.get(`https://coronavirus-19-api.herokuapp.com/countries/${country}`);
        const { data } = res;
        return data;
    } catch(err) {
        console.log(err);
    }
}

// Create options based on the given array
const createOptions = (arr) => {
    if ( ! arr instanceof Array ) return;
    
    const dataArr = arr.sort((a,b) => sortCountries(a, b));

    for (let i = 0; i < dataArr.length; i++) {

        if (dataArr[i].country === 'World') continue;

        const optionItem = document.createElement('option');

        optionItem.setAttribute('value', dataArr[i].country);
        optionItem.innerText = dataArr[i].country;
        items.country.append(optionItem);
    }
}

// Fill up inputs
const fillInputs = (obj) => {
    const {
        country,
        active,
        todayDeaths,
        todayCases,
        deaths,
        cases,
        recovered,
        critical
    } = obj;

    items.heading.innerText    = country;
    items.active.value         = addCommas(active);
    items.todayDeaths.value    = addCommas(todayDeaths);
    items.todayCases.value     = addCommas(todayCases);
    items.tallyDeaths.value    = addCommas(deaths);
    items.tallyConfirmed.value = addCommas(cases);
    items.recovered.value      = addCommas(recovered);
    items.critical.value       = addCommas(critical);
    
}

// Add commas to numbers
const addCommas = (x) => x.toLocaleString();

// Sort array
const sortCountries = (a,b) => {
    const countryA = a.country.toUpperCase();
    const countryB = b.country.toUpperCase();

    if (countryA < countryB) {
        return -1;
    }
    else if (countryA > countryB) {
        return 1;
    }
    return 0;
}

// Get data for country options
getData()
    .then(res => createOptions(res))
    .catch(err => console.log(err));

// Set default data for inputs
getSelected()
    .then(res => fillInputs(res))
    .catch(err => console.log(err));

// List data of selected country
country.addEventListener('change', () => {
    getSelected(country.value)
        .then(res => fillInputs(res))
        .catch(err => console.log(err));
});