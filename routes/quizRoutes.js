const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Получить вопрос от нейросети
router.post('/question', quizController.getQuestion);

// Сохранить ответ пользователя
router.post('/answer', quizController.saveAnswer);

// Получить историю по userId
router.get('/history/:userId', quizController.getHistory);

module.exports = router;
