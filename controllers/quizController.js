const neuralService = require('../services/neuralService');

exports.getQuestion = async (req, res) => {
  try {
    const { userId, history } = req.body;
    const question = await neuralService.generateQuestion(history);
    res.json({ question });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка генерации вопроса' });
  }
};

exports.saveAnswer = async (req, res) => {
  // Тут будет логика сохранения в базу
  res.json({ message: 'Ответ сохранён (заглушка)' });
};

exports.getHistory = async (req, res) => {
  // Тут будет логика получения истории
  res.json({ message: 'История загружена (заглушка)' });
};
// controllers/quizController.js

exports.getQuestion = (req, res) => {
  res.json({ question: "Пример вопроса от нейросети (заглушка)" });
};

exports.saveAnswer = (req, res) => {
  res.json({ message: 'Ответ сохранён (заглушка)' });
};

exports.getHistory = (req, res) => {
  res.json({ message: 'История загружена (заглушка)' });
};
