let keyboardObjectInfo;
const jeffySFX = new Audio('/misc/audio/jeffy-uh.ogg');
const KEYBOARD_INFO_FROM_API = 'http://127.0.0.1:8000/keyboardData';

async function fetchWithTimeout(url, timeout) {
    const controller = new AbortController;
    const timeoutID = setTimeout(() => {controller.abort()}, timeout);
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

async function createKeyboard() {
    try {
        keyboardObjectInfo = await fetchWithTimeout(KEYBOARD_INFO_FROM_API, 3000);
        const keyboard = keyboardObjectInfo['75%']['layoutISO'];
        let keyArray = Object.keys(keyboard);

        for (let i = 0; i < keyArray.length; i += 2) {
            let keyUnit = keyboard[keyArray[i]];
            let currentKeyArray = keyboard[keyArray[i+1]];
            const keyRow = document.getElementById(`key${keyArray[i]}`);
            
            for (let j = 0; j < currentKeyArray.length; j++) {
                let key = document.createElement('letter');
                key.textContent = currentKeyArray[j];
                key.classList.add('key');
                key.style.cssText = `--key-unit-size: ${keyUnit[j]};`;
                keyRow.appendChild(key);
            }
        }
    } catch (error) {
        let keyContainer = document.getElementById('keyboardContainer');
        let text = document.createElement('p');
        text.style.cssText = 'color: var(--secondary-color); font-family: var(--title-font); font-size: 21px;';
        text.innerHTML = `KeyTester is unavailable.<br>Server is currently not responding, try again later.<br> (${error}) <span class="animatedUnderLine" style="color: var(--title-accent-color);">Press to Retry</span>`;
        text.addEventListener('click', () => {
            text.remove();
            return createKeyboard();
        })
        keyContainer.appendChild(text);
    }
    
}

function keyPressUpdate(keyObject, released) {
    keyPressed = keyObject["keyCode"];
    // jeffySFX.play()

    for (let i = 0; i < allKeysString.length; i++) {
        if (keyPressed == keyboardObjectInfo["keyCode"][allKeysString[i].textContent.toLowerCase()]) {
            if (released) {
                allKeysString[i].classList.remove('pressed');
                allKeysString[i].classList.add('active');
            } else {
                allKeysString[i].classList.remove('active');
                allKeysString[i].classList.add('pressed');
            }
        }
    }
    
}

function aboutInfoHover(aboutUsState) {
    if (aboutUsState) {
        content.style.setProperty('animation', 'unBlur 0.4s forwards');
        aboutUsDescription.style.setProperty('animation', 'aboutUsReset 0.4s');
        setTimeout(() => {
            aboutUsDescription.style.setProperty('display', 'none');
        }, 200)
    } else {
        aboutUsDescription.style.setProperty('display', 'flex');
        content.style.setProperty('animation', 'blur 0.4s forwards');
        aboutUsDescription.style.setProperty('animation','aboutUsHovering 0.4s forwards');
    }
}

// Visual keyboard tester
let aboutUs = document.getElementById('aboutUs');
let content = document.querySelector('main');
let aboutUsDescription = document.getElementById('aboutUsDescription');
aboutUs.addEventListener('mouseenter', () => aboutInfoHover(false));
aboutUs.addEventListener('mouseleave', () => aboutInfoHover(true));

createKeyboard();
let allKeysString = document.getElementsByClassName('key');

// Detect keypress
const x = document.querySelector('body');
x.addEventListener('keydown', key => keyPressUpdate(key, false));
x.addEventListener('keyup', key => keyPressUpdate(key, true));

// Footer animation
let footer = document.getElementById('headerFooter');

function vhToPixels (vh) {
    return Math.round(window.innerHeight / (100 / vh));
}

addEventListener('scroll', () => {
    let higlightHeight = vhToPixels(91);
    let pixelDiffAfterContent = content.clientHeight-(window.scrollY+higlightHeight);
    if (pixelDiffAfterContent < 0) {
        footer.style.setProperty('transform', `translate3d(0px, ${pixelDiffAfterContent}px, 0px)`);
    } else {
        footer.style.setProperty('transform', `translate3d(0px, 0px, 0px)`);
    }
})