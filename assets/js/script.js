
// this is a sample api fetch that returns 200 results based on a zipcode entered.
// example of API url call
//https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1& +postal_code + =$ +zipcode + &pretty=on&limit=10

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

// splitting data we will need into defined variables for use later, feel free to edit
// found these definitions here: https://npiregistry.cms.hhs.gov/help-api/json-conversion

var providerName = basic.organization_name
var providerAddressLine1 = addresses[1].address_1
var providerAddressLine2 = addresses[1].address_2
var providerAddressCity = addresses[1].city
var providerAddressState = addresses[1].state
var providerAddressZip = addresses[1].postal_code
var providerPhoneNumber = addresses[0].telephone_number

// building an outline of the function we may need to build a data array of each provider's info we want
// we should be able to pull multiple pieces of data within 1 function (??)

function parseProviderData (providerContactInfo){
    // an object with the info we want from the API, each as a property
    const {
        // may need to expand this to first & last depending on accuracy of test pull
        Name: providerName,
        // not sure if I can do this
        Address: providerAddressLine1 + providerAddressLine2
        City: providerAddressCity,
        State: providerAddressState,
        Zipcode: providerAddressZip,
        Phone: providerPhoneNumber,
    } = providerContactInfo

    return {
    providerName,
    providerAddressLine1,
    providerAddressLine1,
    providerAddressCity,
    providerAddressState,
    providerAddressZip,
}
}