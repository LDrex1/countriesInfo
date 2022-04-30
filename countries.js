"use strict";
/*Fetching the url with an async function with a return value of 
{countriesList:[....],
     flags:[...]}*/
//for loops
let array1 = [{ name: "dami", age: 19 }, { name }];

const url = "https://restcountries.com/v3.1/all";
let countriesList = [];
let flags = [];
const fetchMy = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  //loop to get an array containing the name of all countries
  for (const each of data) {
    countriesList.push(each.name);
    flags.push(each.flags);
  }

  return { countriesList, flags };
};

// stored value of the async function fetchMy()
let fetched = fetchMy();

//Parameters for the DOM
/**
 * event listeners for the search button.
 * First one returns the vlaue of the input
 * Second one has an embedded promise
 */
document.querySelector(".search-button").addEventListener("click", aaa);
/**
 * DOM manipulation...
 * contains varibles with DOMs stored in them
 */
//parent that'd contain all our newly created elements
let pagebuttons = document.querySelector("#page-buttons");
let domInput = document.querySelector("#fetchedData");
//our input box
let searchBox = document.querySelector("#search");
searchBox.addEventListener("keypress", function (ev) {
  if (ev.key == "Enter") {
    ev.preventDefault();
    aaa();
  }
});

//Search input
function testInput() {
  while (pagebuttons.firstChild) {
    console.log("true");
    document.getElementById("page-number").remove();
  }
  let search = document.querySelector("#search").value;
  return search;
}
/**
 * function that continues the promises from fetchMy()
 * 1st .then contains a promise returning both the name
 * and index of matches it found in the API based on
 * the input value
 * 2nd .then contains a promise returning the picture
 * of the flag as a source link based on the index
 * (indexC)
 *
 */
let ii = 0;
let storedSearchedData = [];

/**
 * DOM manipulation...
 * contains varibles with DOMs stored in them
 */
const domManipul = () => {
  let [country, flag] = storedSearchedData[ii];
  console.log(ii);
  let eachCountryData = document.createElement("div");
  eachCountryData.setAttribute("id", "country-data");
  let countryNameEl = document.createElement("h2");
  countryNameEl.setAttribute("id", "country-name");
  let countryNameDiv = document.createElement("div");
  countryNameDiv.setAttribute("id", "country-name-div");
  countryNameEl.textContent = country;
  countryNameDiv.appendChild(countryNameEl);
  eachCountryData.appendChild(countryNameDiv);
  domInput.appendChild(eachCountryData);
  /**
   * DOM manipulation...
   * contains varibles with DOMs stored in them
   */
  let flagDiv = document.createElement("div");
  flagDiv.setAttribute("id", "flag-div");
  let flagImage = document.createElement("img");
  flagImage.setAttribute("id", "flag-image");
  //implementation
  flagImage.src = flag;
  flagDiv.appendChild(flagImage);
  eachCountryData.appendChild(flagDiv);
};

function dataToPage(content) {
  domInput.innerHTML = "";
  let num = content.currentTarget.param;
  let upper = 12 * num;
  let lower;
  num == 1 ? (lower = upper - 12) : (lower = upper - 12);
  ii = lower;
  while (ii < upper) {
    if (!storedSearchedData[ii]) {
      break;
    }
    let [country, flag] = storedSearchedData[ii];
    console.log(ii);
    domManipul();

    console.log(country, flag);
    ii += 1;
  }
}
function aaa() {
  storedSearchedData = [];
  let indexC;
  //converting value of search to an array
  let inputToArray = testInput().split("");

  fetched
    .then((data) => {
      try {
        ii = 0;
        let jj = 0;

        console.log(inputToArray);
        domInput.innerHTML = "";
        for (const each of data.countriesList) {
          let officalToArray = each.official.split("");
          let matchingCountries = inputToArray.every((element) => {
            return new RegExp(element, "i").test(officalToArray);
          });

          if (matchingCountries) {
            let country = each.official;
            indexC = data.countriesList.indexOf(each);
            let flag = data.flags[indexC].png;
            let subStoredData = [];
            subStoredData.push(country);
            subStoredData.push(flag);
            storedSearchedData.push(subStoredData);
          }
        }

        while (ii < 12) {
          let [country, flag] = storedSearchedData[ii];
          /**
           * DOM manipulation...
           * contains varibles with DOMs stored in them
           */
          domManipul();
          ii += 1;
        }

        console.log(storedSearchedData, storedSearchedData.length);
        if (storedSearchedData.length > 12) {
          let numberOfPages = Math.ceil(storedSearchedData.length / 12);
          console.log(storedSearchedData.length);
          console.log(jj, numberOfPages);

          while (jj < numberOfPages) {
            let pageNumber = document.createElement("button");
            pageNumber.setAttribute("id", "page-number");
            pageNumber.textContent = jj + 1;
            pageNumber.addEventListener("click", dataToPage);
            pageNumber.param = pageNumber.textContent;
            pagebuttons.appendChild(pageNumber);
            jj += 1;
            console.log(jj, pageNumber.textContent, numberOfPages);
          }
        }

        console.log(storedSearchedData.length);
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    })
    .catch((err) => console.log(err.message));
}
