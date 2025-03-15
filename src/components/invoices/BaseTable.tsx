import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './BaseTable.css'; // Import the CSS file
import { IconButton, Chip, Box, useTheme, useMediaQuery } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export interface RowData {
  id: number;
  name: string;
  number: string;
  dueDate: string;
  amount: string;
  status: string;
}

interface BaseTableProps {
  rows: RowData[];
  pageSizeOptions?: number[];
  paginationModel: { pageSize: number; page: number };
  rowCount: number;
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isDeletingId: number | null;
}

const BaseTable: React.FC<BaseTableProps> = ({
  rows,
  pageSizeOptions = [10, 25, 50],
  paginationModel,
  rowCount,
  onPaginationModelChange,
  onEdit,
  onDelete,
  isDeletingId
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mobileColumns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 100,
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1,
      minWidth: 100,
      align: 'right',
      headerAlign: 'right',
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      minWidth: 80,
      renderCell: (params) => {
        const statusColors = {
          Paid: 'success',
          Pending: 'warning',
          Overdue: 'error'
        } as const;

        return (
          <Chip
            label={params.value}
            size="small"
            color={statusColors[params.value as keyof typeof statusColors]}
            sx={{ minWidth: 60 }}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Box>
          <IconButton 
            onClick={() => onEdit(params.row.id)}
            color="primary"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row.id)}
            color="error"
            disabled={isDeletingId === params.row.id}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const desktopColumns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 150,
      cellClassName: 'wrap-content'
    },
    { 
      field: 'number', 
      headerName: 'Number', 
      flex: 1,
      minWidth: 120,
      cellClassName: 'wrap-content'
    },
    { 
      field: 'dueDate', 
      headerName: 'Due Date', 
      flex: 1,
      minWidth: 120,
      cellClassName: 'wrap-content'
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1,
      minWidth: 150,
      cellClassName: 'wrap-content'
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const statusColors = {
          Paid: 'success',
          Pending: 'warning',
          Overdue: 'error'
        } as const;

        return (
          <Chip
            label={params.value}
            size="small"
            color={statusColors[params.value as keyof typeof statusColors]}
            sx={{ minWidth: 80 }}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton 
            onClick={() => onEdit(params.row.id)}
            color="primary"
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => onDelete(params.row.id)}
            color="error"
            disabled={isDeletingId === params.row.id}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ 
      width: '100%',
      '& .MuiDataGrid-root': {
        backgroundColor: 'white',
        border: 'none',
        '& .MuiDataGrid-cell': {
          borderBottom: '1px solid #f0f0f0',
        },
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #f0f0f0',
      }
    }}>
      <DataGrid
        rows={rows}
        columns={isMobile ? mobileColumns : desktopColumns}
        pagination
        paginationMode="server"
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        rowCount={rowCount}
        onPaginationModelChange={onPaginationModelChange}
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          minHeight: 400,
          width: '100%',
          '& .MuiDataGrid-cell': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '8px 4px' : '16px',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeader': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '8px 4px' : '16px',
          },
          '& .MuiDataGrid-row': {
            minHeight: isMobile ? '48px !important' : '52px !important',
          },
          '& .MuiDataGrid-virtualScroller': {
            minHeight: '200px',
          }
        }}
      />
    </Box>
  );
};

export default BaseTable;