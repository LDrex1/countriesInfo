"use strict";
/*Fetching the url with an async function with a return value of 
{countriesList:[....],
     flags:[...]}*/
//for loops
const url = "https://restcountries.com/v3.1/all";
let countriesList = [];
let flags = [];
let continents = [];
const optgroup = document.getElementById("optgroup");
async function fetchMy() {
  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem("library", JSON.stringify(data));
  fetchMy.me = data;
  //loop to get an array containing the name of all countries
  for (const each of data) {
    countriesList.push(each.name);
    flags.push(each.flags);
    continents.push(...each.continents);
  }

  continents = [...new Set(continents)];
  continents.forEach((continent) => {
    const option = document.createElement("option");
    option.value = continent && (option.textContent = continent);
    optgroup.appendChild(option);
  });

  return { countriesList, flags };
}

// stored value of the async function fetchMy()
let fetched = fetchMy();

//Parameters for the DOM
/**
 * event listeners for the search button.
 * First one returns the vlaue of the input
 * Second one has an embedded promise
 */

function searchBt() {
  let searchMe = document.querySelector(".search-button");
  return new Promise(function (resolve, reject) {
    if (searchMe) {
      searchMe.addEventListener("click", () => {
        aaa();
        resolve("searched with mouse");
      });
    }
  });
}
/**
 * DOM manipulation...
 * contains varibles with DOMs stored in them
 */
//parent that'd contain all our newly created elements
const pagebuttons = document.querySelector("#page-buttons");
const domInput = document.querySelector("#fetchedData");
const continent = document.querySelector("#continent");

//our input box

function searchEv() {
  return new Promise(function (resolve, reject) {
    let searchBox = document.querySelector("#search");
    if (searchBox)
      searchBox.addEventListener("keypress", function (ev) {
        if (ev.key == "Enter") {
          ev.preventDefault();
          aaa();
          resolve("yhhhh");
        }
      });
  });
}

//Search input
function testInput() {
  while (pagebuttons.firstChild) {
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
let innerTarget = 0;

const clickEvent = async (e) => {
  let target = e.currentTarget;
  innerTarget = target.querySelector("#country-name").textContent;
  await waitListener();
};

const listener = (event) => {
  event = event.currentTarget;
  let resultTarget = event.querySelector("#country-name").textContent;

  localStorage.setItem("selectedCountry", resultTarget);
  // resolve(resultTarget);
  window.open().location = "inner_pages/country.html";
};

function waitListener(Element, ListenerName) {
  return new Promise(function (resolve, reject) {
    Element.forEach((ele) => {
      if (ele) ele.addEventListener(ListenerName, listener);
    });
  });
}

const domManipul = () => {
  let [country, flag] = storedSearchedData[ii];
  let eachCountryData = document.createElement("div");
  eachCountryData.setAttribute("id", "country-data");
  if (eachCountryData)
    eachCountryData.addEventListener("click", clickEvent, false);
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
////////////////

/*export default*/ async function awaitClicks() {
  Promise.any([searchEv(), searchBt()]).then((val) => {
    let element = document.querySelectorAll("#country-data");
    let tempReturn = waitListener(element, "click");
    awaitClicks();
    return tempReturn;
  });
}

awaitClicks();

//////////////
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
    domManipul();
    let element = document.querySelectorAll("#country-data");
    element.forEach((ele) => ele.addEventListener("click", listener));

    ii += 1;
  }
}
async function aaa() {
  storedSearchedData = [];
  let indexC;
  //converting value of search to an array
  let inputToArray = testInput().split(" ");

  fetched
    .then((data) => {
      try {
        ii = 0;
        let jj = 0;
        let defaultName = data.countriesList.reduce((acc, { common }) => {
          return [...acc, common];
        }, []);
        let commonName;
        if (continent.value) {
          commonName = JSON.parse(localStorage.getItem("library"))
            .filter(({ continents }) => {
              return continents.includes(continent.value);
            })
            .reduce((acc, { name }) => {
              return [...acc, name.common];
            }, []);
        } else {
          commonName = defaultName;
        }
        const commonNameSorted = [...commonName].sort();
        domInput.innerHTML = "";
        for (const each of commonNameSorted) {
          let commonToArray = each.split(" ");
          let matchingCountries = inputToArray.every((element) => {
            return new RegExp(element, "i").test(commonToArray);
          });

          if (matchingCountries) {
            let country = each;
            indexC = defaultName.indexOf(each);
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

        if (storedSearchedData.length > 12) {
          let numberOfPages = Math.ceil(storedSearchedData.length / 12);

          while (jj < numberOfPages) {
            let pageNumber = document.createElement("button");
            pageNumber.setAttribute("id", "page-number");
            pageNumber.textContent = jj + 1;
            if (pageNumber) pageNumber.addEventListener("click", dataToPage);
            pageNumber.param = pageNumber.textContent;
            pagebuttons.appendChild(pageNumber);
            jj += 1;
          }
        }
      } catch (err) {
        console.error(err.message);
        throw err;
      }
    })
    .catch((err) => console.log(err.message));
}

// export default fetchMy;
