import { useState, useCallback } from 'react';
import { fetchInvoices, deleteInvoice } from '../../utils/api';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { SelectChangeEvent } from '@mui/material';
import type { InvoiceRow } from '../../lib/types/invoice.types';
import type { RowData } from '../../components/invoices/BaseTable';

export const useInvoiceList = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  const router = useRouter();

  const loadInvoices = useCallback(async () => {
    const result = await fetchInvoices(page + 1, pageSize, searchQuery, statusFilter);
    if (result.success) {
      const formattedRows = result.data.rows.map((row: InvoiceRow): RowData => ({
        id: row.id,
        name: row.name,
        number: row.number,
        dueDate: row.due_date ? format(new Date(row.due_date), 'yyyy-MM-dd') : '',
        amount: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(row.amount),
        status: row.status
      }));
      setRows(formattedRows);
      setRowCount(result.data.totalCount);
    }
  }, [page, pageSize, searchQuery, statusFilter]);

  const handlePaginationModelChange = (model: { page: number; pageSize: number }) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleEdit = (id: number) => {
    router.push(`/invoices/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    setSelectedInvoiceId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInvoiceId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedInvoiceId !== null) {
      setIsDeletingId(selectedInvoiceId);
      try {
        const result = await deleteInvoice(selectedInvoiceId);
        if (result.success) {
          await loadInvoices();
          setSuccessMessage('Invoice deleted successfully');
        }
      } finally {
        setIsDeletingId(null);
        handleCloseDialog();
      }
    }
  };

  return {
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
  };
};
