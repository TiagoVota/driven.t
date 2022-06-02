import api, { headerConfig } from './api';

export async function createTicket({ userId, modalityId }) {
  const response = await api.post('/tickets', { modalityId, userId });
  return response.data;
}

export async function getTicket(token) {
  const response = await api.get('/tickets/user', headerConfig(token));
  return response.data;
}
//
