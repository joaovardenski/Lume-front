import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Erro na requisição"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Erro inesperado";
}
