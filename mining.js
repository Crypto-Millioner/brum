// Загрузка данных улучшения времени
const timeUpgradeData = JSON.parse(localStorage.getItem('timeUpgradeData')) || { baseTime: 8 };

// В функции startMining замените фиксированное значение 8 часов на:
function startMining() {
  const miningTime = timeUpgradeData.baseTime - (timeUpgradeData.timeReductionPattern?.slice(0, timeUpgradeData.level - 1).reduce((a, b) => a + b, 0) || 0);
  remainingTime = miningTime * 60 * 60; // Переводим часы в секунды

  // Вращение логотипа
  logoElement.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    logoElement.style.transform = 'rotate(0deg)';
  }, 1000);

  // Запуск таймера
  actionButton.disabled = true;
  timer = setInterval(updateTimer, 1000);
}

// Загрузка данных улучшения
const upgradeData = JSON.parse(localStorage.getItem('upgradeData')) || { baseIncome: 150 };

// В функции claimReward замените фиксированное значение 150 на:
function claimReward() {
  const reward = upgradeData.baseIncome + (upgradeData.incomeIncreasePattern?.slice(0, upgradeData.level - 1).reduce((a, b) => a + b, 0) || 150);
  balance += reward;
  balanceElement.textContent = `${balance.toFixed(2)} BR`;
  actionButton.textContent = "Start";
}

// Элементы DOM
const balanceElement = document.getElementById('balance');
const logoElement = document.getElementById('logo');
const actionButton = document.getElementById('action-button');


// Переменные
let balance = 0.00;
let timer = null;
let remainingTime = 8 * 60 * 60; // 8 часов в секундах

// Функция для обновления баланса
function updateBalance(amount) {
  balance += amount;
  balanceElement.textContent = `${balance.toFixed(2)} BR`;
}

// Функция для обновления таймера
function updateTimer() {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  actionButton.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (remainingTime <= 0) {
    clearInterval(timer);
    actionButton.textContent = "Claim 150 BR";
    actionButton.disabled = false;
  } else {
    remainingTime--;
  }
}

// Функция для запуска майнинга
function startMining() {
  // Вращение логотипа
  logoElement.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    logoElement.style.transform = 'rotate(0deg)';
  }, 1000);

  // Запуск таймера
  actionButton.disabled = true;
  remainingTime = 8 * 60 * 60;
  timer = setInterval(updateTimer, 1000);
}

// Функция для получения награды
function claimReward() {
  updateBalance(150);
  actionButton.textContent = "Start";
}

// Обработчик клика на кнопку
actionButton.addEventListener('click', () => {
  if (actionButton.textContent === "Start") {
    startMining();
  } else if (actionButton.textContent === "Claim 150 BR") {
    claimReward();
  }
});

// Обработчик клика на логотип
logoElement.addEventListener('click', () => {
  updateBalance(0.001); // Добавляем 0.01 BR за каждый клик
});