const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/d', require('./routes/formRoutes'));
app.use('/api/d/e', require('./routes/instanceRoutes'));
app.use('/api/d/e/v', require('./routes/validationRoutes'));

app.get('/', (req, res) => res.send('Please set to production'));

app.listen(port, () => console.log(`Servidor iniciou na porta ${port}`));
