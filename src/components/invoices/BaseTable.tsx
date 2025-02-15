import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './BaseTable.css'; // Import the CSS file
import { IconButton, Chip, Box } from '@mui/material';
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
}

const BaseTable: React.FC<BaseTableProps> = ({
  rows,
  pageSizeOptions = [5, 10, 20],
  paginationModel,
  rowCount,
  onPaginationModelChange,
  onEdit,
  onDelete,
}) => {
  const columns: GridColDef[] = [
    { 
      field: 'id', 
      headerName: 'ID', 
      width: 80,
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1, 
      cellClassName: 'wrap-content',
      align: 'left',
      headerAlign: 'left'
    },
    { 
      field: 'number', 
      headerName: 'Number', 
      flex: 1, 
      cellClassName: 'wrap-content',
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'dueDate', 
      headerName: 'Due Date', 
      flex: 1, 
      cellClassName: 'wrap-content',
      align: 'center',
      headerAlign: 'center'
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      flex: 1, 
      cellClassName: 'wrap-content',
      align: 'right',
      headerAlign: 'right'
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const statusColors = {
          Paid: 'success',
          Pending: 'warning',
          Overdue: 'error'
        } as const;

        return (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            height: '100%'
          }}>
            <Chip
              label={params.value}
              size="small"
              color={statusColors[params.value as keyof typeof statusColors]}
              sx={{ minWidth: 80 }}
            />
          </Box>
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <IconButton
            color="secondary"
            onClick={() => onEdit(params.row.id)}
            style={{ marginRight: 8 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => onDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div style={{ height: 'calc(100vh - 250px)', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="server"
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        rowCount={rowCount}
        onPaginationModelChange={onPaginationModelChange}
      />
    </div>
  );
};

export default BaseTable;