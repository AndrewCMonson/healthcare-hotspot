
// this is a sample api fetch that returns 200 results based on a zipcode entered.
// example of API url call
//https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1& +postal_code + =$ +zipcode + &pretty=on&limit=10

const getHealthInfo = (city, state) => {
    const url = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&&city=${city}&state=${state}&pretty=on&limit=10`;
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
// getHealthInfo('Greenville', 'SC');


// API call that takes in a zipcode and returns city and state information
const getCityState = (zipcode) =>{
    const url = `http://ZiptasticAPI.com/${zipcode}`;

    fetch(url)
        .then(response => response.json())
        .then(responseJSON => getHealthInfo(responseJSON.city, responseJSON.state))
}



getCityState(29680)

// This function takes in an API response as an argument and builds an array of objects (providers) with the API information
const buildProviders = (data) => {
    const providerArr = [];

    for(let i = 0; i < data.length; i++){
        const currentProvider = data[i];
        // console.log(data[i])

        const providerInfo = {
            providerOrgName: currentProvider.basic.organization_name,
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

// This function takes in an array of objects and publishes select information to the DOM based on if the provided arr contains a provider first name or not
// If there is no first name, it uses the org name and publishes the rest of the information accordingly
// This is used by a forEach method within the object array constructor function (buildProvider)
const displayProviders = (arr) => {
    console.log(arr);
    const testDiv = document.getElementById('test-div');
    const nameDiv = document.createElement('div');
    const addressDiv = document.createElement('div');
    const telephoneDiv = document.createElement('div');

    // nameDiv.className = 'column'
    // console.log(arr.providerFirstName)

    if(arr.providerFirstName){
        console.log(arr.providerFirstName)
        testDiv.append(nameDiv);
        nameDiv.textContent = `${arr.providerFirstName} ${arr.providerLastName}`
        if(arr.providerAddressOne){
            console.log(arr.providerAddressOne);
            nameDiv.append(addressDiv);
            addressDiv.textContent = `${arr.providerAddressOne} ${arr.providerCity} ${arr.providerState} ${arr.providerZip}`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(arr.providerTelephone){
            console.log(arr.providerTelephone)
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `${arr.providerTelephone}`;
        }else {
            console.log(arr.providerTelephone)
            
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `No Phone Number Provided`;
        }
    } 
    else {
        console.log(arr.providerOrgName)
        const nameDiv = document.createElement('div');
        testDiv.append(nameDiv);
        nameDiv.textContent = `${arr.providerOrgName}`;
        if(arr.providerAddressOne){
            console.log(arr.providerAddressOne);
            nameDiv.append(addressDiv);
            addressDiv.textContent = `${arr.providerAddressOne} ${arr.providerCity} ${arr.providerState} ${arr.providerZip}`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(arr.providerTelephone){
            console.log(arr.providerTelephone)
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `${arr.providerTelephone}`;
        }else {
            console.log(arr.providerTelephone)
            
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `No Phone Number Provided`;
        }
    }
}

// added some notes about what we discussed 10/30/23 -Jess
// we decided to utilize a different API for matching user input zipcode to a city
// city will get pushed into healthcare API for results
// example API call:
// http://ZiptasticAPI.com/23517

// document.querySelector("search-button").addEventListener("click", getZipcode);

// function getZipcode() {
//     var userZipcode = document.querySelector("#user-input").value;
//     if (userZipcode == null) {
//         const feedback = document.createElement('p')
//         feedback.textContent = 'Please submit a zipcode';
//     } else{
//       // pull city matched from zipcode API run,
//       // add to API url as ${city}
//       // run new API call then push to 2nd API above
//   }
// }

    

