const toBrazilianCurrency = (value, isCents=true) => {
  if (isCents) value = Number(value / 100);

  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
};

export {
  toBrazilianCurrency,
};
