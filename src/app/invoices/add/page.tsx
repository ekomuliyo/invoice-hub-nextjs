"use client";

import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';

const invoiceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string().min(1, "Number is required"),
  dueDate: z.string().min(1, "Due Date is required"),
  amount: z.number().positive("Amount must be positive"),
  status: z.string().min(1, "Status is required"),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

const AddInvoicePage: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  });

  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [invoiceNumber, setInvoiceNumber] = useState<string>('');

  const generateInvoiceNumber = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  };

  useEffect(() => {
    const generatedNumber = generateInvoiceNumber();
    setInvoiceNumber(generatedNumber);
    setValue('number', generatedNumber);
  }, [setValue]);

  const onSubmit = (data: InvoiceFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Add Invoice
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, margin: 'auto' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            placeholder="Enter your invoice name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Number"
            fullWidth
            margin="normal"
            defaultValue={`INV${invoiceNumber}`}
            error={!!errors.number}
            helperText={errors.number?.message}
            disabled
            slotProps={{
              input: {
                readOnly: true,
                style: { backgroundColor: '#F0F0F0' },
              },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={dueDate}
              onChange={(newValue: Date | null) => {
                setDueDate(newValue);
                setValue('dueDate', newValue ? newValue.toISOString() : '');
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal"
                }
              }}
            />
          </LocalizationProvider>
          <NumericFormat
            placeholder="Enter your invoice amount"
            label="Amount"
            fullWidth
            margin="normal"
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            prefix="Rp "
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
            onValueChange={(values) => {
              const { value } = values;
              setValue('amount', parseFloat(value));
            }}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            select
            {...register('status')}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Overdue">Overdue</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            + Add Invoice
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default AddInvoicePage;
