function getLowerCase() {
   return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
 }

 function getUpperCase() {
   return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
 }

 function getNumber() {
   return Math.floor(Math.random() * 10);
 }

 function getSymbol() {
   const symbols = "!@#$%^&*(){}[]=<>/,.";
   return symbols[Math.floor(Math.random() * symbols.length)];
 }

const getRandomFunc = () => {
   return {getLowerCase, getUpperCase, getNumber, getSymbol}
}

export default getRandomFunc;