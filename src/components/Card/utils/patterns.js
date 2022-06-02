import Payment from 'payment';

const findIssuer = (cardNumber) => {
  return Payment.fns.cardType(cardNumber);
};

const numberPattern = (cardIssuer) => {
  const patternHashTable = {
    'amex': {
      mask: '9999 999999 99999',
      length: 15,
      example: '34... 51... 78...',
    },
    'dinersclub': {
      mask: '9999 999999 9999',
      length: 14,
      example: '36... 51... 78...',
    },
  };
  const standardPattern = {
    mask: '9999 9999 9999 9999',
    length: 16,
    example: '49... 51... 36... 37...',
  };

  console.log({ return: patternHashTable[cardIssuer] || standardPattern });
  return patternHashTable[cardIssuer] || standardPattern;
};

const cvcPattern = (cardIssuer) => {
  const patternHashTable = {
    'amex': {
      issuer: 'amex',
      mask: '9999',
      length: 4
    },
    'dinersclub': {
      issuer: 'discover',
      mask: '9999',
      length: 4
    },
  };
  const standardPattern = {
    mask: '999',
    length: 3
  };

  return patternHashTable[cardIssuer] || standardPattern;
};

export {
  findIssuer,
  numberPattern,
  cvcPattern,
};
