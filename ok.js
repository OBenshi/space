const addLaunchsi = (max=800)=> {
  limit=max
  fetch(`https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&offset=${offset}`)
    .then(res => {
        return res.json()
    }).catch(e => {
    })
      .then((data) => {
          data.results.forEach(launch => {
console.log(launch.launch_service_provider.type)
            
            
        });

    }).catch(e => {
        console.log('we do not have data', e)
        document.body.append('fuck my life')
    })

}
addLaunchsi()