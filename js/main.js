
function getKeyLayouts() {
    return fetch('/misc/keyboardVariables.json')
        .then(response => response.json())
}

async function createKeyboard() {
    const keyboardObjectInfo = await getKeyLayouts()
    const keyboard = keyboardObjectInfo['75%']['layoutISO']
    let keyArray = Object.keys(keyboard)

    for (let i = 0; i < keyArray.length; i += 2) {
        let keyUnit = keyboard[keyArray[i]]
        let currentKeyArray = keyboard[keyArray[i+1]]
        const keyRow = document.getElementById(`key${keyArray[i]}`)
        
        for (let j = 0; j < currentKeyArray.length; j++) {
            let key = document.createElement('letter')
            key.textContent = currentKeyArray[j]
            key.classList.add('key')
            key.style.cssText = `--key-unit-size: ${keyUnit[j]};`
            keyRow.appendChild(key)
        }
    }

}

function keyPressUpdate(key) {
    keyPressed = key["key"]
    console.log(key)
}

createKeyboard()

// new KeyboardEvent()
x = document.querySelector('body')
x.addEventListener('keydown', key => keyPressUpdate(key));
