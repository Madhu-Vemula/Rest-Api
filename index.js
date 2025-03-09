const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


const tasks = [];

const validateTask = (req, res, next) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }
  
  req.body.title = title.trim();
  req.body.description = description ? description.trim() : '';
  
  next();
};

app.get('/tasks', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  
  res.json({
    page,
    total: tasks.length,
    tasks: paginatedTasks
  });
});

app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  res.json(task);
});

app.post('/tasks', validateTask, (req, res) => {
  const { title, description } = req.body;
  
  const newTask = {
    id: uuidv4(),
    title,
    description,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.put('/tasks/:id', validateTask, (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, description } = req.body;
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    updatedAt: new Date().toISOString()
  };
  
  res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API',
    endpoints: {
      getAllTasks: 'GET /tasks',
      getTask: 'GET /tasks/:id',
      createTask: 'POST /tasks',
      updateTask: 'PUT /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});