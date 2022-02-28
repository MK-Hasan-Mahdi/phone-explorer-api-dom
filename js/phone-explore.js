const searchResult = document.getElementById('search-result');
const phoneDetails = document.getElementById('phone-details');
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // console.log(searchFieldText)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}
// searchPhone()

const displaySearchResult = (datas) => {
    console.log(datas)
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
    // console.log(phoneId)
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displayPhoneDetail(data.data))
}
const displayPhoneDetail = (data) => {
    console.log(data);
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${data.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.releaseDate}</p>
                <p class="card-text">${data.mainFeatures.chipSet}</p>
                <p class="card-text">${data.mainFeatures.memory}</p>
                <p class="card-text">${data.mainFeatures.displaySize}</p>
            </div>
    `;
    phoneDetails.appendChild(div);
}