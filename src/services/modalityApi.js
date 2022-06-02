import api, { HeaderConfig } from './api';

export async function getModalities(token) {
  const config = HeaderConfig(token);
  const response = await api.get('modalities', config);
  return response.data;
}
