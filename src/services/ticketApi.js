import api, { HeaderConfig } from './api';

export async function createTicket({ modalityId, token }) {
  const config = HeaderConfig(token);
  const response = await api.post('/tickets', { modalityId }, config);
  return response.data;
}

export async function getTicketPrice({ userId, token }) {
  const config = HeaderConfig(token);
  const response = await api.post('/tickets/price', { userId }, config);
  return response.data;
}

export async function getTicketByUser(token) {
  const config = HeaderConfig(token);
  const response = await api.get('/tickets', config);
  return response.status;
}
//
