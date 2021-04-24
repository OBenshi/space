// let offset = 0;
const addLaunchsi = (max = 800) => {
  limit = max;
  fetch(
    `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((e) => {})
    .then((data) => {
      let msntyp = removeDuble(
        data.results.map((launch) => {
          if (launch.mission != null) {
            return launch.mission.type;
          } else {
            return "other";
          }
        })
      );
      msntyp.sort();
      console.log(msntyp);
    })
    .catch((e) => {
      console.log("we do not have data", e);
      document.body.append("fuck my life");
    });
};
// addLaunchsi();
// const fetchMyData = () => {
//   fetch("https://catfact.ninja/breeds")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       document.getElementById("loading").style.display = "none";
//       console.log(`data`, data);
//       displayData(data.data);
//       createSelectOptions(data.data);
//       addEvents(data.data);
//     })
//     .catch((err) => {
//       showError(err);
//     });
// };
// if (document.title === "Table") {
//   fetchMyData();
// }

// const showError = (err) => {
//   document.getElementById("error").innerHTML = err;
// };

// const displayData = (breeds) => {
//   let tableBody = document.getElementById("table-body");
//   tableBody.innerHTML = "";
//   breeds.forEach((breed) => {
//     let tr = document.createElement("tr");
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");

//     td1.innerHTML = breed.breed;
//     td2.innerHTML = breed.origin;
//     td3.innerHTML = breed.country;

//     tr.appendChild(td1);
//     tr.appendChild(td2);
//     tr.appendChild(td3);

//     tableBody.appendChild(tr);
//   });
// };

// const addEvents = (breeds) => {
//   let checkboxes = Array.from(
//     document.querySelectorAll("input[type=checkbox]")
//   );

//   checkboxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", () => {
//       filterData(breeds);
//     });
//   });
//   document.getElementById("country-select").addEventListener("change", () => {
//     filterData(breeds);
//   });
// };

// const createSelectOptions = (breeds) => {
//   let countries = breeds.map((breed) => {
//     return breed.country;
//   });
//   let cleanedCountries = [];
//   countries.forEach((country) => {
//     if (country.split(" ").length <= 3) {
//       cleanedCountries.push(country);
//     }
//   });
//   console.log(cleanedCountries);
//   let select = document.getElementById("country-select");
//   cleanedCountries.forEach((country) => {
//     let option = document.createElement("option");
//     option.innerHTML = country;
//     option.setAttribute("value", country);
//     select.appendChild(option);
//   });
// };

// const filterData = (breeds) => {
//   let checkboxes = Array.from(
//     document.querySelectorAll("input[type=checkbox]:checked")
//   ).map((checkbox) => {
//     return checkbox.value;
//   });
//   let selectElm = document.getElementById("country-select").value;
//   console.log(selectElm);
//   console.log(checkboxes);

//   if (selectElm !== "all" || checkboxes.length !== 0) {
//     console.log("here");
//   }
//   let filteredData = [];
//   if (checkboxes.length === 0) {
//     displayData(breeds);
//   } else {
//     breeds.forEach((breed) => {
//       if (checkboxes.includes(breed.origin)) {
//         filteredData.push(breed);
//       }
//     });
//     displayData(filteredData);
//   }
// };
/* 0: "Astrophysics"
​
1: "Communications"
​
2: "Dedicated Rideshare"
​
3: "Earth Science"
​
4: "Government/Top Secret"
​
5: "Heliophysics"
​
6: "Human Exploration"
​
7: "Planetary Science"
​
8: "Resupply"
​
9: "Robotic Exploration"
​
10: "Suborbital"
​
11: "Test Flight"
​
12: "Unknown"
​
13: "Other"
​ */
