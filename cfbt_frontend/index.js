
let products = null;
// get datas from file json
fetch('http://localhost:3000/api/tools')
    .then(response => response.json())
    .then(data => {
        products = data;
        showDetail();
    })

function showDetail() {
    // remove datas default from HTML
    let detail = document.querySelector('.detail');
    let descriptionDetail = document.querySelector('.description-detail');
    let listProduct = document.querySelector('.listProduct');
    let productId = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => value.id == productId)[0];
    //if there is no product with id = productId => return to home page
    if (!thisProduct) {
        window.location.href = "/";
    }

    detail.querySelector('.image img').src = "images/" + thisProduct.image;
    detail.querySelector('.name').innerText = thisProduct.name;
    detail.querySelector('.tag').innerText = thisProduct.tags;
    detail.querySelector('.link').href = thisProduct.link;
    descriptionDetail.querySelector('.distinct').innerText = thisProduct.distinct;

    (products.filter(value => value.id != productId)).forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = '/detail.html?id=' + product.id;
        newProduct.classList.add('item');
        newProduct.innerHTML =
            `<img src="images/${product.image}" alt="">`;
        listProduct.appendChild(newProduct);
    });
}
