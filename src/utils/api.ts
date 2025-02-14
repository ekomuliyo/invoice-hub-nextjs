import { z } from 'zod';

export const invoiceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    number: z.string().min(1, "Number is required"),
    dueDate: z.coerce.date(),
    amount: z.number().min(1, "Amount is required"),
    status: z.string().min(1, "Status is required"),
  });

export type InvoiceFormData = z.infer<typeof invoiceSchema>;

export const addInvoice = async (data: InvoiceFormData) => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 201) {
        return { success: true, message: 'Invoice added successfully!' };
      } else {
        throw new Error('Failed to add invoice');
      }
    } catch (error) {
      console.error('Error adding invoice:', error as Error);
      return { success: false, message: (error as Error).message };
    }
  };