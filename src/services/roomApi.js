import api, { HeaderConfig } from './api';

export async function getRooms(hotelId, token) {
  const config = HeaderConfig(token);
  const response = await api.get(`/rooms/${hotelId}`, config);
  return response.data;
}

export async function reservateRoom(roomId, token) {
  const config = HeaderConfig(token);
  const response = await api.post('/rooms', { roomId }, config);
  return response.data;
}

export async function checkIfUserHasARoom(token) {
  const config = HeaderConfig(token);
  const response = await api.get('/rooms', config);
  return response;
}
