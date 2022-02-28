const searchResult = document.getElementById('search-result');
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // console.log(searchFieldText)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}
// searchPhone()

const displaySearchResult = (datas) => {
    // console.log(datas)
    datas.forEach(data => {
        console.log(data)
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'col-md-6', 'mb-5', 'rounded');

        div.innerHTML = `
        <div onclick="loadPhoneDetail()" class="card h-100" style="width: 18rem;">
                <img src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${data.brand}</h5>
                    <p class="card-text">${data.phone_name}</p>
                    <button href="#" class="btn btn-primary">Phone Details</button>
                </div>
        </div>
        `
        searchResult.appendChild(div);

    })
}

const loadPhoneDetail = () => {

}