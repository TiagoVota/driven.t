import api from './api';

export async function getModalities() {
  const response = await api.get('/modalities');
  return response.data;
}
//
