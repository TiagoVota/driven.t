import React from 'react';
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';

import {
  cvcPattern,
  findIssuer,
  numberPattern,
} from './utils/patterns';
import {
  cvcValidation,
  expiryValidation,
  nameValidation,
  numberValidation,
} from './utils/validations';

import Button from '../Form/Button';
import InputCard from './InputCard';

import styled from 'styled-components';

import {
  formatFormData
} from './utils';

const standardState = {
  cvc: '',
  expiry: '',
  focus: '',
  name: '',
  number: '',
  issuer: '',
  isValid: false,
};

export default class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...standardState };
  }

  handleCallback = ({ issuer }, isValid) => {
    this.setState({ isValid });
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      inFocus: target.name
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      this.setState({ issuer: findIssuer(target.value) });
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, number, expiry, cvc, issuer, isValid } = this.state;
    const numberLength = numberPattern(issuer).length;
    const cvcLength = cvcPattern(issuer).length;

    const {
      isValid: isValidNumber,
      error: numberError
    } = numberValidation(number, numberLength, isValid);
    if (!isValidNumber) return toast.error(numberError);

    const {
      isValid: isValidName,
      error: nameError
    } = nameValidation(name);
    if (!isValidName) return toast.error(nameError);

    const {
      isValid: isValidExpiry,
      error: expiryError
    } = expiryValidation(expiry);
    if (!isValidExpiry) return toast.error(expiryError);

    const {
      isValid: isValidCvc,
      error: cvcError
    } = cvcValidation(cvc, cvcLength);
    if (!isValidCvc) return toast.error(cvcError);

    const formData = [...event.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.props.confirmPayment();
  };

  render() {
    const { name, number, expiry, cvc, inFocus, formData, issuer } = this.state;
    const {
      mask: numberMask,
      example: numberExample
    } = numberPattern(issuer);
    const cvcMask = cvcPattern(issuer).mask;

    return (
      <div key='Payment'>
        <Card
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={inFocus}
          callback={this.handleCallback}
          required
        />
        <form onSubmit={this.handleSubmit}>
          <InputCard
            mask={numberMask}
            type='tel'
            name='number'
            placeholder='Número do Cartão'
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <span>{`Ex.: ${numberExample}`}</span>
          <InputCard
            type='text'
            name='name'
            placeholder='Nome'
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <InputCard
            mask='99/99'
            type='tel'
            name='expiry'
            placeholder='Validade (MM/AA)'
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <InputCard
            mask={cvcMask}
            type='tel'
            name='cvc'
            placeholder='CVC'
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />

          <Button type='submit'>
            FINALIZAR PAGAMENTO
          </Button>
        </form>

        {formData && (
          <div className='App-highlight'>
            {formatFormData(formData).map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
