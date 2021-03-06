//*================== let's declare some params... =================*//

let offset = 0;
let filters = false;
let lowestScrl = 0;

/*=======adds launches function =======*/

const addLaunchs = (max = 1000) => {
  limit = max;
  fetch(
    `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}`
    // `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((e) => {})
    .then((data) => {
      createOptions(data.results);
      addEvents(data.results);
      document.getElementById("loading").style.display = "none";
      filterData(data.results);
    })
    .catch((e) => {
      console.log("we do not have data", e);

      // document.body.append("fuck my life");
    });
};
if (document.title === "UPCOMING LAUNCHES") {
  addLaunchs();
}

const addAgency = (agencyId, divId) => {
  fetch(`https://lldev.thespacedevs.com/2.2.0/agencies/${agencyId}/`)
    .then((res) => {
      return res.json();
    })
    .catch((e) => {})
    .then((data) => {
      console.log(`divId`, divId);
      // shell = document.getElementById(`${divId.substring(1)}`);
      shell = document.getElementById(divId);
      agencyContent = makeAgency(data, shell);
      console.log(shell);
    })
    .catch((e) => {
      console.log("we do not have data", e);
      // document.body.append("fuck my life");
    });
};

const createOptions = (launches) => {
  let locations = removeDuble(
    launches.map((launch) => {
      return launch.pad.location.name;
    })
  );

  let agencies = removeDuble(
    launches.map((launch) => {
      return launch.launch_service_provider.name;
    })
  );

  let agencySelector = document.getElementById("agencySelect");
  let tempAgency = `<option value="all">All</option>`;
  agencies.forEach((agency) => {
    tempAgency += `<option value="${agency}">${agency}</option>`;
  });
  agencySelector.innerHTML = tempAgency;

  let locationSelector = document.getElementById("locationSelect");
  let tempLocation = `<option value="all">All</option>`;
  locations.forEach((location) => {
    tempLocation += `<option value="${location}">${location}</option>`;
  });
  locationSelector.innerHTML = tempLocation;
};

// adding listeners for dropdowns and checkboxes
const addEvents = (results) => {
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]")
  );

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      filterData(results);
      // console.log("hi");
    });
  });

  // let agencyDrop = document.querySelectorAll("#agencySelect")
  let agencyDrop = document.getElementById("agencySelect");
  let locationDrop = document.getElementById("locationSelect");

  agencyDrop.addEventListener("change", () => {
    filterData(results);
  });
  locationDrop.addEventListener("change", () => {
    filterData(results);
  });
};

// countdown timer
const timeCounter = (T, launchName) => {
  // Set the date we're counting down to
  const countDownDate = new Date(T);

  // Update the count down every 1 second
  var x = setInterval(function () {
    const l = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = countDownDate - l;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if (document.getElementById(`${launchName}-counter`)) {
      document
        .getElementById(`${launchName}-counter`)
        .classList.add("text-red");
      document.getElementById(
        `${launchName}-counter`
      ).innerText = `T- ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    // else { document.getElementById(`${launchName}-counter`).innerText = `T- !!d !!h !!m !!s`; }

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById(`${launchName}-counter`).innerHTML = "LAUNCHED!";
    }
  }, 1000);
};

// creating launch function

const displayLaunch = (launches) => {
  const launchesDiv = document.getElementById("launchesDiv");
  launchesDiv.innerHTML = "";
  launches.forEach((launch) => {
    launchNameShort = makeHtmlId(launch.name);
    card = document.createElement("div");
    card.setAttribute("id", `${launchNameShort}-card`);
    cardClasses = ["card", "aLaunch", "m-5", "pt-0", "pb-0"];
    card.classList.add(...cardClasses);

    cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("p-0");

    launchCardContent = document.createElement("div");
    launchCardContent.setAttribute("id", `${launchNameShort}-card-content`);
    launchCardContent.classList.add("tab-content");
    launchCardContent.setAttribute("id", `${launchNameShort}-tab-Content`);

    let aLaunchSum = makeTab(launchNameShort, "summary");
    aLaunchSum.classList.add("show");
    aLaunchSum.classList.add("active");
    infoCard = makeInfo(launch);
    aLaunchSum.append(...infoCard);
    launchCardContent.append(aLaunchSum);

    let aLaunchAgency = makeTab(launchNameShort, "agency");
    launchCardContent.append(aLaunchAgency);

    let aLaunchLocation = makeTab(launchNameShort, "location");
    locationCard = makeLocation(launch.pad);
    aLaunchLocation.append(...locationCard);
    launchCardContent.append(aLaunchLocation);

    cardBody.append(launchCardContent);

    cardHead = document.createElement("div");
    cardHead.setAttribute("id", `${launchNameShort}-card-head`);
    cardHead.classList.add("card-header");
    cardHeadParts = giveHead(
      launch.name,
      launchNameShort,
      ["summary", "agency", "location"],
      launch.launch_service_provider.id
    );
    cardHead.append(...cardHeadParts);

    card.append(cardHead);
    card.append(cardBody);
    // add launch to launch section
    launchesDiv.append(card);
  });
};

const giveHead = (launchName, launchNameShort, parts, agencyId) => {
  cardLinks = document.createElement("div");
  tabs = document.createElement("ul");
  const ulClassesi = ["nav", "nav-pills", "card-header-tabs"];
  tabs.classList.add(...ulClassesi);
  tabs.setAttribute("id", `${launchNameShort}-linkList`);
  tabs.setAttribute("role", "tablist");
  items = makeItems(launchNameShort, parts, agencyId);
  tabs.append(...items);
  cardLinks.append(tabs);

  cardTitle = document.createElement("div");
  cardTitle.innerHTML = launchName;

  return [cardTitle, cardLinks];
};

const makeItems = (launchName, parts, agencyId = null) => {
  let items = [];
  parts.forEach((part) => {
    // console.log(agencyId);
    li = document.createElement("li");
    li.classList.add("nav-item");
    li.setAttribute("role", "presentation");
    linki = document.createElement("a");
    linki.classList.add("nav-link");
    if (part == "summary") {
      linki.classList.add("active");
    } else if (part == "agency") {
      linki.addEventListener("click", (event) => {
        // console.log(event);
        // console.log(`launchName`, `${launchName}-agency`);
        // divId = event.path[5];
        // console.log(`divId.id`, divId.id);
        addAgency(agencyId, `${launchName}-agency`);
      });
    }

    linki.setAttribute("id", `${launchName}-${part}-tab`);
    linki.setAttribute("data-toggle", "pill");
    linki.setAttribute("href", `#${launchName}-${part}`);
    linki.setAttribute("role", "pill");
    linki.setAttribute("aria-controls", `${launchName}-${part}`);
    if (part == "summary") {
      linki.setAttribute("aria-selected", "true");
    } else {
      linki.setAttribute("aria-selected", "false");
    }
    linki.innerHTML = part;
    li.append(linki);
    items.push(li);
  });
  // console.log(items);
  return items;
};

const makeTab = (launchName, tab) => {
  someLaunchDiv = document.createElement("div");
  someLaunchDiv.setAttribute("id", `${launchName}-${tab}`);
  someLaunchDiv.setAttribute("role", "tabpanel");
  someLaunchDiv.setAttribute("aria-labelledby", `${launchName}-${tab}-tab`);
  const sectionClasses = ["tab-pane", "fade", "flex-wrap"];
  someLaunchDiv.classList.add(...sectionClasses);
  return someLaunchDiv;
};

const makeInfo = (launch) => {
  // create pic div and adds to launch div
  picDiv = document.createElement("div");
  const divClasses = ["col-12", "col-md-6"];
  picDiv.classList.add(...divClasses);

  // create pic and add to pic div
  launchPic = document.createElement("img");
  const imgClasses = ["img-fluid", "pic", "d-flex"];
  launchPic.classList.add(...imgClasses);
  if (launch.image) {
    launchPic.src = launch.image;
  } else {
    launchPic.src = "imgs/takeoff.jpg";
  }

  picDiv.append(launchPic);

  // creates info div and adds to launch div

  infoDiv = document.createElement("div");
  infoDiv.classList.add(...divClasses);
  infoDiv.classList.add("launchBlurb");
  // infoDiv.classList.add('jumbotron')

  // adds title  to info
  launchName = document.createElement("h2");
  launchName.innerText = launch.name;

  launchLocation = document.createElement("p");
  launchLocation.innerText = `from: ${launch.pad.location.name}`;

  // adds time to info
  launchTime = document.createElement("p");
  displayTime = new Date(launch.net).toTimeString();
  launchTime.innerText = displayTime;

  // adds count down
  timeToLaunch = document.createElement("p");
  timeToLaunch.setAttribute("id", `${launch.name}-counter`);
  if (launch.net && launch.name) {
    timeCounter(launch.net, launch.name);
  }

  // adds description

  if (launch.mission.description && launch.mission.description != null) {
    description = document.createElement("p");
    description.innerText = launch.mission.description;

    relavantClasses = ["lead", "my-5", "py-5"];
    description.classList.add(...relavantClasses);

    // if (description.innerText.length > 160) {
    //   console.log('long txt')
    // }
    launchProvider = document.createElement("p");
    launchProvider.innerText = `Provider - ${launch.launch_service_provider.name}`;
    missionTyp = document.createElement("p");
    if (launch.mission != 0) {
      missionTyp.innerText = `Mission Type - ${launch.mission.type}`;
    } else {
      missionTyp.innerText = `Mission Type - Other`;
    }
  }

  infoDiv.append(launchName);
  infoDiv.append(launchTime);
  infoDiv.append(timeToLaunch);
  infoDiv.append(launchProvider);
  infoDiv.append(launchLocation);
  infoDiv.append(missionTyp);

  if (description) {
    infoDiv.append(description);
  }

  return [picDiv, infoDiv];
};

const makeAgency = (agency, shell) => {
  console.log(agency);
  // create pic div
  picDiv = document.createElement("div");
  const divClasses = ["col-12", "col-md-6"];
  picDiv.classList.add(...divClasses);

  // create pic and add to pic div
  agencyPic = document.createElement("img");
  const imgClasses = ["img-fluid", "pic", "d-flex"];
  agencyPic.classList.add(...imgClasses);
  if (agency.logo_url && agency.logo_url != null) {
    agencyPic.src = agency.logo_url;
  } else {
    agencyPic.src =
      "imgs/DFRC_mission_control_during_X-29_test_flight_(EC89-0300-1).jpeg";
  }
  picDiv.append(agencyPic);

  // creates info div

  infoDiv = document.createElement("div");
  infoDiv.classList.add(...divClasses);
  infoDiv.classList.add("launchBlurb");

  // adds title  to info
  agencyName = document.createElement("h2");
  agencyName.innerText = agency.name;
  infoDiv.append(agencyName);

  abbv = document.createElement("p");
  abbv.innerText = `agency abbreviation: ${agency.abbrev}`;
  infoDiv.append(abbv);

  if (agency.country_code != null) {
    agencyCountry = document.createElement("p");
    agencyCountry.innerText = `country code: ${agency.country_code}`;
    infoDiv.append(agencyCountry);
  }

  if (agency.type != null) {
    agencyType = document.createElement("p");
    agencyType.innerText = `type: ${agency.type}`;
    infoDiv.append(agencyType);
  }

  if (agency.founding_year && agency.founding_year != null) {
    agencyBday = document.createElement("p");
    agencyBday.innerText = `founding year: ${agency.founding_year}`;
    infoDiv.append(agencyBday);
  }

  totalLaunches = document.createElement("p");
  totalLaunches.innerText = `total launch count; ${agency.total_launch_count}`;
  infoDiv.append(totalLaunches);

  successfulLaunches = document.createElement("p");
  successfulLaunches.innerText = `successful launches: ${agency.successful_launches}`;
  infoDiv.append(successfulLaunches);
  if (agency.description && agency.description != null) {
    agencyDescription = document.createElement("p");
    agencyDescription.classList.add("lead");
    agencyDescription.innerText = agency.description;
    infoDiv.append(agencyDescription);
  }

  shell.innerHTML = "";
  shell.append(picDiv);
  shell.append(infoDiv);
  return shell;
};

const makeLocation = (location) => {
  picDiv = document.createElement("div");
  const divClasses = ["col-12", "col-md-6"];
  picDiv.classList.add(...divClasses);

  // create pic and add to pic div
  locationPic = document.createElement("img");
  const imgClasses = ["img-fluid", "pic", "d-flex"];
  locationPic.classList.add(...imgClasses);
  locationPic.src = location.map_image;
  locationPicLink = document.createElement("a");
  locationPicLink.setAttribute("href", `${location.map_url}`);
  locationPicLink.append(locationPic);

  picDiv.append(locationPicLink);

  // creates info div

  infoDiv = document.createElement("div");
  infoDiv.classList.add(...divClasses);
  infoDiv.classList.add("launchBlurb");
  // // infoDiv.classList.add('jumbotron')

  // adds title  to info
  locationName = document.createElement("h2");
  locationName.innerText = location.location.name;
  infoDiv.append(locationName);
  padName = document.createElement("h4");
  padName.innerText = location.name;
  infoDiv.append(padName);

  goodLaunch = document.createElement("p");
  goodLaunch.innerText = `total launch count: ${location.location.total_launch_count}`;
  infoDiv.append(goodLaunch);

  if (location.wiki_url && location.wiki_url != 0) {
    wikiLink = document.createElement("a");
    wikiLink.setAttribute("href", `${location.wikiLink}`);
    wikiLink.innerText = "Read more on Wikipedia";
    infoDiv.append(wikiLink);
  }

  return [picDiv, infoDiv];
};

//  removing doubles function

const removeDuble = (toClean) => {
  let cleaned = [];
  toClean.forEach((thing) => {
    if (!cleaned.includes(thing)) {
      cleaned.push(thing);
    }
  });
  return cleaned;
};

const makeHtmlId = (launchName) => {
  launchName = launchName.replace(/\s+/g, "");
  launchName = launchName.replace(/\W/g, "");
  launchName = launchName.replace("|", "-");
  return launchName;
};

const filterData = (launches) => {
  let selectedAgency = document.getElementById("agencySelect").value;
  let selectedLocation = document.getElementById("locationSelect").value;
  let filteredData = [];
  let checkboxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((checkbox) => {
    return checkbox.value;
  });
  // console.log(checkboxes);

  let filtered = launches.filter((launch) => {
    if (launch.mission == null) {
      launch.mission = { type: "Other" };
    }
    return (
      (checkboxes.length === 0 &&
        selectedAgency === "all" &&
        selectedLocation === "all") ||
      (checkboxes.length !== 0 &&
        checkboxes.includes(launch.mission.type) &&
        selectedAgency === "all" &&
        selectedLocation === "all") ||
      (selectedAgency !== "all" &&
        selectedLocation === "all" &&
        checkboxes.length === 0 &&
        selectedAgency === launch.launch_service_provider.name) ||
      (checkboxes.length !== 0 &&
        checkboxes.includes(launch.mission.type) &&
        selectedLocation === "all" &&
        selectedAgency === launch.launch_service_provider.name) ||
      (selectedAgency === "all" &&
        selectedLocation === launch.pad.location.name &&
        checkboxes.length === 0) ||
      (selectedAgency == "all" &&
        checkboxes.length !== 0 &&
        selectedLocation == launch.pad.location.name &&
        checkboxes.includes(launch.mission.type)) ||
      (selectedLocation === launch.pad.location.name &&
        selectedAgency === launch.launch_service_provider.name &&
        checkboxes.length === 0) ||
      (selectedLocation === launch.pad.location.name &&
        selectedAgency === launch.launch_service_provider.name &&
        checkboxes.includes(launch.mission.type))
    );
  });
  if (filtered.length == 0) {
    noResults();
  } else {
    displayLaunch(filtered);
  }

  // console.log(filtered);
};

const noResults = () => {
  launchesDiv.innerText = "";
  nonFound = document.createElement("h2");
  nonFound.innerHTML = "NO LAUNCHES MATCH YOUR SEARCH...";
  launchesDiv.append(nonFound);
};
console.log(noResults);
