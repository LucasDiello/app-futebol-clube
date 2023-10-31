type StatusMap = {
  [key: string]: number;
};

export default function mapStatusHTTP(status: string): number {
  const statusMap: StatusMap = {
    successful: 200,
    created: 201,
    badRequest: 400,
    notFound: 404,
    unprocessableEntity: 422,
    conflict: 409,
    unauthorized: 401,
  };

  return statusMap[status];
}
