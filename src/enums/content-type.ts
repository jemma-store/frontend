const ContentType = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT_PLAIN: 'text/plain',
} as const;

export type ContentTypePath = (typeof ContentType)[keyof typeof ContentType];

export { ContentType };