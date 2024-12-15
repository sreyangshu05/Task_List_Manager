import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem } from '@mui/material';
import './AddTaskForm.css';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status,
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      gap={2}
      mb={4}
      sx={{ flexWrap: 'wrap' }}
    >
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        fullWidth
      />
      <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
        fullWidth
      >
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Task
      </Button>
    </Box>
  );
}

export default AddTaskForm;
