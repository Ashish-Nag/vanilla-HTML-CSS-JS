const currencyElement_one = document.getElementById('currency-one');
const amountElement_one = document.getElementById('amount-one');
const currencyElement_two = document.getElementById('currency-two');
const amountElement_two = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');


//fetch exchange rates and update the DOM   

function calculate() {
    const currency_one = currencyElement_one.value;
    const currency_two = currencyElement_two.value;

    fetch(`https://v6.exchangerate-api.com/v6/a6c7d1c9cb0693c737fc47e9/latest/${currency_one}`).then(res => res.json()).then(data => {
        const rate = data.conversion_rates[currency_two];

        rateElement.innerText = ` 1 ${currency_one} = ${rate} ${currency_two}`;

        amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
    })
}

//event listeners
currencyElement_one.addEventListener('change', calculate);
currencyElement_two.addEventListener('change', calculate);
amountElement_one.addEventListener('change', calculate);
amountElement_two.addEventListener('change', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElement_one.value;
    currencyElement_one.value = currencyElement_two.value;
    currencyElement_two.value = temp;
    calculate();
})

calculate();