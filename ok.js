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
// flex - wrap flex - md - nowrap
