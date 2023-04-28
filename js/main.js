
function getKeyLayouts() {
    return fetch('/misc/keyboardVariables.json')
            .then(response => response.json());
}

async function createKeyboard() {
    const keyboardObjectInfo = await getKeyLayouts();
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
    keyPressed = keyObject["key"];

    for (let i = 0; i < allKeysString.length; i++) {
        if (keyPressed.toLowerCase() == allKeysString[i].textContent.toLocaleLowerCase()) {
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

createKeyboard();
let allKeysString = document.getElementsByClassName('key')

x = document.querySelector('body');
x.addEventListener('keydown', key => console.log(key["code"]));
x.addEventListener('keydown', key => keyPressUpdate(key, false));
x.addEventListener('keyup', key => keyPressUpdate(key, true));
