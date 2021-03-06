import api from './api';
import { makeConfig } from './helpers/tokenHelper';

const PAYMENT_URL = '/payments';

export async function makePayment(body, token) {
  const response = await api.post(PAYMENT_URL, body, makeConfig(token));

  return response.data;
}

export async function findPayment(token) {
  const response = await api.get(PAYMENT_URL, makeConfig(token));

  return response.data;
}
