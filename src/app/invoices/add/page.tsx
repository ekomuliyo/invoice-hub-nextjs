"use client";

import React from 'react';
import Layout from '../../../components/Layout';
import { Typography, Box, Button, Alert } from '@mui/material';
import { FormProvider } from 'react-hook-form';
import InvoiceFormFields from '../../../components/invoices/InvoiceFormFields';
import { useInvoiceAdd } from '../../../hooks/invoices';
import AddIcon from '@mui/icons-material/Add';

const AddInvoicePage: React.FC = () => {
  const {
    methods,
    successMessage,
    isLoading,
    setSuccessMessage,
    onSubmit
  } = useInvoiceAdd();

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Add Invoice
      </Typography>
      {successMessage && (
        <Alert severity="success" onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}
      <FormProvider {...methods}>
        <Box 
          component="form" 
          onSubmit={methods.handleSubmit(onSubmit)} 
          sx={{ maxWidth: 800, margin: 'auto' }}
        >
          <InvoiceFormFields errors={methods.formState.errors} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={isLoading}
            >
              <AddIcon /> Add Invoice
            </Button>
          </Box>
        </Box>
      </FormProvider>
    </Layout>
  );
};

export default AddInvoicePage;