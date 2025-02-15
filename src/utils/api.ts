import { InvoiceFormDataSchema } from '../lib/schemas/invoiceSchema';

export const addInvoice = async (data: InvoiceFormDataSchema) => {
    try {
        const response = await fetch('/api/invoicesApi', {
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

export const fetchInvoices = async (page: number, pageSize: number, search: string = '', status: string = '') => {
    try {
        const response = await fetch(`/api/invoicesApi?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(status)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch invoices');
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching invoices:', error as Error);
        return { success: false, message: (error as Error).message };
    }
};

export const deleteInvoice = async (id: number) => {
    try {
        const response = await fetch(`/api/invoicesApi?id=${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete invoice');
        }

        return { success: true, message: 'Invoice deleted successfully' };
    } catch (error) {
        console.error('Error deleting invoice:', error as Error);
        return { success: false, message: (error as Error).message };
    }
};

export const fetchInvoiceById = async (id: number) => {
    try {
        const response = await fetch(`/api/invoicesApi?id=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch invoice');
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error fetching invoice:', error as Error);
        return { success: false, message: (error as Error).message };
    }
};

export const updateInvoice = async (id: number, data: InvoiceFormDataSchema) => {
    try {
        const response = await fetch(`/api/invoicesApi?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update invoice');
        }

        return { success: true, message: 'Invoice updated successfully' };
    } catch (error) {
        console.error('Error updating invoice:', error as Error);
        return { success: false, message: (error as Error).message };
    }
};

