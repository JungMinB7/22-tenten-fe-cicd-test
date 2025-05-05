import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordConfirmSchema } from '@/schemas/passwordConfirmSchema';
import { z } from 'zod';

export type PasswordFormData = z.infer<typeof passwordConfirmSchema>;

export const usePasswordStep = () => {
  return useForm<PasswordFormData>({
    resolver: zodResolver(passwordConfirmSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirm: '',
    },
  });
};
