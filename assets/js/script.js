
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
        // .then(responseJson => console.log(responseJson.results))
        .then(responseJson => buildProviders(responseJson.results))
        // .then(responseJson => compareZips(1740903558, responseJson))        
}

// add event listener to grab search bar information and pass through getHealthInfo
getHealthInfo(29680)


// This function takes in an API response as an argument and builds an array of objects (providers) with the API information
const buildProviders = (data) => {
    const providerArr = [];

    for(let i = 0; i < data.length; i++){
        const currentProvider = data[i];
        // console.log(data[i])

        const providerInfo = {
            providerFirstName: currentProvider.basic.first_name,
            providerLastName: currentProvider.basic.last_name,
            providerAddressOne: currentProvider.addresses[1].address_1,
            providerCity: currentProvider.addresses[1].city,
            providerState: currentProvider.addresses[1].state,
            providerZip:currentProvider.addresses[1].postal_code,
            providerTelephone: currentProvider.addresses[1].telephone_number,
        }

        providerArr.push(providerInfo);
    }
    // console.log(providerArr);

    providerArr.forEach(displayProviders);
}

const displayProviders = (arr) => {

    const testDiv = document.getElementById('test-div');
    // console.log(arr.providerFirstName)

    if(arr.providerFirstName){
        console.log(arr.providerFirstName)
        const nameDiv = document.createElement('div');
        testDiv.append(nameDiv);
        nameDiv.textContent = `${arr.providerFirstName} ${arr.providerLastName}`
        // const lastNameDiv = document.createElement('div');
        // testDiv.append(lastNameDiv);
        // lastNameDiv.textContent = arr.providerLastName
    }if(!arr.providerFirstName){
        const nameDiv = document.createElement('div');
        testDiv.append(nameDiv);
        nameDiv.textContent = `No name provided`;
    }if(arr.providerAddressOne){
        console.log(arr.providerAddressOne)
        const addressDiv = document.createElement('div');
        testDiv.append(addressDiv);
        addressDiv.textContent = `${arr.providerAddressOne} ${arr.providerCity} ${arr.providerState} ${arr.providerZip}`;
    }if(!arr.providerAddressOne){
        const addressDiv = document.createElement('div');
        testDiv.append(addressDiv);
        addressDiv.textContent = `No Address Provided`;
    }if(arr.providerAddressOne){
        // console.log(arr.providerTelephone)
        const telephoneDiv = document.createElement('div');
        testDiv.append(telephoneDiv);
        telephoneDiv.textContent = `${arr.providerTelephone}`;
    }if(!arr.providerAddressOne){
        // console.log(arr.providerTelephone)
        const telephoneDiv = document.createElement('div');
        testDiv.append(telephoneDiv);
        telephoneDiv.textContent = `No Phone Number Provided`;
    }
    // const displayDiv = document.getElementById('display-div');
    // const newDiv = document.createElement('div');
    // displayDiv.appendChild(newDiv);
    // newDiv.textContent = rr[currentProviderInfo].providerFirstName
    

    // const newDiv = document.createElement('div');
    // displayDiv.appendChile(newDiv);
    // newDiv.textContent = arr.providerFirstName

}



// write functions that ingest API response and populate to the DOM

// const testDisplay = (response) => {
//     // drill down into the data we want to display
//     // addresses
//     // providers name
//     // provider phone
//     const testPara = document.getElementById('test-para');

//     testPara.textContent = response.results[0].addresses[0].postal_code
// }

// getHealthInfo(29680);

// /**
//  * input a zipcode
//  * if zipcode === api results zip code
//  * return the information attached to that array
//  */

// // have to compare an input zipcode to zipcodes stored in api response
// const compareZips = (userInput, response) => {
//     let savedZipCodes;
//     const responseResults = response.results[0];


//     for(let i = 0; i < responseResults.length; i++){
//         if(userInput === responseResults[i].number){
//             savedZipCodes = responseResults[i].number
//         }
//     }
    
//     console.log(savedZipCodes);

// }

// // splitting data we will need into defined variables for use later, feel free to edit
// // found these definitions here: https://npiregistry.cms.hhs.gov/help-api/json-conversion

// var providerName = results[0].basic.organization_name
// var providerAddressLine1 = addresses[1].address_1
// var providerAddressLine2 = addresses[1].address_2
// var providerAddressCity = addresses[1].city
// var providerAddressState = addresses[1].state
// var providerAddressZip = addresses[1].postal_code
// var providerPhoneNumber = addresses[0].telephone_number

// console.log(`${providerAddressLine1} ${providerAddressLine2}`);

