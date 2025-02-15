"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import { Typography, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import BaseTable from '../../../components/invoices/BaseTable';
import { fetchInvoices } from '../../../utils/api';
import { format } from 'date-fns';

const InvoiceListPage: React.FC = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const loadInvoices = async () => {
      const result = await fetchInvoices(page + 1, pageSize, searchQuery, statusFilter);
      if (result.success) {
        // Format the due_date and amount fields
        const formattedRows = result.data.rows.map((row: {
          id: number;
          name: string;
          number: string;
          due_date: string | null;
          amount: number;
          status: string;
        }) => ({
          ...row,
          due_date: row.due_date ? format(new Date(row.due_date), 'yyyy-MM-dd') : '',
          amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.amount),
        }));
        setRows(formattedRows);
        setRowCount(result.data.totalCount);
      } else {
        console.error(result.message);
      }
    };

    loadInvoices();
  }, [page, pageSize, searchQuery, statusFilter]);

  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        My Invoices
      </Typography>
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ flexGrow: 1 }}>
          <BaseTable
            rows={rows}
            paginationModel={{ page, pageSize }}
            pageSizeOptions={[5, 10, 20]}
            rowCount={rowCount}
            onPaginationModelChange={handlePaginationModelChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceListPage;