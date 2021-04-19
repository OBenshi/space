// current > maxHeight * 0.537 && current > lowestScrl
let lowestScrl = 0
function onScroll(event) {
  const current = document.documentElement.scrollTop;
  const maxHeight = document.body.scrollHeight;
    // console.log(`current is ${current}, maxHeight is ${maxHeight}, lowest scroll is ${lowestScrl}`)
  // if current position is more than 80% of document height
  if (current > lowestScrl && current>maxHeight*0.537) {
    console.log('down')
    offset = offset + 3;
    addLaunchs();
    lowestScrl = current
  } 
}

current > maxHeight * 0.537 && current > lowestScrl

window.addEventListener('scroll', event => onScroll(event));

  // if current position is more than 80% of document height
  if (current > lowestScrl) {
      offset = offset + 3;
      console.log(9)
      addLaunchs();
      if (current == lowestScrl) {
        //   lowestScrl = current
          console.log(90)
      }
  } else {console.log(`current is ${current}, maxHeight is ${maxHeight}, scrlBtmMax is ${lowestScrl}`)}
}
