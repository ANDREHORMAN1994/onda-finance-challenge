import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Informe seu e-mail.')
    .email('Digite um e-mail válido.'),
  password: z
    .string()
    .trim()
    .min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
