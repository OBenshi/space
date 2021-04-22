

// let's declare some params !!

let offset = 0
let filters = false
let lowestScrl = 0




// adds   launches function 

const addLaunchs = (max=10)=> {
  limit=max
  fetch(`https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}`)
    .then(res => {
        return res.json()
    }).catch(e => {
    })
    .then((data) => {
      // displayLaunch(data.results)
      filterData(data.results)
      // console.log('data',data.results)
      createOptions(data.results)
      addEvents(data.results)
      document.getElementById("loading").style.display = 'none';
    }).catch(e => {
        console.log('we do not have data', e)
        document.body.append('fuck my life')
    })

}
if (document.title === "UPCOMING LAUNCHES") {
  addLaunchs();
}

// load more on scroll function

// function onScroll(event) {
//   const current = document.documentElement.scrollTop;
//   const maxHeight = document.body.scrollHeight;
//   if (current > lowestScrl && current>maxHeight*0.5) {
//     offset = offset + 10;
//     addLaunchs();
//     lowestScrl = current
//   } 
// }
// window.addEventListener('scroll', event => onScroll(event));
//       create Select Options for agency and location ;

const createOptions = (launches) => {
  // let agencies = launches.map((launch) => {return launch.launch_service_provider.name;});
  
  let locations = removeDuble(launches.map((launch) => { return launch.pad.location.name })) ;

  let agencies = removeDuble(launches.map((launch) => { return launch.launch_service_provider.name; }))

  let agencySelector = document.getElementById("agencySelect");
  agencies.forEach((agency) => {
    let option = document.createElement("option");
    option.innerHTML = agency;
    option.setAttribute("value", agency);
    agencySelector.appendChild(option);
  });

  let locationSelector = document.getElementById('locationSelect')
  locations.forEach((location) => {
    let option = document.createElement('option');
    option.innerHTML = location;
    option.setAttribute('value', location);
    locationSelector.appendChild(option);
  })
};


// adding listeners for dropdowns 
const addEvents = (results) => {

  // let agencyDrop = document.querySelectorAll("#agencySelect")
  let agencyDrop = document.getElementById('agencySelect')
  let locationDrop = document.getElementById('locationSelect')
  // console.log(agencyDrop)
  // agencyDrop.forEach((listi) => {
  //   listi.addEventListener("change", () => {
  //     filterData(results)
  //     console.log('!!!!222!!!!',results)
  //   });
  // });
  agencyDrop.addEventListener("change",()=>{filterData(results)})
  locationDrop.addEventListener('change', () => {
    filterData(results)
  })

};

// countdown timer 
const timeCounter = (T,launchName) => {
  // Set the date we're counting down to
    const countDownDate = new Date(T);

// Update the count down every 1 second
var x = setInterval(function() {

    const l= new Date().getTime()
  // Find the distance between now and the count down date
  var distance = countDownDate - l;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
    if (document.getElementById(`${launchName}-counter`)) {
        document.getElementById(`${launchName}-counter`).innerText = `T- ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    // else { document.getElementById(`${launchName}-counter`).innerText = `T- !!d !!h !!m !!s`; }
  
    

// If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(`${launchName}-counter`).innerHTML = "LAUNCHED!";
  }
}, 1000);  
}


// creating launch function

const displayLaunch = (launches) => {
  const launchesDiv = document.getElementById("launchesDiv");
  launchesDiv.innerHTML=""
  launches.forEach((launch) => {
    // console.log(launch)
       // creates launch div
    aLaunch = document.createElement('div');
    aLaunch.setAttribute("id", `${launch.name}`)
    const sectionClasses = ['row', 'align-items-center', 'my-4', 'mx-2'];
    aLaunch.classList.add(...sectionClasses);

    // create pic div and adds to launch div
    picDiv = document.createElement('div');
    const divClasses = ['col-12', 'col-md-6'];
    picDiv.classList.add(...divClasses)
    aLaunch.append(picDiv)

    // create pic and add to pic div
    launchPic = document.createElement('img');
    const imgClasses = ['img-fluid', 'pic']
    launchPic.classList.add(...imgClasses);
    if (launch.image) {
      launchPic.src = launch.image;
    } else { launchPic.src = 'imgs/takeoff.jpg' }
            
    picDiv.append(launchPic);

    // creates info div and adds to launch div 
    
    infoDiv = document.createElement('div');
    infoDiv.classList.add(...divClasses);
    infoDiv.classList.add('blurb');
    // infoDiv.classList.add('jumbotron')
    aLaunch.append(infoDiv);
            
    // adds title  to info 
    launchName = document.createElement('h2');
    launchName.innerText = launch.name;
    infoDiv.append(launchName);

    launchLocation = document.createElement('p');
    launchLocation.innerText = `from: ${launch.pad.location.name}`
    infoDiv.append(launchLocation);

    // adds time to info 
    launchTime = document.createElement('p');
    displayTime = new Date(launch.net).toTimeString();
    launchTime.innerText = displayTime;
    infoDiv.append(launchTime);
            
    // adds count down 
    timeToLaunch = document.createElement('p');
    timeToLaunch.setAttribute("id", `${launch.name}-counter`);
    if (launch.net && launch.name) {
      timeCounter(launch.net, launch.name);
    }
    infoDiv.append(timeToLaunch);

    // adds description
    description = document.createElement('p');
    if (launch.mission != null) {
      description.innerText = launch.mission.description;
    } else {
      description.innerText = 'no description'
    }
    infoDiv.append(description)
    // if (description.innerText.length > 160) {
    //   console.log('long txt')
    // }
    launchProvider = document.createElement('p')
    launchProvider.innerText = `Provider - ${launch.launch_service_provider.name}`
    infoDiv.append(launchProvider)
            
    
    // add launch to launch section 

    launchesDiv.append(aLaunch)})
 }
    

//  removing doubles function 

const removeDuble = (toClean) => {
   let cleaned = [];
  toClean.forEach((thing) => {
  if (!cleaned.includes(thing)) {
     cleaned.push(thing);
    }
  })   
  return cleaned
}
  



// const filterData = (launches) => {

//   let selectedAgency = document.getElementById("agencySelect").value;
//   // console.log(selectedAgency);
//   let selectedLocation = document.getElementById('locationSelect').value;
//   let filteredData = [];
//   if (!selectedAgency || selectedAgency == "all") {
//     // launches.forEach((launch) => { filteredData.push(launch);})
//     displayLaunch(launches);
//   } else {
//     launches.forEach((launch) => {
//       if (launch.launch_service_provider.name == selectedAgency) {
//         filteredData.push(launch);
//         console.log(`launch.launch_service_provider.name is ${launch.launch_service_provider.name} selectedagency is ${selectedAgency}`)
//       }
//     })
//   }
//   console.log('filtered data ',filteredData)
//   displayLaunch(filteredData)
// }


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


const filterData = (launches) => {
  let selectedAgency = document.getElementById("agencySelect").value;
  let selectedLocation = document.getElementById('locationSelect').value;
  let filteredData = [];

  
  launches.forEach((launch) => {
    if (selectedAgency == "all" && selectedLocation == "all") {
  filteredData.push(launch)
    } else if (selectedAgency == launch.launch_service_provider.name) {
      if (selectedLocation == "all") {
        filteredData.push(launch);
      } else if (selectedLocation == launch.pad.location.name) {
        filteredData.push(launch)
      }
    } else if (selectedLocation == launch.pad.location.name) {
      if (selectedAgency=="all") {
        filteredData.push(launch);
      } else if (selectedAgency == launch.launch_service_provider.name) {
        filteredData.push(launch)
      }
      
    }
    
  })
  if (filteredData.length>0) {
    // console.log(filteredData)
  displayLaunch(filteredData)
  } else { noResults()}
 
}

const noResults = () => {
  launchesDiv.innerText=""
  nonFound = document.createElement('h2');
  nonFound.innerHTML = "NO LAUNCHES MATCH YOUR SEARCH..."
  launchesDiv.append(nonFound)
}