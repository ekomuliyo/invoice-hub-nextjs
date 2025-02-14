import React from 'react';
import Layout from '../../../components/Layout';
import { Typography } from '@mui/material';

const InvoiceListPage: React.FC = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        My Invoices
      </Typography>
      {/* Render list of invoices here */}
    </Layout>
  );
};

export default InvoiceListPage;