
// this is a sample api fetch that returns 200 results based on a zipcode entered.
// example of API url call
//https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1& +postal_code + =$ +zipcode + &pretty=on&limit=10

const getHealthInfo = (city, state) => {
    const url = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&&city=${city}&state=${state}&pretty=on&limit=10`;
    // let responseData = null
    

    fetch(url)
        // returns api response, converts to JSON then stores JSON data into variable
        .then(response => response.json())
        .then(responseJson => buildProviders(responseJson.results))  
        .catch(err => showZipModal(err))      
}

// API call that takes in a zipcode and returns city and state information
const getCityState = (zipcode) =>{
    const url = `http://ZiptasticAPI.com/${zipcode}`;

    fetch(url)
        .then(response => response.json())
        .then(responseJSON => getHealthInfo(responseJSON.city, responseJSON.state))
        .catch(err => showZipModal(err))
}

// This function takes in an API response as an argument and builds an array of objects (providers) with the API information
const buildProviders = (data) => {
    const providerArr = [];

    for(let i = 0; i < data.length; i++){
        const currentProvider = data[i];

        const providerInfo = {
            providerOrgName: currentProvider.basic.organization_name,
            providerFirstName: currentProvider.basic.first_name,
            providerLastName: currentProvider.basic.last_name,
            providerAddressOne: currentProvider.addresses[1].address_1,
            providerCity: currentProvider.addresses[1].city,
            providerState: currentProvider.addresses[1].state,
            providerZip: currentProvider.addresses[1].postal_code,
            providerTelephone: currentProvider.addresses[1].telephone_number,
            providerSpecialty: currentProvider.taxonomies[0].desc
        }

        providerArr.push(providerInfo);
    }

    providerArr.forEach(displayProviders);
}

// This function takes in an array of objects and publishes select information to the DOM based on if the provided arr contains a provider first name or not
// If there is no first name, it uses the org name and publishes the rest of the information accordingly
// This is used by a forEach method within the object array constructor function (buildProvider)
const displayProviders = (arr) => {
    const testDiv = document.getElementById('test-div');
    const nameDiv = document.createElement('div')
    const addressDiv = document.createElement('div')
    const telephoneDiv = document.createElement('div')

    if(arr.providerFirstName){
        testDiv.append(nameDiv);
        nameDiv.textContent = `${arr.providerFirstName} ${arr.providerLastName}`
        nameDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'column', 'is-half', 'mb-0', 'is-size-3', 'is-flex', 'is-flex-direction-column', 'is-justify-content-space-between');
        addressDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'mb-0', 'is-size-6')
        telephoneDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'mb-0', 'is-size-6')
        if(arr.providerAddressOne){
            nameDiv.append(addressDiv);
            addressDiv.textContent = `${arr.providerAddressOne} ${arr.providerCity} ${arr.providerState}, ${arr.providerZip.slice(0, -4)}`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(arr.providerTelephone){
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `${arr.providerTelephone}`;
        }else {
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `No Phone Number Provided`;
        }
    } 
    else {
        const nameDiv = document.createElement('div');
        testDiv.append(nameDiv);
        nameDiv.textContent = `${arr.providerOrgName}`;
        nameDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'column', 'is-half', 'mb-0', 'is-size-3', 'is-flex', 'is-flex-direction-column', 'is-justify-content-space-between');
        addressDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'mb-0', 'is-size-6')
        telephoneDiv.classList.add('temp-div', 'container', 'box', 'is-justify-content-center', 'has-text-centered', 'mb-0', 'is-size-6')
        if(arr.providerAddressOne){
            nameDiv.append(addressDiv);
            addressDiv.textContent = `${arr.providerAddressOne} ${arr.providerCity} ${arr.providerState}, ${arr.providerZip.slice(0, -4)}`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(arr.providerTelephone){
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `${arr.providerTelephone}`;
        }else {
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `No Phone Number Provided`;
        }
    }
}


// function to show warning modal
const showZipModal = () => {
    const modal = document.querySelector('.modal');
    // const modalBody = document.querySelector('.modal-body')
    modal.classList.add('is-active');
    // modalBody.textContent = err
}

// function that deletes existing information and allows for divs to be repopulated
const deleteDivs = () => {
    const deletedDiv = document.getElementById('test-div');
    deletedDiv.innerHTML = '';
}

document.querySelector('.search-input').addEventListener('keypress', e => {
    if(isNaN(e.key) && e.key !== 'Backspace'){
        e.preventDefault()
    }
})

// Two event listeners that capture user input and  start the chain of API calls and function calls 
document.querySelector('.search-button').addEventListener('click', e => {
    const userInput = document.querySelector('.search-input').value;
    deleteDivs();
    getCityState(userInput);
})

document.querySelector('.search-input').addEventListener('keypress', e => {
    if(e.key === 'Enter'){
        e.preventDefault();
        document.querySelector('.search-button').click();
    }
})

// modal management script provided by Bulma
document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    const openModal = ($el) => {
      $el.classList.add('is-active');
    }
  
    const closeModal = ($el) => {
      $el.classList.remove('is-active');
    }
  
    const closeAllModals = () => {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        closeAllModals();
      }
    });
});