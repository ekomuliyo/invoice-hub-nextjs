import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from '../../lib/schemas/invoiceSchema';
import { InvoiceFormDataSchema } from '../../lib/schemas/invoiceSchema';
import { 
    fetchInvoiceById, 
    updateInvoice 
} from '../../utils/api';
import { format } from 'date-fns';

export const useInvoiceEdit = (id: string) => {
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [invoiceNumber, setInvoiceNumber] = useState<string>('');

    const methods = useForm<InvoiceFormDataSchema>({
        resolver: zodResolver(invoiceSchema),
    });

    const { setValue } = methods;

    useEffect(() => {
        const loadInvoice = async () => {
            if (id) {
                const result = await fetchInvoiceById(Number(id));
                if (result.success) {
                    const invoiceData = result.data.data;
                    setInvoiceNumber(invoiceData.number);
                    
                    setValue('name', invoiceData.name);
                    setValue('number', invoiceData.number);
                    setValue('dueDate', invoiceData.due_date ? format(new Date(invoiceData.due_date), 'yyyy-MM-dd') : '');
                    setValue('amount', Number(invoiceData.amount));
                    setValue('status', invoiceData.status || 'Pending');
                } else {
                    console.error(result.message);
                }
            }
        };

        loadInvoice();
    }, [id, setValue]);

    const onSubmit = async (data: InvoiceFormDataSchema) => {
        try {
            setIsLoading(true);
            const result = await updateInvoice(Number(id), {
                ...data,
                number: data.number
            });
            
            if (result.success) {
                setSuccessMessage('Invoice updated successfully!');
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error updating invoice:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        methods,
        successMessage,
        isLoading,
        invoiceNumber,
        setSuccessMessage,
        onSubmit
    };
};