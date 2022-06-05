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

  handleSubmit = async(event) => {
    event.preventDefault();

    const {
      totalPrice,
      makePayment,
      confirmPayment,
    } = this.props;
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

    const paymentBody = {
      name,
      number,
      expiry,
      cvc,
      totalPrice: totalPrice,
    };

    try {
      const paymentInfo = await makePayment(paymentBody);

      toast('Pagamento realizado com sucesso');
      return confirmPayment(paymentInfo.isPayed);
    } catch (err) {
      this.handleFailSubmit(err.status);
    }
  };

  handleFailSubmit = (status) => {
    const msgStatus = {
      401: 'Não autorizado, tente fazer login novamente!',
      404: 'Informações de ingresso não encontradas!',
      409: 'Ingresso já pago!',
      422: 'Campo(s) inválido(s)!',
      500: 'Erro com nosso servidor, tente novamente mais tarde, por favor 🥺'
    };

    const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺';

    toast.error(msgToSend);
  }

  render() {
    const disableButton = this.props.makePaymentLoading;
    const { name, number, expiry, cvc, inFocus, issuer } = this.state;
    const {
      mask: numberMask,
      example: numberExample
    } = numberPattern(issuer);
    const cvcMask = cvcPattern(issuer).mask;

    return (
      <Form onSubmit={this.handleSubmit} >
        <CardWrapper>
          <div>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={inFocus}
              callback={this.handleCallback}
            />
          </div>

          <InputsWrapper>
            <InputCard
              mask={numberMask}
              type='tel'
              name='number'
              placeholder='Número do Cartão'
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              isFirst
            />
            <span>
              {`Ex.: ${numberExample}`}
            </span>

            <InputCard
              type='text'
              name='name'
              placeholder='Nome'
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />

            <ExpiryAndCvcWrapper>
              <InputCard
                mask='99/99'
                type='tel'
                name='expiry'
                placeholder='Validade (MM/AA)'
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />

              <InputCard
                width='40%'
                mask={cvcMask}
                type='tel'
                name='cvc'
                placeholder='CVC'
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </ExpiryAndCvcWrapper>
          </InputsWrapper>
        </CardWrapper>

        <Button type='submit' disabled={disableButton} >
          FINALIZAR PAGAMENTO
        </Button>
      </Form>
    );
  }
}

const Form = styled.form`
  padding-bottom: 30px;
`;

const CardWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  display: flex;
  justify-content: start;
  align-items: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: start;
  }
`;

const InputsWrapper = styled.div`
  width: 300px;
  padding-left: 20px;

  display: flex;
  flex-direction: column;

  > span {
    font-family: 'Roboto';
    font-size: 14px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    color: #8e8e8e;
  }

  @media (max-width: 600px) {
    width: 290px;
    margin-top: 15px;
    padding: 0px;
  }
`;

const ExpiryAndCvcWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
