

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
                newProduct.href = 'admindetail.html?id=' + product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="images/${product.image}" alt="">
                <p id="name">${product.name}</p>`;
                listProductHTML.appendChild(newProduct);

            });
            
            let lastProduct = listProductHTML.lastElementChild.cloneNode(true);
            let lastProductImage = lastProduct.querySelector('img');
            lastProductImage.src = "images/add.jpg"; 
            lastProduct.classList.add('addTool');
            lastProduct.querySelector('#name').innerText = 'Add new tool';
            lastProduct.addEventListener('click', function(event) {
                event.preventDefault(); 
                document.getElementById('popup_add').style.display = 'block';
            });
            listProductHTML.appendChild(lastProduct);
        }
     }

// ADD
document.getElementById('toolsForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const postData = {};

    const fileInput = document.getElementById('fileInput');
    const fileName = fileInput.files[0].name;

    formData.forEach((value, key) => {
        if (key === 'image') {
            postData[key] = fileName;
        } else {
            postData[key] = value;
        }
    });

    try {
        const response = await fetch('http://localhost:3000/api/tools', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
        });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        alert(responseData.message);
        this.reset(); // Call your close modal function here
        window.location.reload();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
    });
     