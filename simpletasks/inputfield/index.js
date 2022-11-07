
// Constants

const word = document.getElementById("wordInput")
const display = document.getElementById("displayWord")
const arpabet = document.getElementById("arpabet")
const arpaType = document.getElementById("arpatype")
const arpaCat = document.getElementById("arpacat")

// Functions

function toArpaType(value) {
    return convertToType(value)
}

function toArpaCat(value) {
    return convertToCat(value)
}

function convertToType(word){
    let letters = word.split(" ");
    letters.pop() // remove space
    let convertedWord = convertLetters(letters);
    return convertedWord.join(" ")
}

function convertToCat(word) {
    let letters = word.split(" ")
    letters.pop() // remove space
    let convertedType = convertType(letters)
    return convertedType.join(" ")
}

function convertLetters(letters) {
    return letters.map(function (letter) {
        if (letter === 'IY' || letter === 'IH' || letter === 'EY' || letter === 'EH' || letter === 'AE') {
            return letter.replace(letter, 'VoF');
        } else if (letter === 'AA' || letter === 'AO' || letter === 'OW' || letter === 'UH' || letter === 'UW') {
            return letter.replace(letter, 'VoB');
        } else if (letter === 'ER' || letter === 'AX' || letter === 'AH') {
            return letter.replace(letter, 'VoM');
        } else if (letter === 'AY' || letter === 'AW' || letter === 'OY' || letter === 'IX') {
            return letter.replace(letter, 'DiP');
        } else if (letter === 'B' || letter === 'D' || letter === 'G') {
            return letter.replace(letter, 'ScV');
        } else if (letter === 'P' || letter === 'T' || letter === 'K') {
            return letter.replace(letter, 'ScU');
        } else if (letter === 'V' || letter === 'DH' || letter === 'Z' || letter === 'ZH') {
            return letter.replace(letter, 'FrV');
        } else if (letter === 'F' || letter === 'TH' || letter === 'S' || letter === 'SH') {
            return letter.replace(letter, 'FrU');
        } else if (letter === 'L' || letter === 'EL' || letter === 'R') {
            return letter.replace(letter, 'SvL');
        } else if (letter === 'W' || letter === 'WH' || letter === 'Y') {
            return letter.replace(letter, 'SvG');
        } else if (letter === 'M' || letter === 'N' || letter === 'NX' || letter === 'NG') {
            return letter.replace(letter, 'NnV');
        } else if (letter === 'EM' || letter === 'EN') {
            return letter.replace(letter, 'NaV');
        } else if (letter === 'CH' || letter === 'JH') {
            return letter.replace(letter, 'AfF');
        } else if (letter === 'HH') {
            return letter.replace(letter, 'OwH');
        } else if (letter === 'DX') {
            return letter.replace(letter, 'OvO');
        } else if (letter === 'Q') {
            return letter.replace(letter, 'OgS');
        } else {
            // do nothing
            // return letter.replace(letter, 'ERROR');
        }
    })
}

function convertType(letters) {
    return letters.map(function (letter) {
        if (letter === 'IY' || letter === 'IH' || letter === 'EY' || letter === 'EH' || letter === 'AE') {
            return letter.replace(letter, 'Vo');
        } else if (letter === 'AA' || letter === 'AO' || letter === 'OW' || letter === 'UH' || letter === 'UW') {
            return letter.replace(letter, 'Vo');
        } else if (letter === 'ER' || letter === 'AX' || letter === 'AH') {
            return letter.replace(letter, 'Vo');
        } else if (letter === 'AY' || letter === 'AW' || letter === 'OY' || letter === 'IX') {
            return letter.replace(letter, 'Di');
        } else if (letter === 'B' || letter === 'D' || letter === 'G') {
            return letter.replace(letter, 'Sc');
        } else if (letter === 'P' || letter === 'T' || letter === 'K') {
            return letter.replace(letter, 'Sc');
        } else if (letter === 'V' || letter === 'DH' || letter === 'Z' || letter === 'ZH') {
            return letter.replace(letter, 'Fr');
        } else if (letter === 'F' || letter === 'TH' || letter === 'S' || letter === 'SH') {
            return letter.replace(letter, 'Fr');
        } else if (letter === 'L' || letter === 'EL' || letter === 'R') {
            return letter.replace(letter, 'Sv');
        } else if (letter === 'W' || letter === 'WH' || letter === 'Y') {
            return letter.replace(letter, 'Sv');
        } else if (letter === 'M' || letter === 'N' || letter === 'NX' || letter === 'NG') {
            return letter.replace(letter, 'Nn');
        } else if (letter === 'EM' || letter === 'EN') {
            return letter.replace(letter, 'Na');
        } else if (letter === 'CH' || letter === 'JH') {
            return letter.replace(letter, 'Af');
        } else if (letter === 'HH') {
            return letter.replace(letter, 'Ow');
        } else if (letter === 'DX') {
            return letter.replace(letter, 'Ov');
        } else if (letter === 'Q') {
            return letter.replace(letter, 'Og');
        } else {
            // do nothing
            // return letter.replace(letter, 'ERROR');
        }
    })
}

// Return api response against searched word
const searchWordApiRes = (searchedWord) => {
    return new Promise((resolve, reject) => {
        // Build the API URL
        const apiUrl = `https://api.datamuse.com/words?sp=${searchedWord}&&md=r`;

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => resolve(data)) // Resolving the data if successful
            .then((error) => reject(error)); // Rejecting with error if unsuccessful
    });
};

// Function trigger on search word form submit
const searchWordHandler = async () => {
    // Prevent form submit
    // e.preventDefault();

    // Get searched word
    const searchedWord = word.value.trim();
    // Terminate the function if searched word is empty
    if (searchedWord === "") {
        return;
    }
    try {
        // Get api response
        const searchWordRes = await searchWordApiRes(searchedWord);
        const pron = searchWordRes[0].tags.toString()
        const pronText = pron.replace('pron:','');
        const pronTextWithoutDigits = pronText.replace(/[0-9]*/g, "");
        display.textContent = `${searchedWord}`
        arpabet.textContent = await pronTextWithoutDigits
        arpaType.textContent = toArpaType(pronTextWithoutDigits)
        arpaCat.textContent = toArpaCat(pronTextWithoutDigits)
        word.value = ''
    } catch (error) {
        console.log(error);
    }
};

// Event Listeners

// Trigger 'searchWord' function on search word form submit
word.addEventListener('change', (e) => {

    return searchWordHandler(e.target.value)
});