export const deleteToken = () => {
  // delete token
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getAccessToken = () => {
  return localStorage.getItem('token') || '';
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') || '';
};

export const saveToken = (token) => {
  localStorage.setItem('token', token.token);
  localStorage.setItem('refreshToken', token.refreshToken);
};
