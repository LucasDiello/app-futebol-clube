export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'invalidData' | 'unauthorized' | 'notFound' |
'conflict' | 'badRequest' | 'unprocessableEntity';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'successful' | 'created',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
