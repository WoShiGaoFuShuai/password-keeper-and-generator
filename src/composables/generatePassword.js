import getRandomFunc from "./getRandomFunc";

const { getLowerCase, getUpperCase, getNumber, getSymbol } = getRandomFunc();

const randomFunc = {
  lowers: getLowerCase,
  uppers: getUpperCase,
  numbers: getNumber,
  symbols: getSymbol,
};

function generatePassword(uppers, lowers, numbers, symbols, length) {
  let generatedPassword = "";
  const typesCount = uppers + lowers + numbers + symbols;

  const typesArray = [{ uppers }, { lowers }, { numbers }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  if (!typesCount) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPass = generatedPassword.slice(0, length);

  return finalPass;
}

const refGeneratePassword = () => {
  return { generatePassword };
};

export default refGeneratePassword;
