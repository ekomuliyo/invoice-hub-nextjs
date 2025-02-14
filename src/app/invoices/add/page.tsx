"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Typography, Box, Button, Alert } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InvoiceFormFields from '../../../components/invoices/InvoiceFormFields';
import { generateInvoiceNumber } from '../../../utils/invoiceUtils';
import { addInvoice, InvoiceFormData, invoiceSchema} from '../../../utils/api';

const AddInvoicePage: React.FC = () => {
  const methods = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const { setValue, handleSubmit, formState: { errors } } = methods;

  const [invoiceNumber, setInvoiceNumber] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const generatedNumber = generateInvoiceNumber();
    setInvoiceNumber(generatedNumber);
    setValue('number', generatedNumber);
  }, [setValue]);

  const onSubmit = async (data: InvoiceFormData) => {
    setIsLoading(true);
    const result = await addInvoice(data);
    setIsLoading(false);

    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      console.error(result.message);
    }
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Add Invoice
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, margin: 'auto' }}>
          <InvoiceFormFields invoiceNumber={invoiceNumber} errors={errors} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
              + Add Invoice
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default AddInvoicePage;