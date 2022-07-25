"use strict";
//Getting the selected country from local storage
let chosen = localStorage.getItem("selectedCountry");
console.log(chosen);

//Getting the JSON data from the local storage
let source = JSON.parse(localStorage.getItem("library"));

// console.log(source);
//total population
const totalPopulation = source.reduce((acc, cur) => acc + cur.population, 0);
console.log(totalPopulation);

//getting all languages (each element is an array)
let allLanguages = source.map((country) => {
  return country.languages ? Object.values(country.languages) : null;
});

//getting all languages (no subarrays)
allLanguages = [].concat(...allLanguages);

//all languages Object
let popularLanguages = allLanguages.reduce((acc, cur) => {
  return { ...acc, [cur]: acc[cur] + 1 || 1 };
}, {});

//all languages object (Sorted)
popularLanguages = Object.entries(popularLanguages)
  .sort((a, b) => b[1] - a[1])
  .reduce((acc, cur) => {
    return { ...acc, [cur[0]]: cur[1] };
  }, {});

console.log(popularLanguages);

//Working on Individual Country
console.log(localStorage.key(0));
//Using filter to return the data of the chosen country
let data = source.filter((element) => element.name.official == chosen);
data = data[0];
console.log(data);
const {
  currencies: currenciesInfo,
  capital: capitals,
  continents: continent,
  independent,
  landlocked,
  startOfWeek: weekStart,
  unMember,
  population,
  name: names,
  borders,
} = data;

const car = data.car.side;
const flag = data.flags.png;

console.log(currenciesInfo);
//getting name and symbol of currency from "currenciesInfo"
const mainCurrency = currenciesInfo[Object.keys(currenciesInfo)[0]];
const { name: currencyName, symbol: currencySymbol } = mainCurrency;
console.log(currencySymbol);
console.log(currenciesInfo);
//array containing major data on chosen country
let dataArray = [
  capitals,
  continent,
  mainCurrency,
  currencySymbol,
  independent,
  landlocked,
  weekStart,
  unMember,
  population,
  car,
  names,
  flag,
];
console.log(dataArray);

//variables needed for DOM manipulation
let section_1 = document.querySelector("#section_1");
section_1.querySelector(".country-name").textContent = chosen;
let flagImage = section_1.querySelector(".country-flag").querySelector("img");

flagImage.src = flag;
console.log(flagImage);

let information;
// `<article>
//   <p></p>
// </article>`

//paragraph to be injected in the HTML
information = `${chosen} is located in ${continent} and shares borders with ${
  borders.length ? borders.length : "zero"
} other countries.
Her capital is ${capitals} with ${currencyName}(${currencySymbol}) as it's official currency. ${chosen} is currently ${
  unMember ? "not" : null
} a recognised member of the UN. With a population of ${`${population}`
  .split("")
  .reverse()
  .join("")
  .replace(/(\d{3})/g, `$1 `)
  .split("")
  .reverse()
  .join("")}, ${chosen} is ${
  landlocked ? null : "not"
} a landlocked country. In this country, the week starts on ${
  weekStart[0].toUpperCase() + weekStart.slice(1)
} and the driver's seat is on the ${car} hand side of the car`;

let section_2 = document.querySelector("#section_2");
let article = section_2.querySelector("article");
console.log(article);
article.textContent = information;

const populationPercentage =
  ((population / totalPopulation) * 100).toFixed(3) + "%";
console.log(populationPercentage);
