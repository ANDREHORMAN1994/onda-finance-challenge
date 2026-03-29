import axios from 'axios';

import { apiEndpoints } from '@/shared/constants/apiEndpoints';
import { apiClient } from '@/shared/lib/apiClient';

type AuthenticateInput = {
  email: string;
  password: string;
};

type AuthenticateResponse = {
  email: string;
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (typeof message === 'string') {
      return message;
    }
  }

  return 'Não foi possível autenticar a conta agora.';
}

export async function authenticateUser(credentials: AuthenticateInput) {
  try {
    const { data } = await apiClient.post<AuthenticateResponse>(
      apiEndpoints.auth.login,
      credentials,
    );

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
