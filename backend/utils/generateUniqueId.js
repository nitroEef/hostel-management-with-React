// function to generate a unique id with 5 numbers and 2 letters 

const generateUniqueId = () =>{
    const number = Math.floor(10000 + Math.random() * 90000)
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
     String.fromCharCode(65 + Math.floor(Math.random() * 26));

    return number.toString()+ letter;

}

module.exports = generateUniqueId;