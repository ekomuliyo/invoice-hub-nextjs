import React, { useState, useEffect } from 'react';
import { TextField, Box, MenuItem, Chip } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { NumericFormat } from 'react-number-format';
import { generateInvoiceNumber } from '../../utils/invoiceUtils';
import { format } from 'date-fns';

interface InvoiceFormFieldsProps {
    errors: Record<string, { message?: string }>;
    isEdit?: boolean;
    onFormChange?: (data: Record<string, unknown>) => void;
}

const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({
    errors,
    isEdit = false,
    onFormChange
}) => {
    const { register, setValue, getValues, watch } = useFormContext();
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [status, setStatus] = useState<string>(isEdit ? 'Pending' : '');

    useEffect(() => {
        if (!isEdit) {
            const generatedNumber = generateInvoiceNumber();
            setInvoiceNumber(generatedNumber);
            setValue('number', generatedNumber);
        }
    }, [setValue, isEdit]);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'dueDate' && value.dueDate) {
                setDueDate(new Date(value.dueDate));
            }
            if (name === 'status' && value.status) {
                setStatus(value.status);
            }
        });

        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        if (isEdit) {
            const currentStatus = getValues('status');
            if (currentStatus) {
                setStatus(currentStatus);
            }
        }
    }, [isEdit, getValues]);

    // Watch for form changes and notify parent
    useEffect(() => {
        const subscription = watch((data) => {
            if (onFormChange) {
                onFormChange(data);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, onFormChange]);

    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
                label="Name"
                fullWidth
                margin="normal"
                placeholder="Enter your invoice name"
                defaultValue={isEdit ? getValues('name') : ''}
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    }
                }}
            />
            <TextField
                label="Number"
                fullWidth
                margin="normal"
                value={isEdit
                    ? getValues('number')
                    : `${invoiceNumber || ''}`
                }
                {...register('number')}
                error={!!errors.number}
                helperText={errors.number?.message}
                disabled
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    input: {
                        readOnly: true,
                        style: { backgroundColor: '#F0F0F0' },
                    },
                }}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Due Date"
                    value={dueDate || (getValues('dueDate') ? new Date(getValues('dueDate')) : null)}
                    onChange={(newValue: Date | null) => {
                        setDueDate(newValue);
                        setValue('dueDate', newValue ? format(newValue, 'yyyy-MM-dd') : '', {
                            shouldValidate: true,
                            shouldDirty: true,
                        });
                    }}
                    format="yyyy-MM-dd"
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
                value={getValues('amount') || ''}
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
                value={status}
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
                onChange={(e) => {
                    setStatus(e.target.value);
                    setValue('status', e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                    });
                }}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    }
                }}
            >
                <MenuItem value="Pending">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                            label="Pending" 
                            size="small" 
                            color="warning"
                            sx={{ minWidth: 80 }}
                        />
                    </Box>
                </MenuItem>
                <MenuItem value="Paid">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                            label="Paid" 
                            size="small" 
                            color="success"
                            sx={{ minWidth: 80 }}
                        />
                    </Box>
                </MenuItem>
                <MenuItem value="Overdue">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                            label="Overdue" 
                            size="small" 
                            color="error"
                            sx={{ minWidth: 80 }}
                        />
                    </Box>
                </MenuItem>
            </TextField>
        </Box>
    );
};

export default InvoiceFormFields;