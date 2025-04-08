export const successResponse = (message: string, data?: any, status = 200) => ({
  success: true,
  status,
  message,
  data,
});

export const errorResponse = (
  message: string,
  error: string,
  status = 400,
) => ({
  success: false,
  status,
  message,
  error,
});
