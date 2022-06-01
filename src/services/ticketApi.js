import api from './api';

export async function createTicket({ userId, modalityId }) {
  //console.log(userId, modalityId);
  const response = await api.post('/tickets', { modalityId, userId });
  return response.data;
}
//
