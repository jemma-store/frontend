export const catchErrorCodes = (error: unknown): string => {
  if (typeof error !== 'object' || error === null) return 'Невідома помилка';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const axiosError = error as any;

  const status = axiosError.response?.status;
  const url = axiosError.config?.url;
  const method = axiosError.config?.method?.toUpperCase();
  const message = axiosError.response?.data?.message || axiosError.message;

  const base = `[${method || 'UNKNOWN'}] ${url || 'невідомий запит'} → `;

  switch (status) {
    case 400:
      return `${base}Невірні дані. ${message}`;
    case 401:
      return `${base}Сесія закінчилась. Увійдіть знову.`;
    case 403:
      return `${base}Недостатньо прав доступу.`;
    case 404:
      return `${base}Ресурс не знайдено.`;
    case 422:
      return `${base}Некоректні поля. ${message}`;
    case 500:
      return `${base}Серверна помилка. ${message}`;
    case 502:
      return `${base}Bad Gateway.`;
    case 503:
      return `${base}Сервер тимчасово недоступний.`;
    default:
      return status
        ? `${base}Сталася помилка (${status}). ${message}`
        : `${base}Невідома помилка. ${message}`;
  }
};
