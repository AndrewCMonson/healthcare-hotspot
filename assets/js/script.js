// API call that takes in a zipcode and returns city and state information
const getCityState = (zipcode) =>{
    const url = `https://ZiptasticAPI.com/${zipcode}`;

    fetch(url)
        .then(response => response.json())
        .then(responseJSON => getHealthInfo(responseJSON.city, responseJSON.state))
        .catch(err => showZipModal(err))
}
// API call that takes city and state from getCityState API call and grabs user input selection from DOM to pass to buildProviders function to populate DOM with providers
const getHealthInfo = (city, state) => {
    const taxonomy = getUserProviderTypeSelection();
    const url = `https://corsproxy.io/?https://npiregistry.cms.hhs.gov/api/?version=2.1&&city=${city}&state=${state}&pretty=on&limit=200&taxonomy_description=${taxonomy}`;
    

    fetch(url)
        // returns api response, converts to JSON then stores JSON data into variable
        .then(response => response.json())
        // .then(responseJson => console.log(responseJson))
        .then(responseJson => buildProviders(responseJson.results))  
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
            providerAddressOne: currentProvider.addresses[0].address_1,
            providerCity: currentProvider.addresses[0].city,
            providerState: currentProvider.addresses[0].state,
            providerZip: currentProvider.addresses[0].postal_code,
            providerTelephone: currentProvider.addresses[0].telephone_number,
            providerSpecialty: currentProvider.taxonomies[0].desc
        }
        providerArr.push(providerInfo);
    }

    const shuffledArray = shuffle(providerArr);

    const slicedShuffledArray = shuffledArray.slice(0, 15);

    slicedShuffledArray.forEach(getProviderType);

}

// This function takes in an array of objects and publishes select information to the DOM based on if the provided arr contains a provider first name or not
// If there is no first name, it uses the org name and publishes the rest of the information accordingly
// This is used by a forEach method within the object array constructor function (buildProvider)
const displayProviders = (obj) => {
    const contentDiv = document.getElementById('content-div'); 
    const nameDiv = document.createElement('div');
    const addressDiv = document.createElement('div');
    const telephoneDiv = document.createElement('div');

    if(obj.providerFirstName){
        contentDiv.append(nameDiv);
        nameDiv.textContent = `${obj.providerFirstName} ${obj.providerLastName}`
        nameDiv.classList.add('temp-div', 'box', 'has-text-centered', 'column', 'is-one-third', 'mb-0', 'is-size-3', 'is-flex', 'is-flex-direction-column', 'is-justify-content-space-between');
        addressDiv.classList.add('temp-div', 'container', 'box', 'has-text-centered', 'mb-0', 'is-size-6');
        telephoneDiv.classList.add('temp-div', 'container', 'box', 'has-text-centered', 'mb-0', 'is-size-6');
        if(obj.providerAddressOne){
            nameDiv.append(addressDiv);
            addressDiv.innerHTML = `<a target=_blank href="https://www.google.com/maps/place/${obj.providerAddressOne}+${obj.providerCity}+${obj.providerState}+${obj.providerZip.slice(0, -4)}">${obj.providerAddressOne} ${obj.providerCity} ${obj.providerState}, ${obj.providerZip.slice(0, -4)}</a>`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(obj.providerTelephone){
            nameDiv.append(telephoneDiv);
            telephoneDiv.innerHTML = `<a href="tel:+${obj.providerTelephone}">${obj.providerTelephone}</a>`;
        }else {
            nameDiv.append(telephoneDiv);
            telephoneDiv.textContent = `No Phone Number Provided`;
        }
    } 
    else {
        const nameDiv = document.createElement('div');
        contentDiv.append(nameDiv);
        nameDiv.textContent = `${obj.providerOrgName}`;
        nameDiv.classList.add('temp-div', 'box', 'has-text-centered', 'column', 'is-one-third', 'mb-0', 'is-size-3', 'is-flex', 'is-flex-direction-column', 'is-justify-content-space-between');
        addressDiv.classList.add('temp-div', 'container', 'box', 'has-text-centered', 'mb-0', 'is-size-6')
        telephoneDiv.classList.add('temp-div', 'container', 'box', 'has-text-centered', 'mb-0', 'is-size-6')
        if(obj.providerAddressOne){
            nameDiv.append(addressDiv);
            addressDiv.innerHTML = `<a target=_blank href="https://www.google.com/maps/place/${obj.providerAddressOne}+${obj.providerCity}+${obj.providerState}+${obj.providerZip.slice(0, -4)}">${obj.providerAddressOne} ${obj.providerCity} ${obj.providerState}, ${obj.providerZip.slice(0, -4)}</a>`;
        }else {
            nameDiv.append(addressDiv);
            addressDiv.textContent = `No Address Provided`;
        }
        if(obj.providerTelephone){
            nameDiv.append(telephoneDiv);
            telephoneDiv.innerHTML = `<a href="tel:+${obj.providerTelephone}">${obj.providerTelephone}</a>`;
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
    const deletedDiv = document.getElementById('content-div');
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


// function used to grab user selection from the DOM
const getUserProviderTypeSelection = () => {
    const selectionValue = document.querySelector('.option-selection').value;
    return selectionValue;
}

// function used to 
const getProviderType = (obj) => {
    const userSelection = getUserProviderTypeSelection();
    const chooseProvider = ''

    if(userSelection != chooseProvider){
        if(obj.providerSpecialty.includes(userSelection)){
            displayProviders(obj);
        } 
    }else {
        const modal = document.querySelector('.modal');
        const modalPara = document.querySelector('.modal-body');
        modalPara.textContent = 'Please select a provider type'
        modal.classList.add('is-active')
    }
    
}

const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
}; 