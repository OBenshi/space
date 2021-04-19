
let lowestScrl = 0
function onScroll(event) {
  const current = document.documentElement.scrollTop;
  const maxHeight = document.body.scrollHeight;
    // console.log(`current is ${current}, maxHeight is ${maxHeight}, lowest scroll is ${lowestScrl}`)
  // if current position is more than 80% of document height
  if (current > lowestScrl && current>maxHeight*0.5) {
    console.log('down')
    offset = offset + 3;
    addLaunchs();
    lowestScrl = current
  } 
}
window.addEventListener('scroll', event => onScroll(event));

let offset = 0


let addLaunchs = ()=>{fetch(`https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=3&offset=${offset}`)
    .then(res => {
        console.log(`we hav res`)
        return res.json()
    }).catch(e => {
    })
    .then((data) => {
        showUpcoming(data);
    }).catch(e => {
        console.log('we do not have data', e)
        document.body.append('fuck my life')
    })}

addLaunchs()


const showUpcoming = (data) => {
        for (const launch of data.results) {
 
    // creates launch div
    aLaunch = document.createElement('div');
    const sectionClasses = ['row', 'align-items-center','my-4','mx-2'];
    aLaunch.classList.add(...sectionClasses);

        // create pic div and adds to launch div
    picDiv = document.createElement('div');
    const divClasses = ['col-12', 'col-md-6'];
    picDiv.classList.add(...divClasses)
    aLaunch.append(picDiv)

            // create pic and add to pic div
    launchPic = document.createElement('img');
    const imgClasses = ['img-fluid','pic']
    launchPic.classList.add(...imgClasses);
    if (launch.image) {
        launchPic.src = launch.image;
    } else { launchPic.src = "imgs/oldBW.jpg"}
            
    picDiv.append(launchPic);

// creates info div and adds to launch div 
    
    infoDiv = document.createElement('div');
    infoDiv.classList.add(...divClasses);
    infoDiv.classList.add('blurb');
            aLaunch.append(infoDiv);
            
            // adds title  to info 
        launchName = document.createElement('h2');
        launchName.innerText = launch.name;
        infoDiv.append(launchName);

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
            if (launch.mission!=null) {
               description.innerText = launch.mission.description; 
            } else {
                description.innerText = 'no description'
            }
            infoDiv.append(description)
            if (description.innerText.length>160) {
                console.log('long txt')
            }            
            
    
 // add launch to launch section 

    document.getElementById('launches').append(aLaunch);
}
    }




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
    }else { console.log('time error')}
  
    

// If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById(`${launchName}-id`).innerHTML = "LAUNCHED!";
  }
}, 1000);  
}
