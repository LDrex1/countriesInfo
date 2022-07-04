"use strict";
// import source from "../countries.js";
// async function mad() {
let chosen = localStorage.getItem("selectedCountry");
console.log(chosen);
let source = JSON.parse(localStorage.getItem("library"));
// }
console.log(source);
// mad();
console.log(localStorage.key(0));
let data = source.filter((element) => element.name.official == chosen);
data = data[0];
console.log(data);
let currenciesInfo = data.currencies;
let capitals = data.capital;
let continent = data.continents;
let independent = data.independent;
let landLocked = data.landlocked;
let weekStart = data.startOfWeek;
let unMember = data.unMember;
let population = data.population;
let car = data.car;
let names = data.name;
let flag = data.flags.png;

let dataArray = [
  capitals,
  continent,
  currenciesInfo,
  independent,
  landLocked,
  weekStart,
  unMember,
  population,
  car,
  names,
  flag,
];

console.log(dataArray);

let section_1 = document.querySelector("#section_1");
section_1.querySelector(".country-name").textContent = chosen;
let flagImage = section_1.querySelector(".country-flag").querySelector("img");

flagImage.src = flag;
console.log(flagImage);

let information;

information = `${chosen} is located in ${continent} and shares borders with two other countries
It's capital is ${capitals}`;

let section_2 = document.querySelector("#section_2");
let article = section_2.querySelector("article");
console.log(article);
article.textContent = information;
