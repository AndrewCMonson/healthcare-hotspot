
// this is a sample api fetch
// currently it is NOT working due to an issues with the NPPES api configuration

const getHealthInfo = (zipcode) => {
    const apiUrl = `https://npi-registry-proxy.herokuapp.com/?postal_code=${zipcode}`

    fetch(apiUrl)
        .then((response) => {
            if(response.ok){
                response.json()
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch((error) => {
            alert('Unable to connect to NPPES Registry')
        })
}

getHealthInfo(29680);