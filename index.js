require('dotenv').config();

const express = require('express')
const app = express();
const quizRoutes = require('./routes/quizRoutes');

app.use(express.json())

app.use('/api/quiz',quizRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});