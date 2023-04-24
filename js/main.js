
function getKeyVariables() {
    return fetch('/misc/keyboardVariables.json')
        .then(response => response.json())
}

async function createKeyboard() {
    const keyboardObjectInfo = await getKeyVariables()
    const keyboard = keyboardObjectInfo['75%']['layoutISO']
    // const keyTester = document.getElementById("keyTester")
    let keyArray = Object.keys(keyboard)

    for (let i = 0; i < keyArray.length; i += 2) {
        let keyUnit = keyboard[keyArray[i]]
        let currentKeyArray = keyboard[keyArray[i+1]]
        const keyRow = document.getElementById(`key${keyArray[i]}`)
        
        for (let j = 0; j < currentKeyArray.length; j++) {
            let key = document.createElement('letter')
            // console.log(currentKeyArray[j], j)
            key.textContent = currentKeyArray[j]
            key.classList.add('key')
            keyRow.appendChild(key)
        }
    }

}

createKeyboard()

