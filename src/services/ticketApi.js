import api, { HeaderConfig } from './api';

export async function createTicket({ userId, modalityId }) {
  const response = await api.post('/tickets', { modalityId, userId });
  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets', HeaderConfig(token));
  return response.data;
}

export async function getTicketPrice(userId) {
  const response = await api.post('/tickets/price', { userId });
  return response.data;
}
//
