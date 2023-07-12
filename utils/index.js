export const isDeepEqual = (obj1, obj2) => {
    if (obj1 === obj2) {
      return true;
    }
  
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
      return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (let key of keys1) {
      if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
  
    return true;
  }

export const getCurrencyColor = (currency) => {
  const colorMap = {
    USD: '#FF0000', // Red
    GBP: '#00FF00', // Green
    EUR: '#0000FF', // Blue
  };

  if (colorMap.hasOwnProperty(currency)) {
    return colorMap[currency];
  }

  // If no specific color is defined for the currency, generate a random color
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
  
export const getCurrencySymbol = (currencyCode) => {
  switch (currencyCode) {
    case 'USD':
      return '$';
    case 'GBP':
      return '£';
    case 'EUR':
      return '€';
    default:
      return '';
  }
};
