
let products = document.getElementById('products-MainProducts');
let productView = document.getElementById("product-View");
const API_HOST_ADDRESS = 'http://192.168.50.87:8000'

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
    productImage.alt = `Image of ${productObject["productTitle"]}`;
    productTitle.innerHTML = productObject["productTitle"];
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
    const signal = controller.signal
    const timeoutID = setTimeout(() => {controller.abort()}, timeout);
    try {
        const response = fetch(url, {method: "GET", headers: {"Content-Type": "application/json"}, signal});
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
        const productsObject = await fetchWithTimeout(`${API_HOST_ADDRESS}/products?type=keyboards`, 1500)
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

function hideShowElements(elements, visible) {
    if (visible) {
        for (i = 0; i < elements.length; i++) {
            elements[i].style.cssText = '';
        }
    } else {
        for (i = 0; i < elements.length; i++) {
        elements[i].style.cssText = 'display: none';
        }
    }
}

async function loadProductContent(productName) {
    let productSections = document.getElementById('product-View').querySelectorAll('section')
    hideShowElements(productSections, false)
    try {
        const productsObject = await fetchWithTimeout(`${API_HOST_ADDRESS}/keyboard?keyboard=${productName}`, 1500)
        const switches = await fetchWithTimeout(`${API_HOST_ADDRESS}/products?type=switches`, 1500)
        let productKeyArray = Object.keys(switches);
        
        hideShowElements(productSections, true)
        document.getElementById('product-Header').textContent = productsObject["productTitle"];
        document.getElementById('product-ShortDescription').textContent = productsObject["shortDescription"];
        document.getElementById('product-Price').textContent = productsObject["price"]
        let image = document.getElementById('product-Images').querySelector('img')
        image.src = productsObject["mainImage"]
        image.alt = productsObject["productTitle"]
        
        for (let i = 0; i < productKeyArray.length; i++) {
            let optionInSelector = document.createElement('option');
            optionInSelector.value = productKeyArray[i];
            optionInSelector.textContent = productKeyArray[i];
            document.getElementById('keySwitchSelector').appendChild(optionInSelector);
        }
        
    } catch (error) {
        let text = document.createElement('p');
        text.style.cssText = 'color: var(--primary-color); font-family: var(--title-font); font-size: 21px;';
        text.innerHTML = `Products are unavailable.<br>Server is currently not responding, try again later.<br> (${error}) <span class="animatedUnderLine" style="color: var(--title-accent-color);">Press to Retry</span>`;
        text.addEventListener('click', () => {
            text.remove();
            return loadProductContent(productName);
        })
        hideShowElements(productSections, false)
        productView.prepend(text);
    }
}

if (products != null) {
    displayAllProducts()
}

if (productView != null) {
    currentLink = window.location.href.split('/')
    currentProduct = currentLink[currentLink.length-1].split('.')[0]
    loadProductContent(currentProduct)
    console.log(currentProduct);
}

let main = document.getElementById('wrapper')
console.log(main.getBoundingClientRect())