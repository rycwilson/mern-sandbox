class CustomApiError extends Error {
  statusCode: number | undefined = undefined;

  constructor(message: string) {
    super(message);
  }
}

export default CustomApiError;