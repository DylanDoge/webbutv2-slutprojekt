
let products = document.getElementById('products-MainProducts');

function addProduct(productObject) {
    const productCard = document.createElement('section');
    const linkTag = document.createElement('a');
    const productImage = document.createElement('img');
    const productTitle = document.createElement('h3');
    const productPrice = document.createElement('p');
    const productDescription = document.createElement('section');;

    productCard.classList.add('products-card');
    linkTag.classList.add('removeDeco');
    productDescription.classList.add('products-cardDescription')
    productTitle.classList.add('products-animatedUnderLine')
    linkTag.href = productObject["productURL"];
    productImage.src = productObject["mainImage"];
    productImage.alt = `Image of ${productObject["productsTitle"]}`;
    productTitle.innerHTML = productObject["productsTitle"];
    productPrice.innerHTML = productObject["priceText"];

    productDescription.appendChild(productTitle);
    productDescription.appendChild(productPrice);
    linkTag.appendChild(productImage);
    linkTag.appendChild(productDescription);
    productCard.appendChild(linkTag);
    products.appendChild(productCard);
}

async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController;
    const timeoutID = setTimeout(() => controller.abort(), timeout);
    try {
        const response = fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}});
        if (!(await response).ok) {
            throw new Error("API GET Failed: Network Issue");
        }
        return (await response).json();
        
    } finally {
        clearTimeout(timeoutID);
    }
}

async function displayAllProducts() {
    try {
        const productsObject = await fetchWithTimeout('http://127.0.0.1:8000/products?type=keyboards', 1500)
        let productKeyArray = Object.keys(productsObject);

        for (let i = 0; i < productKeyArray.length; i++) {
            addProduct(productsObject[productKeyArray[i]]);
        }
    } catch (error) {
        let text = document.createElement('p');
        text.style.cssText = 'color: var(--primary-color); font-family: var(--title-font); font-size: 21px;';
        text.innerHTML = `Products are unavailable.<br>Server is currently not responding, try again later.<br> (${error}) <span class="animatedUnderLine" style="color: var(--title-accent-color);">Press to Retry</span>`;
        text.addEventListener('click', () => {
            text.remove();
            return displayAllProducts();
        })
        products.appendChild(text);
    }
}

displayAllProducts()