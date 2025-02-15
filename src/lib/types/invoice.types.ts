export interface InvoiceRow {
    id: number;
    name: string;
    number: string;
    due_date: string | null;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
    dueDate?: string;
}

export interface PaginationModel {
    page: number;
    pageSize: number;
}

export interface InvoiceFormData {
    name: string;
    number: string;
    dueDate: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
}

export interface InvoiceListResponse {
    rows: InvoiceRow[];
    totalCount: number;
}

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}

export interface InvoiceFormFieldsProps {
    errors: Record<string, { message?: string }>;
    isEdit?: boolean;
    onFormChange?: (data: Record<string, unknown>) => void;
}