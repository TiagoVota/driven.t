import dayjs from 'dayjs';

const clearNumber = (value='') => {
  return value.replace(/\D+/g, '');
};

const expiryValidation = (expiry) => {
  const output = {
    isValid: false,
    error: 'Dados do cartão inválidos!',
  };
  if (!expiry) return output;

  const expiryDate = dayjs(expiry, 'MM/YY');

  const outputWithError = (error) => ({ ...output, error });

  const isValidDate = expiryDate.isValid();
  if (!isValidDate) {
    return outputWithError('A validade deve estar no formato MM/AA');
  };

  const month = expiry.slice(0, 2);
  const isValidMonth = Boolean(month <= 12);
  if (!isValidMonth) {
    return outputWithError('O mês da validade deve ser um valor entre 01 e 12!');
  };

  const isExpired = expiryDate.isBefore(dayjs(), 'month');
  if (isExpired) {
    return outputWithError('O cartão já expirou!');
  };

  return { isValid: true, error: null };
};

export {
  clearNumber,
  expiryValidation,
};
