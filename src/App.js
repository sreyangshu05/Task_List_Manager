import React, { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import { Container, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function AppContent() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        const formattedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: "No description provided",
          status: task.completed ? "Done" : "To Do",
        }));
        setTasks(formattedTasks);
        toast.success("Tasks loaded successfully!");
      })
      .catch(() => {
        toast.error("Failed to fetch tasks.");
      });
  }, []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    toast.info("Task updated successfully!");
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.warn("Task deleted.");
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task List Manager
      </Typography>
      <AddTaskForm onAddTask={handleAddTask} />
      <TaskTable
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

function App() {
  return <AppContent />;
}

export default App;
