let start_date = dayjs().format("YYYY-MM-DD");
let end_date = dayjs(start_date).subtract(5, "day").format("YYYY-MM-DD");
// const apodKey2 = process.env.TAZ;
const callNasa = () => {
  console.log(`start date is ${start_date}`);
  console.log(`end date is ${end_date}`);
  // console.log(`apodKey2`, apodKey2);
  if (start_date !== end_date) {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${APOD_TOKEN}&start_date=${end_date}&end_date=${start_date}`
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

        displayAPod(data);
      })
      .catch((e) => {
        console.log("we do not have data", e);
        document.body.append("fuck my life");
      });
  }
  start_date = dayjs(end_date).subtract(1, "day").format("YYYY-MM-DD");
  end_date = dayjs(start_date).subtract(5, "day").format("YYYY-MM-DD");
};

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
let i = 1;
const displayAPod = (pods) => {
  const podsDiv = document.getElementById("podsDiv");

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
          "order-1",
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
      innerXplainDiv.innerHTML = `<h2 class="my-3">${pod.title}</h2><p>${pod.explanation}</p>`;
      xplainDiv.append(innerXplainDiv);

      if (i % 2 == 0) {
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
