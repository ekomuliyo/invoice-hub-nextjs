import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './BaseTable.css'; // Import the CSS file

interface RowData {
  id: number;
  name: string;
  number: string;
  dueDate: Date;
  amount: number;
  status: string;
}

interface BaseTableProps {
  rows: RowData[];
  pageSizeOptions?: number[];
  paginationModel: { pageSize: number; page: number };
  rowCount: number;
  onPaginationModelChange: (model: { page: number; pageSize: number }) => void;
}

const BaseTable: React.FC<BaseTableProps> = ({
  rows,
  pageSizeOptions = [5, 10, 20],
  paginationModel,
  rowCount,
  onPaginationModelChange,
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80},
    { field: 'name', headerName: 'Name', flex: 1, cellClassName: 'wrap-content' },
    { field: 'number', headerName: 'Number', flex: 1, cellClassName: 'wrap-content' },
    { field: 'due_date', headerName: 'Due Date', flex: 1, cellClassName: 'wrap-content' },
    { field: 'amount', headerName: 'Amount', flex: 1, cellClassName: 'wrap-content' },
    { field: 'status', headerName: 'Status', flex: 1, cellClassName: 'wrap-content' },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
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