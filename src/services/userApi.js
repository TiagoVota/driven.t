import api from './api';
import { makeConfig } from './helpers/tokenHelper';

const USER_URL = '/users';

export async function signUp(email, password) {
  const response = await api.post(USER_URL, { email, password });

  return response.data;
}

export async function getUserRoom(token) {
  const response = await api.get(`${USER_URL}/room`, makeConfig(token));

  return response.data;
}

export async function registerActivity(activityId, token) {
  const url = `${USER_URL}/activities/${activityId}/register`;
  const response = await api.post(url, {}, makeConfig(token));

  return response.data;
}

