let keyboardObjectInfo
let jeffySFX = new Audio('/misc/audio/jeffy-uh.ogg')

function getKeyLayouts() {
    return fetch('/misc/keyboardVariables.json')
            .then(response => response.json());
}

async function createKeyboard() {
    keyboardObjectInfo = await getKeyLayouts();
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
}

function keyPressUpdate(keyObject, released) {
    keyPressed = keyObject["keyCode"];
    // jeffySFX.play()

    for (let i = 0; i < allKeysString.length; i++) {
        if (keyPressed == keyboardObjectInfo["keyCode"][allKeysString[i].textContent.toLowerCase()]) {
            if (released) {
                allKeysString[i].classList.remove('pressed')
                allKeysString[i].classList.add('active')
            } else {
                allKeysString[i].classList.remove('active')
                allKeysString[i].classList.add('pressed')
            }
        }
    }
    
}

function aboutInfoHover(aboutUsState) {
    if (aboutUsState) {
        content.style.setProperty('animation', 'unBlur 0.4s forwards')
        aboutUsDescription.style.setProperty('animation', 'aboutUsReset 0.4s forwards')
        setTimeout(() => {
            aboutUsDescription.style.setProperty('display', "none")
        }, 200)
    } else {
        aboutUsDescription.style.setProperty('display', "flex")
        content.style.setProperty('animation', 'blur 0.4s forwards')
        aboutUsDescription.style.setProperty('animation','aboutUsHovering 0.4s forwards')
    }
}

createKeyboard();

let allKeysString = document.getElementsByClassName('key')

const x = document.querySelector('body');
x.addEventListener('keydown', key => keyPressUpdate(key, false));
x.addEventListener('keyup', key => keyPressUpdate(key, true));

let aboutUs = document.getElementById('aboutUs')
let content = document.querySelector('main')
let aboutUsDescription = document.getElementById('aboutUsDescription')
aboutUs.addEventListener('mouseenter', event => aboutInfoHover(false))
aboutUs.addEventListener('mouseleave', event => aboutInfoHover(true))