
// show more or less 
const dots = document.querySelectorAll('.dots');
for (const dot of dots) {
    dot.addEventListener('click', function (event) {
        showHide(event);
  });  
}


const less = document.querySelectorAll('.less');
for (const thing of less) {
    thing.addEventListener('click', function (event) {
        showHide(event);
    })
}

// show more or less function 

function showHide(event) {
    const blurb =event.target.closest('div').id
    const dots = document.getElementById(blurb+"-dots");
    const less = document.getElementById(blurb + "-less");
    const more = document.getElementById(blurb + "-more");
    if (dots.style.display !== 'none') {
        dots.style.display = 'none';
        more.style.display = 'inline';
        less.style.display = 'inline';
    } else {
        dots.style.display = 'inline';
        more.style.display = 'none';
        less.style.display = 'none';
    }
}
