import { z } from 'zod';

export const invoiceSchema = z.object({
    name: z.string().min(1, "Name is required"),
    number: z.string().min(1, "Number is required"),
    dueDate: z.string().min(1, "Due date is required"),
    amount: z.number().min(1, "Amount is required"),
    status: z.enum(['Paid', 'Pending', 'Overdue'], {
        errorMap: () => ({ message: "Invalid status" })
    })
});

export type InvoiceFormDataSchema = z.infer<typeof invoiceSchema>;