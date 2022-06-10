import api, { HeaderConfig } from './api';

export async function getHotels({ token }) {
  const config = HeaderConfig(token);
  const response = await api.get('hotels', config);
  return response.data;
}
