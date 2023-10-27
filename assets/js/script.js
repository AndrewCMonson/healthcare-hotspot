
// this is a sample api fetch that returns 200 results based on a zipcode entered.


const getHealthInfo = (zipcode) => {
    const url = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&postal_code=${zipcode}&pretty=on&limit=10`;
    // let responseData = null
    

    fetch(url)
        // returns api response, converts to JSON then stores JSON data into variable
        .then(response => response.json())
        // .then(responseJson => testDisplay(responseJson))
        .then(responseJson => console.log(responseJson))
        // .then(responseJson => compareZips(1740903558, responseJson))        
}

// write functions that ingest API response and populate to the DOM

const testDisplay = (response) => {
    // drill down into the data we want to display
    // addresses
    // providers name
    // provider phone
    const testPara = document.getElementById('test-para');

    testPara.textContent = response.results[0].addresses[0].postal_code
}

getHealthInfo(29680);

/**
 * input a zipcode
 * if zipcode === api results zip code
 * return the information attached to that array
 */

// have to compare an input zipcode to zipcodes stored in api response
const compareZips = (userInput, response) => {
    let savedZipCodes;
    const responseResults = response.results[0];


    for(let i = 0; i < responseResults.length; i++){
        if(userInput === responseResults[i].number){
            savedZipCodes = responseResults[i].number
        }
    }
    
    console.log(savedZipCodes);

}



