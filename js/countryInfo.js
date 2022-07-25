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
  area,
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

//   <p></p>

//paragraph to be injected in the HTML
information = `<p>${chosen} is located in ${continent} and shares borders with ${
  borders.length ? borders.length : "zero"
} other countries.
Her capital is ${capitals} with ${currencyName}(${currencySymbol}) as it's official currency. ${chosen} is currently ${
  unMember ? "" : "not"
} a recognised member of the UN. With a population of ${spaceNumbers(
  population
)}, and an area of ${spaceNumbers(area)}m&sup2 ${chosen} is ${
  landlocked ? "" : "not"
} a landlocked country. In this country, the week starts on ${
  weekStart[0].toUpperCase() + weekStart.slice(1)
} and the driver's seat is on the ${car} hand side of the car</p>`;
//
let section_2 = document.querySelector("#section_2");
let article = section_2.querySelector("article");
console.log(article);
article.innerHTML = information;

const populationPercentage =
  ((population / totalPopulation) * 100).toFixed(3) + "%";
console.log(populationPercentage);

function spaceNumbers(num) {
  return `${num}`
    .split("")
    .reverse()
    .join("")
    .replace(/(\d{3})/g, `$1 `)
    .split("")
    .reverse()
    .join("");
}

const body = document.querySelector("#root");
const toggler = document.querySelector(".toggler");
let lightMode = true;
const toggleMode = () => {
  if (lightMode) {
    body.style.cssText +=
      ";" +
      `
    background: #232424;
    color: whitesmoke;
    `;
    toggler.style.cssText +=
      ";" +
      `
      left: 62%;
    background: white;
    `;
    toggler.parentElement.parentElement.style.background = "black";
  } else {
    body.style.cssText +=
      ";" +
      `
      background: #ffffff;
      color: black;
      `;
    toggler.style.cssText +=
      ";" +
      `
      left: 8%;
      background: #232424;
      `;
    toggler.parentElement.parentElement.style.background = "#ffffff";
  }
  lightMode = !lightMode;
};

toggleMode ? toggler.parentElement.addEventListener("click", toggleMode) : null;
