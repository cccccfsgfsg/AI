
AI Learning Quiz API (Node.js + OpenAI/GIGACHAT + PostgreSQL)

Этот проект представляет собой REST API на Node.js, позволяющий взаимодействовать с пользователем в виде обучающего теста, где нейросеть (GPT-3.5 или GIGACHAT) задаёт вопросы, а пользователь на них отвечает. Все ответы сохраняются в PostgreSQL.

---

Установка и запуск

1.  Репозиторий

```bash
git clone https://github.com/cccccfsgfsg/AI.git
cd AI
```

2. Установка зависимости

```bash
npm install
```

3.  `.env` файл

```bash
touch .env
```

В файл `.env` добавь:

```env
OPENAI_API_KEY=sk-ваш_ключ
```

4. Настройка бд

Открой `db.js` и укажи параметры своей PostgreSQL базы:

```js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'aiquiz',
  password: 'ваш_пароль',
  port: 5432,
});

module.exports = pool;
```

Таблица `answers`:

```sql
CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  user_answer TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

 5. Запуск сервера

```bash
node index.js
```

---

📁 Структура проекта

```
AI/
├── index.js               # Точка входа
├── db.js                  # Подключение к PostgreSQL
├── routes/
│   └── quizRoutes.js      # Определение маршрутов API
├── controllers/
│   └── quizController.js  # Обработка логики запросов
├── services/
│   └── neuralService.js   # Работа с OpenAI API
├── .env                   # Переменные окружения
└── .gitignore             # Исключения Git
```

---

API

📥 Получить вопрос от нейросети

GET `/api/quiz/question`

Ответ:

```json
{
  "question": "Что такое REST API?"
}
```

Логика:

```js
const { askNeuralNetwork } = require('../services/neuralService');

exports.getQuestionFromAI = async (req, res) => {
  const question = await askNeuralNetwork("Задай пользователю обучающий вопрос.");
  res.json({ question });
};
```

---

 Отправить ответ пользователя

POST `/api/quiz/answer`

Тело запроса:

```json
{
  "question": "Что такое REST API?",
  "userAnswer": "Это архитектура взаимодействия компонентов через HTTP"
}
```

Ответ:

```json
{
  "message": "Ответ успешно сохранён"
}
```

Логика:

```js
const pool = require('../db');

exports.submitAnswer = async (req, res) => {
  const { question, userAnswer } = req.body;
  await pool.query(
    'INSERT INTO answers (question, user_answer) VALUES ($1, $2)',
    [question, userAnswer]
  );
  res.status(201).json({ message: 'Ответ успешно сохранён' });
};
```

---

Работа с OpenAI API

```js
const axios = require('axios');
require('dotenv').config();

exports.askNeuralNetwork = async (prompt) => {
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.choices[0].message.content.trim();
};
```

---

 Тестирование с Postman

- `GET http://localhost:3000/api/quiz/question` — получить вопрос.
- `POST http://localhost:3000/api/quiz/answer` — отправить ответ.

---

 Заметки

- Используй `dotenv` для хранения ключей и конфигураций.
- `.gitignore` должен содержать:

```
.env
node_modules
```

---

 Идеи для расширения

- Авторизация пользователей
- Система очков и прогресса
- UI-интерфейс (React, Vue)
- Анализ ответов и обратная связь от нейросети

---
