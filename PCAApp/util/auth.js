import axios from './api';

async function authenticate(email, password, csrfToken) {
  const url = `http://127.0.0.1:8000/api/user/token/`;

  const headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
    'X-CSRFToken': csrfToken
  };

  const response = await axios.post(url, {
    email: email,
    password: password,
  }, { headers: headers });

  const token = response.data.token;
  return token;
}

export function login(email, password, csrfToken) {
  return authenticate(email, password, csrfToken);
}
