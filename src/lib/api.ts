import axios from 'axios';

import { ApiUserResponse, UserPayload, UserRepo } from '@/models/api';

export function searchUser(payload: UserPayload) {
  return axios<ApiUserResponse>({
    url: `${process.env.BASE_URL}/search/users?q=${payload.username}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function getUserRepos(payload: UserPayload) {
  return axios<UserRepo[]>({
    url: `${process.env.BASE_URL}/users/${payload.username}/repos`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
