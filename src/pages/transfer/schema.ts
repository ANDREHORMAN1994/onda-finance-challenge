import { z } from 'zod';

export const transferSchema = z.object({
  amount: z.coerce
    .number()
    .refine((value) => Number.isFinite(value), 'Informe um valor válido.')
    .min(0.01, 'Informe um valor maior que zero.'),
  recipient: z
    .string()
    .trim()
    .min(3, 'Informe o nome do destinatário.'),
});

export type TransferFormInput = z.input<typeof transferSchema>;
export type TransferFormData = z.infer<typeof transferSchema>;
