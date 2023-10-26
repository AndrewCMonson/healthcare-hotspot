
// this is a sample api fetch that returns 200 results based on a zipcode entered.


const getHealthInfo = (zipcode) => {
    const url = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&postal_code=${zipcode}&pretty=on&limit=200`;
    

    fetch(url)
        .then(response => response.json())
        .then(responseJson => console.log(responseJson)); 
            
}

getHealthInfo(29680);
