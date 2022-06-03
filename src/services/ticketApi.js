import api from './api';

export async function createTicket({ userId, modalityId }) {
  const response = await api.post('/tickets', { modalityId, userId });
  return response.data;
}

export async function getTicketPrice(userId) {
  const response = await api.post('/tickets/price', { userId });
  return response.data;
}
//
