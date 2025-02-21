// Данные улучшения дохода
let incomeUpgradeData = JSON.parse(localStorage.getItem('incomeUpgradeData')) || {
  level: 1,
  baseIncome: 150,
  currentCost: 5000,
  costIncreasePattern: [5000, 5000, 5000, 10000, 10000, 50000, 50000, 50000],
  incomeIncreasePattern: [100, 100, 200, 200, 450, 700, 800, 1000]
};

// Данные улучшения времени
let timeUpgradeData = JSON.parse(localStorage.getItem('timeUpgradeData')) || {
  level: 1,
  baseTime: 8, // Время в часах
  currentCost: 20000,
  costIncreasePattern: [1500000],
  timeReductionPattern: [2, 3] // Уменьшение времени на 2 часа, затем на 3
};

// Элементы DOM
const balanceElement = document.getElementById('boost-balance');
const incomeLevelElement = document.getElementById('current-level');
const incomeCostElement = document.getElementById('upgrade-cost');
const incomeValueElement = document.getElementById('upgrade-income');
const incomeProgressElement = document.getElementById('upgrade-progress');
const buyIncomeButton = document.getElementById('buy-income-button');

const timeLevelElement = document.getElementById('time-level');
const timeCostElement = document.getElementById('time-cost');
const timeReductionElement = document.getElementById('time-reduction');
const timeProgressElement = document.getElementById('time-progress');
const buyTimeButton = document.getElementById('buy-time-button');

// Загрузка баланса из главной страницы
let balance = parseFloat(localStorage.getItem('balance')) || 0.00;

// Обновление интерфейса
function updateUI() {
  // Обновление улучшения дохода
  const nextIncome = incomeUpgradeData.baseIncome + incomeUpgradeData.incomeIncreasePattern.slice(0, incomeUpgradeData.level - 1).reduce((a, b) => a + b, 0);
  const newIncome = nextIncome + incomeUpgradeData.incomeIncreasePattern[incomeUpgradeData.level - 1] || 0;

  incomeLevelElement.textContent = incomeUpgradeData.level;
  incomeCostElement.textContent = `${incomeUpgradeData.currentCost} BR`;
  incomeValueElement.textContent = `${newIncome} BL`;
  incomeProgressElement.textContent = `${nextIncome} ⮕ ${newIncome} BL`;
  buyIncomeButton.disabled = balance < incomeUpgradeData.currentCost;

  // Обновление улучшения времени
  const nextTime = timeUpgradeData.baseTime - timeUpgradeData.timeReductionPattern.slice(0, timeUpgradeData.level - 1).reduce((a, b) => a + b, 0);
  const newTime = nextTime - timeUpgradeData.timeReductionPattern[timeUpgradeData.level - 1] || 0;

  timeLevelElement.textContent = timeUpgradeData.level;
  timeCostElement.textContent = `${timeUpgradeData.currentCost} BR`;
  timeReductionElement.textContent = `${newTime} часов`;
  timeProgressElement.textContent = `${nextTime} ⮕ ${newTime} часов`;
  buyTimeButton.disabled = balance < timeUpgradeData.currentCost;

  // Обновление баланса
  balanceElement.textContent = `${balance.toFixed(2)} BR`;
}

// Покупка улучшения дохода
function buyIncomeUpgrade() {
  if (balance >= incomeUpgradeData.currentCost) {
    balance -= incomeUpgradeData.currentCost;
    incomeUpgradeData.level += 1;

    const costIndex = Math.min(incomeUpgradeData.level - 1, incomeUpgradeData.costIncreasePattern.length - 1);
    incomeUpgradeData.currentCost += incomeUpgradeData.costIncreasePattern[costIndex] || 1000000;

    localStorage.setItem('balance', balance);
    localStorage.setItem('incomeUpgradeData', JSON.stringify(incomeUpgradeData));
    updateUI();
    alert('Улучшение дохода куплено!');
  } else {
    alert('Недостаточно средств!');
  }
}

// Покупка улучшения времени
function buyTimeUpgrade() {
  if (balance >= timeUpgradeData.currentCost) {
    balance -= timeUpgradeData.currentCost;
    timeUpgradeData.level += 1;

    const costIndex = Math.min(timeUpgradeData.level - 1, timeUpgradeData.costIncreasePattern.length - 1);
    timeUpgradeData.currentCost += timeUpgradeData.costIncreasePattern[costIndex] || 1000000;

    localStorage.setItem('balance', balance);
    localStorage.setItem('timeUpgradeData', JSON.stringify(timeUpgradeData));
    updateUI();
    alert('Улучшение времени куплено!');
  } else {
    alert('Недостаточно средств!');
  }
}

// Инициализация
buyIncomeButton.addEventListener('click', buyIncomeUpgrade);
buyTimeButton.addEventListener('click', buyTimeUpgrade);
updateUI();