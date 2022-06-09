const toBrazilianCurrency = (value, isCents=true) => {
  if (isCents) value = Number(value / 100);
  
  const currencyOptions = {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0, 
    minimumFractionDigits: 0,
  };
  return value.toLocaleString('pt-br', currencyOptions);
};

export {
  toBrazilianCurrency,
};
