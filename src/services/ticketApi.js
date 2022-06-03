import api, { HeaderConfig } from './api';

export async function createTicket({ userId, modalityId, token }) {
  const config = HeaderConfig(token);
  const response = await api.post('/tickets', { modalityId, userId }, config);
  return response.data;
}

export async function getTicketPrice({ userId, token }) {
  const config = HeaderConfig(token);
  const response = await api.post('/tickets/price', { userId }, config);
  return response.data;
}

export async function getTicketByUser(userId) {
  const response = await api.get(`/tickets/${userId}`);
  return response.status;
}
//
