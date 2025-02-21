const express = require('express');
const axios = require('axios');
const app = express();

const CRYPTOBOT_API_KEY = '344126:AAUIvWXNEjurekv6XJy1yfwkaFXgh521prN'; // Замените на ваш ключ от CryptoBot
const PORT = 3090;

app.use(express.json());

// Временное хранилище бустов
let activeBoosts = {};

// Создание инвойса (счета на оплату)
app.post('/create-invoice', async (req, res) => {
  const { boostName, price } = req.body;

  try {
    const response = await axios.post('https://pay.crypt.bot/api/createInvoice', {
      asset: 'TON',
      amount: price,
      description: `Покупка буста: ${boostName}`,
      payload: boostName, // Передаем название буста в payload
    }, {
      headers: { 'Crypto-Pay-API-Token': CRYPTOBOT_API_KEY },
    });

    res.json(response.data.result);
  } catch (error) {
    console.error('Ошибка при создании инвойса:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Ошибка при создании инвойса' });
  }
});

// Вебхук для обработки платежей
app.post('/webhook', async (req, res) => {
  const { payload, status } = req.body;

  if (status === 'paid') {
    const boostName = payload; // Название буста из payload
    activateBoost(boostName);
  }

  res.sendStatus(200);
});

// Активация буста
function activateBoost(boostName) {
  const boostData = {
    name: boostName,
    activatedAt: new Date(),
    expiresAt: new Date(Date.now() + getBoostDuration(boostName) * 24 * 60 * 60 * 1000),
  };

  // Сохраняем буст в "базе данных" (в реальном проекте используйте MongoDB/PostgreSQL)
  activeBoosts[boostName] = boostData;
  console.log(`Буст активирован: ${boostName}`);
}

// Получение длительности буста
function getBoostDuration(boostName) {
  if (boostName.includes('x2')) return 1; // 1 день
  if (boostName.includes('x3')) return 7; // 7 дней
  return 0;
}

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));