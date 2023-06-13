const compareStringLength = (string, length) => {
  if(string.length <= length) {
    return true;
  }

  return false;
};

const compareStringPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for(let i = normalizedString.length - 1;i >= 0;i--) {
    reversedString += normalizedString[i];
  }

  return reversedString === normalizedString;
};

const getNumbers = (string) => {
  string = string.toString();
  let result = '';
  let number;
  for (let i = 0; i < string.length; i++) {
    number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      result += number;
    }
  }

  return Number(result) || NaN;
};
