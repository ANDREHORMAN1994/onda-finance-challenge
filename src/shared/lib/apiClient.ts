import axios from 'axios';

import { mockApiAdapter } from '@/shared/mocks/mockApi';

export const apiClient = axios.create({
  adapter: mockApiAdapter,
});
