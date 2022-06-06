import dayjs from 'dayjs';

const clearNumber = (value='') => {
  return value.replace(/\D+/g, '');
};

const numberValidation = (number, expectedLength, isValidNumber) => {
  const output = {
    isValid: false,
    error: 'Número do cartão inválido!',
  };
  if (!number) return output;

  const outputWithError = (error) => ({ ...output, error });

  const cleanNumber = clearNumber(number);
  const isValidLength = Boolean(cleanNumber.length === expectedLength);
  if (!isValidLength) {
    return outputWithError(
      `O número do cartão deve ter exatamente ${expectedLength} números!`
    );
  }

  if (!isValidNumber) {
    return outputWithError('O número não corresponde a nenhum cartão!');
  }

  return { isValid: true, error: null };
};

const nameValidation = (name) => {
  const MIN_LENGTH = 5;
  const output = {
    isValid: false,
    error: 'Nome do titular do cartão inválido!',
  };
  if (!name) return output;

  const outputWithError = (error) => ({ ...output, error });

  const isValidLength = Boolean(name.length >= MIN_LENGTH);
  if (!isValidLength) {
    return outputWithError(
      `O nome do titular do cartão deve ter pelo menos ${MIN_LENGTH} caracteres!`
    );
  }

  return { isValid: true, error: null };
};

const expiryValidation = (expiry) => {
  const output = {
    isValid: false,
    error: 'Validade do cartão inválida!',
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

const cvcValidation = (cvc, expectedLength) => {
  const output = {
    isValid: false,
    error: 'Código de segurança inválido!',
  };
  if (!cvc) return output;

  const outputWithError = (error) => ({ ...output, error });

  const cleanNumber = clearNumber(cvc);
  const isValidLength = Boolean(cleanNumber.length === expectedLength);
  if (!isValidLength) {
    return outputWithError(
      `O código de segurança deve ter exatamente ${expectedLength} dígitos!`
    );
  }

  return { isValid: true, error: null };
};

export {
  numberValidation,
  nameValidation,
  expiryValidation,
  cvcValidation,
};
