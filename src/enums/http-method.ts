const HttpMethod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const;

export type HttpMethodPath = (typeof HttpMethod)[keyof typeof HttpMethod];

export { HttpMethod };