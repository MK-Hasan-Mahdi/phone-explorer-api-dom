const searchResult = document.getElementById('search-result');
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // console.log(searchFieldText)
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.data))
}
searchPhone()

const displaySearchResult = (datas) => {
    // console.log(datas)
    datas.forEach(data => {
        // console.log(data)
        const div = document.createElement('div');
        console.log(div)
        div.classList.add('row-cols-md-3');

    })
}