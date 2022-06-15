import api, { HeaderConfig } from './api';

export async function getEventDays(token) {
  const config = HeaderConfig(token);
  const response = await api.get('eventday', config);
  return response.data;
}
