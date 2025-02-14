import React, { useState } from 'react';
import { TextField, Box, MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';

interface InvoiceFormFieldsProps {
  invoiceNumber: string;
  errors: Record<string, { message?: string }>;
}

const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({ invoiceNumber, errors }) => {
    console.log(errors)
  const { register, setValue } = useFormContext();
  const [dueDate, setDueDate] = useState<Date | null>(null);

  return (
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
            setValue('dueDate', newValue ? newValue.toISOString() : '', {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          slotProps={{
            textField: {
                fullWidth: true,
                margin: "normal",
                error: !!errors.dueDate,
                helperText: errors.dueDate?.message,
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
  );
};

export default InvoiceFormFields;