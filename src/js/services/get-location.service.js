export const getLocationService = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

    fetch(url).then(data => data.json()).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  })
}
