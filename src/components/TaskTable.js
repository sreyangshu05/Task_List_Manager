import React from 'react';
import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './TaskTable.css';

function TaskTable({ tasks, onUpdateTask, onDeleteTask }) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300, editable: true },
    { field: 'description', headerName: 'Description', width: 400, editable: true },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['To Do', 'In Progress', 'Done'],
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          onClick={() => onDeleteTask(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const handleProcessRowUpdate = (newRow) => {
    onUpdateTask(newRow);
    return newRow;
  };

  return (
    <Box style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={tasks}
        columns={columns}
        processRowUpdate={handleProcessRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default TaskTable;
