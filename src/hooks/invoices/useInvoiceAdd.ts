import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addInvoice } from '../../utils/api';
import { invoiceSchema } from '../../lib/schemas/invoiceSchema';
import { InvoiceFormDataSchema } from '../../lib/schemas/invoiceSchema';

export const useInvoiceAdd = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm<InvoiceFormDataSchema>({
    resolver: zodResolver(invoiceSchema),
  });

  const onSubmit = async (data: InvoiceFormDataSchema) => {
    setIsLoading(true);
    try {
      const result = await addInvoice(data);
      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error adding invoice:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    methods,
    successMessage,
    isLoading,
    setSuccessMessage,
    onSubmit
  };
};