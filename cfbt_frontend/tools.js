

let products = null;
        // get datas from file json 
        fetch('http://localhost:3000/api/tools')
            .then(response => response.json())
            .then(data => {
                products = data;
                addDataToHTML();
        })

        function addDataToHTML(){
     // remove datas default from HTML
        let listProductHTML = document.querySelector('.listProduct');

        // add new datas
        if(products != null) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('a');
                newProduct.href = 'detail.html?id=' + product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="images/${product.image}" alt="">
                <p id="name">${product.name}</p>`;
                listProductHTML.appendChild(newProduct);

            });
        }
     }


     