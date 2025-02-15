"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Layout from '../../../../components/Layout';
import { Typography, Box, Button, Alert } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import InvoiceFormFields from '../../../../components/invoices/InvoiceFormFields';
import { useInvoiceEdit } from '../../../../hooks/invoices';
import EditIcon from '@mui/icons-material/Edit';

const EditInvoicePage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const {
    methods,
    successMessage,
    isLoading,
    invoiceNumber,
    setSuccessMessage,
    onSubmit
  } = useInvoiceEdit(id);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Edit Invoice - {invoiceNumber}
      </Typography>
      {successMessage && <Alert severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>}
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} sx={{ maxWidth: 800, margin: 'auto' }}>
          <InvoiceFormFields
            errors={methods.formState.errors}
            isEdit={true}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button type="submit" variant="contained" color="secondary" disabled={isLoading}>
              <EditIcon /> Edit Invoice
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default EditInvoicePage;

