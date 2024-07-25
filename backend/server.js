const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

//app.use(express.static('public'));

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // or whatever your frontend URL is
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
