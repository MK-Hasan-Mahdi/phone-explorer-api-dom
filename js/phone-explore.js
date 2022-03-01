
// document.getElementById('error-msg').style.display = 'none';
const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('phone-details');
const errorMsg = document.getElementById('error-msg');
const searchPhone = () => {

    const searchField = document.getElementById('search-field');

    const searchFieldText = searchField.value;
    // document.getElementById('error-msg').style.display = 'none';
    if (searchFieldText == "") {
        errorMsg.innerText = 'Please provide a phone name';
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))
        // .catch(error => displayError(error))
        searchField.value = '';
        phoneDetails.innerHTML = '';
        errorMsg.innerText = '';
    }
    // const displayError = error => {
    //     document.getElementById('error-msg').style.display = 'block';
    // }
}
// searchPhone()

const displaySearchResult = (datas) => {
    // console.log(datas)
    searchResult.innerHTML = ""; // empty previous all phond preview result
    if (datas.length === 0) {
        // alert('no result');
        errorMsg.innerText = 'No Results Found';
    }
    datas.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6', 'mb-5', 'rounded');

        div.innerHTML = `
        <div class="card h-100" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <p class="card-text">${data.phone_name}</p>
                    <button onclick="loadPhoneDetail('${data.slug}')" href="#" class="btn btn-success">Phone Details</button>
                </div>
        </div>
        `
        searchResult.appendChild(div);

    })
}
// single phone details
const loadPhoneDetail = (phoneId) => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = (data) => {
    console.log(data);
    phoneDetails.innerHTML = ""; // empty previous single phone details preview
    const div = document.createElement('div');
    div.classList.add('col', 'card');
    div.innerHTML = `
        <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">Release Date: ${data.releaseDate ? data.releaseDate : 'Not Found'}</p>
                <h6 class="card-text">Main Features:</h6>
                <p class="card-text">Chipset: ${data.mainFeatures.chipSet}</p>
                <p class="card-text">Memory: ${data.mainFeatures.memory}</p>
                <p class="card-text">Display Size: ${data.mainFeatures.displaySize}</p>
                <h6 class="card-text">Sensors:</h6>
                <p class="card-text"></p>
                <p class="card-text">${data.mainFeatures.sensors[0] ? data.mainFeatures.sensors[0] : 'Not Available'}</p>
                <p class="card-text">${data.mainFeatures.sensors[1] ? data.mainFeatures.sensors[1] : 'Not Available'}</p>
                <p class="card-text">${data.mainFeatures.sensors[2] ? data.mainFeatures.sensors[2] : 'Not Available'}</p>
                <p class="card-text">${data.mainFeatures.sensors[3] ? data.mainFeatures.sensors[3] : 'Not Available'}</p>
                <p class="card-text">${data.mainFeatures.sensors[4] ? data.mainFeatures.sensors[4] : 'Not Available'}</p>
                <p class="card-text">${data.mainFeatures.sensors[5] ? data.mainFeatures.sensors[5] : 'Not Available'}</p>
                <p class="card-text">Storage: ${data.mainFeatures.storage}</p>
                <h6 class="card-text">Others Features:</h6>
                <p class="card-text">Bluetooh: ${data.others.Bluetooth ? data.others.Bluetooth : 'Data not found'}</p>
                <p class="card-text">USB: ${data.others.USB}</p>
                <p class="card-text">GPS: ${data.others.GPS}</p>
                <p class="card-text">NFC: ${data.others.NFC}</p>
                <p class="card-text">Radio: ${data.others.Radio}</p>
                <p class="card-text">WLAN: ${data.others.WLAN}</p>
                <p class="card-text">ID: ${data.slug}</p>
            </div>    
    `;
    phoneDetails.appendChild(div);
}