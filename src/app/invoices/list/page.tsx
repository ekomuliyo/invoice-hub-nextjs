"use client";

import React, { useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Typography, TextField, Select, MenuItem, FormControl, InputLabel, Alert } from '@mui/material';
import BaseTable from '../../../components/invoices/BaseTable';
import ConfirmationDialog from '../../../components/invoices/ConfirmationDialog';
import { useInvoiceList } from '../../../hooks/invoices';

const ListInvoicePage: React.FC = () => {
  const {
    rows,
    page,
    pageSize,
    rowCount,
    searchQuery,
    statusFilter,
    openDialog,
    successMessage,
    isDeletingId,
    loadInvoices,
    handlePaginationModelChange,
    handleSearchChange,
    handleStatusChange,
    handleEdit,
    handleDelete,
    handleCloseDialog,
    handleConfirmDelete,
    setSuccessMessage
  } = useInvoiceList();

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        My Invoices
      </Typography>
      {successMessage && <Alert severity="success" onClose={() => setSuccessMessage(null)}>{successMessage}</Alert>}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={handleStatusChange}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Paid">Paid</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Overdue">Overdue</MenuItem>
        </Select>
      </FormControl>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexGrow: 1 }}>
          <BaseTable
            rows={rows}
            paginationModel={{ page, pageSize }}
            pageSizeOptions={[5, 10, 20]}
            rowCount={rowCount}
            onPaginationModelChange={handlePaginationModelChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeletingId={isDeletingId}
          />
        </div>
      </div>
      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this invoice?"
      />
    </Layout>
  );
};

export default ListInvoicePage;