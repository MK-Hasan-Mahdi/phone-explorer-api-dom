
const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('phone-details');
const errorMsg = document.getElementById('error-msg');
// load all phone from api
const searchPhone = () => {

    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // empty searchfield check
    if (searchFieldText == "") {
        errorMsg.innerText = 'Please provide a phone name';
        searchResult.innerHTML = "";
        phoneDetails.innerHTML = "";

    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displaySearchResult(data.data.slice(0, 20)))

        searchField.value = "";
        phoneDetails.innerHTML = "";
        errorMsg.innerText = "";
    }

}
// display all searched phone
const displaySearchResult = (datas) => {
    // console.log(datas)
    searchResult.innerHTML = ""; // empty previous all phone preview result
    if (datas.length === 0) {
        // alert('no result');
        errorMsg.innerText = 'Search Results Not Found';
    }
    datas.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        // div.classList.add('col-lg-4', 'col-md-6', 'mb-5', 'rounded');
        div.innerHTML = `
        <div class="col">
        <div class="card">
                <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <p class="card-text">${data.phone_name}</p>
                    <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-success">Phone Details</button>
                </div>
        </div>
        </div>
        `
        searchResult.appendChild(div);

    })
}
// load single phone details 
const loadPhoneDetail = (phoneId) => {
    console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data))
}
// display single phone details
const displayPhoneDetail = (data) => {
    console.log(data);
    phoneDetails.innerHTML = ""; // empty previous single phone details preview
    const div = document.createElement('div');
    div.classList.add('detail-info');
    div.innerHTML = `
    <div class="card flex-lg-row mb-3">
        <img src="${data.image}" style="width:30rem;" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
                <h5 class="card-title"><b>Brand:</b> ${data.brand}</h5>
                <p class="card-text"><b>Model:</b> ${data.name}</p>
                
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><p><b>Release:</b> ${data.releaseDate ? data.releaseDate : 'Not Available'}</p></li>
                <h6 class="card-text">Main Features:</h6>
                <li class="list-group-item"><p><b>Cheapset:</b> ${data.mainFeatures.chipSet ? data.mainFeatures.chipSet : 'Not Available'}</p></li>
                <li class="list-group-item"><p><b>Memory:</b> ${data.mainFeatures.memory ? data.mainFeatures.memory : 'Not Available'}</p></li>
                <li class="list-group-item"><p><b>Display Size:</b> ${data.mainFeatures.displaySize}</p></li>
                <h6 class="card-text"><b>Sensors:</b></h6>
                
                <li class="list-group-item"><p>${data.mainFeatures.sensors[0] ? data.mainFeatures.sensors[0] : 'Not Available'}</p></li>
                <li class="list-group-item"><p>${data.mainFeatures.sensors[1] ? data.mainFeatures.sensors[1] : 'Not Available'}</p></li>
                <li class="list-group-item"><p>${data.mainFeatures.sensors[2] ? data.mainFeatures.sensors[2] : 'Not Available'}</p></li>
                <li class="list-group-item"><p>${data.mainFeatures.sensors[3] ? data.mainFeatures.sensors[3] : 'Not Available'}</p></li>
                <li class="list-group-item"><p>${data.mainFeatures.sensors[4] ? data.mainFeatures.sensors[4] : 'Not Available'}</p></li>
                <li class="list-group-item"><p>${data.mainFeatures.sensors[5] ? data.mainFeatures.sensors[5] : 'Not Available'}</p></li>
                <li class="list-group-item"><p><b>Storage:</b> ${data.mainFeatures.storage}</p></li>
                <h6 class="card-text">Others Features:</h6>
                <li class="list-group-item"><p><b>Bluetooh:</b> ${data.others.Bluetooth ? data.others.Bluetooth : 'Data not found'}</p></li>
                <li class="list-group-item"><p><b>USB:</b> ${data.others.USB}</p></li>
                <li class="list-group-item"><p><b>GPS:</b> ${data.others.GPS}</p></li>
                <li class="list-group-item"><p><b>NFC:</b> ${data.others.NFC}</p></li>
                <li class="list-group-item"><p><b>Radio:</b> ${data.others.Radio}</p></li>
                <li class="list-group-item"><p><b>WLAN:</b> ${data.others.WLAN}</p></li>
                </ul>
            </div>
    </div>           
    `;
    phoneDetails.appendChild(div);
}