let convertFrom = document.getElementById("from");
let convertTo = document.getElementById("to");
let amountInput = document.getElementById("amount");
let convertedAmount;
let exchangeRates; 
let isFirstTime = true;
let convertFromCurrency; 
let currencies;

function getCurrencies() {
    return fetch(`https://api.fastforex.io/fetch-all?api_key=c08c586352-6a9807a75f-s7a3f5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            currencies = data.results;
            const dataList = document.getElementById("fromOptions");

            dataList.innerHTML = "";

            for (const currency in currencies) {
                if (currencies.hasOwnProperty(currency)) {
                    const option = document.createElement("option");
                    option.value = currency;
                    dataList.appendChild(option);
                }
            }

            if (!isFirstTime) {
                convertFrom.value = convertFromCurrency;
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}

document.getElementById("convert").addEventListener("click", async (event) => {
    await getCurrencies();
    convertFromCurrency = convertFrom.value;

    if (amountInput.value <= 0 || amountInput.value.trim() === '' || convertFromCurrency === "") {
        Swal.fire({
            title: 'Invalid amount or currency',
            text: "Enter the amount and the currency you're converting from to proceed.",
        });
    } else {
        exchangeRate = currencies[convertFromCurrency];
        getValue(parseFloat(amountInput.value), exchangeRate);
    }
});

function getValue(amount, exchangeRate) {
    if (amount <= 0 || isNaN(amount) || isNaN(exchangeRate)) {
        convertedAmount = "";
    } else if (exchangeRate >= 1) {
        convertedAmount = amount / exchangeRate;
    } else {
        convertedAmount = amount * exchangeRate;
    }
    document.getElementById("result").value = '$' + convertedAmount.toFixed(2);
}

getCurrencies();


var typed = new Typed('.footer', {
    strings: ['Generated with ❤️ by Islam Khairy'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 2000,
    loop: true
});
