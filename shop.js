document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async function () {
      const price = this.dataset.price;
      const boostName = this.dataset.boost;

      if (confirm(`Купить ${boostName} за ${price} TON?`)) {
        try {
          const response = await fetch('http://localhost:3090/create-invoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ boostName, price }),
          });

          const result = await response.json();

          if (result.invoice_id) {
            // Открываем ссылку на оплату
            window.open(`https://t.me/CryptoBot?start=${result.invoice_id}`, '_blank');
            alert('Перейдите в CryptoBot для оплаты.');
          } else {
            alert('Ошибка при создании счета на оплату.');
          }
        } catch (error) {
          alert('Ошибка: ' + error.message);
        }
      }
    });
  });
});