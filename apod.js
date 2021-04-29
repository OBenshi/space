let start_date = dayjs().subtract(1, "day").format("YYYY-MM-DD");
let end_date = dayjs(start_date).subtract(5, "day").format("YYYY-MM-DD");
// console.log(`a is ${a.format()} and b is ${b.format()}`);

// let start_date = moment().format("YYYY-MM-DD");
// api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2017-07-08&end_date=2017-07-10
// let end_date = new Date(start_date);
// end_date.setDate(end_date.getDate() - 5); //end_date is now 8 days in the future
// console.log(`myFuture date is ${end_date.toISOString().slice(0, 10)}`);
// console.log(`start_date is ${start_date}`);
// 'and end_date
//api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2021-04-28&end_date=2021-05-06
const callNasa = () => {
  if (start_date !== end_date) {
    // start_date = dayjs(end_date).format("YYYY-MM-DD");
    // end_date = dayjs(end_date).subtract(8, "day").format("YYYY-MM-DD");
    // console.log(`START: STARTstart date is ${start_date}`);
    // console.log(`START:END date is ${end_date}`);
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apodKey}&start_date=${end_date}&end_date=${start_date}`
    )
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        console.log(e);
      })
      .then((data) => {
        console.log(data);
        document.getElementById("loadingPods").style.display = "none";

        // start_date = moment(end_date).format("YYYY-MM-DD");
        // end_date = moment(end_date).subtract(8, "day").format("YYYY-MM-DD");
        displayAPod(data);
        // console.log(`END:START date is ${start_date}`);
        // console.log(`END:END date is ${end_date}`);
      })
      .catch((e) => {
        console.log("we do not have data", e);
        document.body.append("fuck my life");
      });
  }
  start_date = dayjs(end_date).format("YYYY-MM-DD");
  end_date = dayjs(end_date).subtract(5, "day").format("YYYY-MM-DD");
};

// document.getElementById("hhh").addEventListener("click", () => {
//   callNasa();
// });

callNasa();

// load more on scroll function

const onScroll = (event) => {
  const current = document.documentElement.scrollTop;
  const maxHeight = document.body.scrollHeight;
  if (current > lowestScrl && current > maxHeight * 0.6) {
    // offset = offset + 10;
    callNasa();
    lowestScrl = current;
  } //
};
window.addEventListener("scroll", (event) => onScroll(event));

const displayAPod = (pods) => {
  const podsDiv = document.getElementById("podsDiv");
  let i = 1;
  // podsDiv.innerHTML = "";
  pods.reverse().forEach((pod) => {
    if (pod.media_type == "image") {
      podHtmlId = makeHtmlId(pod.title);
      aPodDiv = document.createElement("div");
      aPodDiv.id = podHtmlId;
      let relvantClasses = ["row", "align-items-center", "content", "py-2"];
      aPodDiv.classList.add(...relvantClasses);

      aPodPicDiv = document.createElement("div");
      if (i % 2 == 0) {
        relvantClasses = [
          "col-md-6",
          "embed-responsive",
          "order-1",
          "order-md-2",
        ];
      } else {
        relvantClasses = [
          "col-md-6",
          "embed-responsive",
          "order-2",
          "order-md-1",
        ];
      }

      aPodPicDiv.classList.add(...relvantClasses);

      figure = document.createElement("figure");
      figure.classList.add("figure");
      figcaption = document.createElement("figcaption");
      figcaption.innerHTML = `${pod.title} by<cite title="${pod.title}"> ${pod.copyright}</cite>`;
      aPodPic = document.createElement("img");
      relvantClasses = ["img-fluid", "pic"];
      aPodPic.classList.add(...relvantClasses);
      aPodPic.src = pod.url;
      figure.append(aPodPic);
      figure.append(figcaption);
      aPodPicDiv.append(figure);

      xplainDiv = document.createElement("div");
      if (i % 2 == 0) {
        relvantClasses = [
          "col-md-6",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "order-md-1",
          "order-2",
        ];
      } else {
        relvantClasses = [
          "col-md-6",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "order-md-2",
          "order-1",
        ];
      }

      xplainDiv.classList.add(...relvantClasses);
      innerXplainDiv = document.createElement("div");
      relvantClassesInner = ["col-9", "blurb", "lead"];
      innerXplainDiv.classList.add(...relvantClassesInner);
      innerXplainDiv.innerHTML = `<h2>${pod.title}</h2><p>${pod.explanation}</p>`;
      xplainDiv.append(innerXplainDiv);

      if (i % 2 != 0) {
        aPodDiv.append(aPodPicDiv);
        aPodDiv.append(xplainDiv);
      } else {
        aPodDiv.append(xplainDiv);
        aPodDiv.append(aPodPicDiv);
      }
    }
    podsDiv.append(aPodDiv);
    i = i + 1;
  });
};
