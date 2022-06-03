import api from './api';
import { makeConfig } from './helpers/tokenHelper';

const PAYMENT_URL = '/payments';

export async function makePayment(body, token) {
  console.log({ body });
  const response = await api.post(PAYMENT_URL, body, makeConfig(token));

  return response.data;
}
