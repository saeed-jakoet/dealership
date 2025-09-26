export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`API ${response.status}: ${text || response.statusText}`);
  }
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function apiGet(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Accept': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  return handleResponse(response);
}


