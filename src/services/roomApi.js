import api, { HeaderConfig } from './api';

export async function getRooms(hotelId, token) {
  const config = HeaderConfig(token);
  const response = await api.get(`/rooms/${hotelId}`, config);
  return response.data;
}
