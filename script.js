let convertFromInput = document.getElementById("from");
let convertToInput = document.getElementById("to");
let fromDataList = document.getElementById("fromCurrencies");
let toDataList = document.getElementById("toCurrencies");
let amountInput = document.getElementById("amount");
let spinner = document.getElementById("spinner");
let convertedAmount = 0; 
let isFirstTime = true;
let convertFromCurrency;
let convertToCurrency;
let currencies;

const countryNames = {
    'AED': 'United Arab Emirates',
    'AFN': 'Afghanistan',
    'ALL': 'Albania',
    'AMD': 'Armenia',
    'ANG': 'Netherlands Antilles',
    'AOA': 'Angola',
    'ARS': 'Argentina',
    'AUD': 'Australia',
    'AWG': 'Aruba',
    'AZN': 'Azerbaijan',
    'BAM': 'Bosnia and Herzegovina',
    'BBD': 'Barbados',
    'BDT': 'Bangladesh',
    'BGN': 'Bulgaria',
    'BHD': 'Bahrain',
    'BIF': 'Burundi',
    'BMD': 'Bermuda',
    'BND': 'Brunei',
    'BOB': 'Bolivia',
    'BRL': 'Brazil',
    'BSD': 'Bahamas',
    'BTN': 'Bhutan',
    'BWP': 'Botswana',
    'BZD': 'Belize',
    'CAD': 'Canada',
    'CDF': 'Democratic Republic of the Congo',
    'CHF': 'Switzerland',
    'CLF': 'Unidad de Fomento (CLF)',
    'CLP': 'Chile',
    'CNH': 'China (Offshore)',
    'CNY': 'China',
    'COP': 'Colombia',
    'CUP': 'Cuba',
    'CVE': 'Cape Verde',
    'CZK': 'Czech Republic',
    'DJF': 'Djibouti',
    'DKK': 'Denmark',
    'DOP': 'Dominican Republic',
    'DZD': 'Algeria',
    'EGP': 'Egypt',
    'ERN': 'Eritrea',
    'ETB': 'Ethiopia',
    'EUR': 'Euro',
    'FJD': 'Fiji',
    'FKP': 'Falkland Islands',
    'GBP': 'United Kingdom',
    'GEL': 'Georgia',
    'GHS': 'Ghana',
    'GIP': 'Gibraltar',
    'GMD': 'Gambia',
    'GNF': 'Guinea',
    'GTQ': 'Guatemala',
    'GYD': 'Guyana',
    'HKD': 'Hong Kong',
    'HNL': 'Honduras',
    'HRK': 'Croatia',
    'HTG': 'Haiti',
    'HUF': 'Hungary',
    'IDR': 'Indonesia',
    'ILS': 'Israel',
    'INR': 'India',
    'IQD': 'Iraq',
    'IRR': 'Iran',
    'ISK': 'Iceland',
    'JMD': 'Jamaica',
    'JOD': 'Jordan',
    'JPY': 'Japan',
    'KES': 'Kenya',
    'KGS': 'Kyrgyzstan',
    'KHR': 'Cambodia',
    'KMF': 'Comoros',
    'KPW': 'North Korea',
    'KRW': 'South Korea',
    'KWD': 'Kuwait',
    'KYD': 'Cayman Islands',
    'KZT': 'Kazakhstan',
    'LAK': 'Laos',
    'LBP': 'Lebanon',
    'LKR': 'Sri Lanka',
    'LRD': 'Liberia',
    'LSL': 'Lesotho',
    'LYD': 'Libya',
    'MAD': 'Morocco',
    'MDL': 'Moldova',
    'MGA': 'Madagascar',
    'MKD': 'North Macedonia',
    'MMK': 'Myanmar',
    'MNT': 'Mongolia',
    'MOP': 'Macau',
    'MRU': 'Mauritania',
    'MUR': 'Mauritius',
    'MVR': 'Maldives',
    'MWK': 'Malawi',
    'MXN': 'Mexico',
    'MYR': 'Malaysia',
    'MZN': 'Mozambique',
    'NAD': 'Namibia',
    'NGN': 'Nigeria',
    'NOK': 'Norway',
    'NPR': 'Nepal',
    'NZD': 'New Zealand',
    'OMR': 'Oman',
    'PAB': 'Panama',
    'PEN': 'Peru',
    'PGK': 'Papua New Guinea',
    'PHP': 'Philippines',
    'PKR': 'Pakistan',
    'PLN': 'Poland',
    'PYG': 'Paraguay',
    'QAR': 'Qatar',
    'RON': 'Romania',
    'RSD': 'Serbia',
    'RUB': 'Russia',
    'RWF': 'Rwanda',
    'SAR': 'Saudi Arabia',
    'SCR': 'Seychelles',
    'SDG': 'Sudan',
    'SEK': 'Sweden',
    'SGD': 'Singapore',
    'SHP': 'Saint Helena',
    'SLL': 'Sierra Leone',
    'SOS': 'Somalia',
    'SRD': 'Suriname',
    'SYP': 'Syria',
    'SZL': 'Eswatini',
    'THB': 'Thailand',
    'TJS': 'Tajikistan',
    'TMT': 'Turkmenistan',
    'TND': 'Tunisia',
    'TOP': 'Tonga',
    'TRY': 'Turkey',
    'TTD': 'Trinidad and Tobago',
    'TWD': 'Taiwan',
    'TZS': 'Tanzania',
    'UAH': 'Ukraine',
    'UGX': 'Uganda',
    'USD': 'United States',
    'UYU': 'Uruguay',
    'UZS': 'Uzbekistan',
    'VND': 'Vietnam',
    'VUV': 'Vanuatu',
    'WST': 'Samoa',
    'XAF': 'Central African CFA franc',
    'XCD': 'Eastern Caribbean dollar',
    'XDR': 'Special Drawing Rights (XDR)',
    'XOF': 'West African CFA franc',
    'XPF': 'CFP franc',
    'YER': 'Yemen',
    'ZAR': 'South Africa',
    'ZMW': 'Zambia',
};

function getCurrencies() {
    return fetch(`https://v6.exchangerate-api.com/v6/baa3a9e2509c9b674a3486a2/latest/usd?api_key=e62be596`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            currencies = data.conversion_rates;

            fromDataList.innerHTML = "";
            toDataList.innerHTML = "";

            for (const currency in currencies) {
                if (currencies.hasOwnProperty(currency)) {
                    const optionFrom = document.createElement("option");
                    const optionTo = document.createElement("option");

                    const countryName = countryNames[currency];
                    optionFrom.value = `${countryName} - ${currency}`;
                    optionFrom.textContent = `${countryName} - ${currency}`;
                    optionTo.value = `${countryName} - ${currency}`;
                    optionTo.textContent = `${countryName} - ${currency}`;

                    fromDataList.appendChild(optionFrom);
                    toDataList.appendChild(optionTo);
                }
            }

            if (!isFirstTime) {
                convertFromInput.value = convertFromCurrency;
                convertToInput.value = convertToCurrency;
            }
        })
}

convertFromInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase(); 
    const countryCurrencyPair = input.split(' - ');
    const enteredCountry = countryCurrencyPair[0].trim();
    for (const currency in countryNames) {
        if (countryNames.hasOwnProperty(currency)) {
            const countryName = countryNames[currency].toLowerCase();
            if (countryName === enteredCountry) {
                convertFromInput.value = `${countryNames[currency]} - ${currency}`;
                convertFromCurrency = currency;
                convertFromInput.dispatchEvent(new Event('change')); 
                return;
            }
        }
    }
});

convertToInput.addEventListener("input", (event) => {
    const input = event.target.value.toLowerCase(); 
    const countryCurrencyPair = input.split(' - ');
    const enteredCountry = countryCurrencyPair[0].trim();
    for (const currency in countryNames) {
        if (countryNames.hasOwnProperty(currency)) {
            const countryName = countryNames[currency].toLowerCase();
            if (countryName === enteredCountry) {
                convertToInput.value = `${countryNames[currency]} - ${currency}`;
                convertToCurrency = currency;
                convertToInput.dispatchEvent(new Event('change'));
                return;
            }
        }
    }
});

convertFromInput.addEventListener("keydown", (event) => {
    const inputValue = convertFromInput.value.trim();
    switch (event.key) {
        case 'Backspace':
        case 'Delete':
            if (inputValue === "") {
                convertFromCurrency = null;
            } else {
                const lastIndex = inputValue.lastIndexOf(' - ');
                if (lastIndex !== -1) {
                    convertFromInput.value = inputValue.substring(0, lastIndex-1);
                    event.preventDefault(); 
                }
            }
            break;
        case 'Escape':
            convertFromInput.value = ""; 
            convertFromCurrency = null; 
            break;
    }
});

convertToInput.addEventListener("keydown", (event) => {
    const inputValue = convertToInput.value.trim();
    switch (event.key) {
        case 'Backspace':
        case 'Delete':
            if (inputValue === "") {
                convertToCurrency = null;
            } else {
                const lastIndex = inputValue.lastIndexOf(' - ');
                if (lastIndex !== -1) {
                    convertToInput.value = inputValue.substring(0, lastIndex-1);
                    event.preventDefault(); 
                }
            }
            break;
        case 'Escape':
            convertToInput.value = "";
            convertToCurrency = null; 
            break;
    }
});

document.getElementById("convert").addEventListener("click", async (event) => {
    spinner.style.display = "block";
    await getCurrencies();
    convertFromCurrency = convertFromInput.value.split(' - ')[1];
    convertToCurrency = convertToInput.value.split(' - ')[1];

    let title, text;

    if (!navigator.onLine) {   
        title = 'Connection Error';
        text = 'Please check your internet connection and try again.';
    } else if (amountInput.value.trim() === '' || amountInput.value <= 0) {
        title = 'Invalid amount';
        text = 'Please enter a valid amount to proceed.';
    } else if (!currencies.hasOwnProperty(convertFromCurrency)) {
        title = 'Currency not selected';
        text = 'Please select the source currency from the list to proceed.';
    } else if (!currencies.hasOwnProperty(convertToCurrency)) {
        title = 'Currency not selected';
        text = 'Please select the target currency from the list to proceed.';
    } else {
        spinner.style.display = "none";
        fromExchangeRate = currencies[convertFromCurrency];
        toExchangeRate = currencies[convertToCurrency];
        getValue(parseFloat(amountInput.value), fromExchangeRate, toExchangeRate);
    }

    if (title && text) {
        spinner.style.display = "none";
        Swal.fire({
            icon: 'error',
            title: title,
            text: text
        });
    }
});

convertFromInput.addEventListener("mousedown", (event) =>{
    event.preventDefault();
    convertFromInput.value = "";
    const options = fromDataList.querySelectorAll('option');
    options.forEach(option => {
        option.style.display = 'block';
    });
    convertFromInput.focus();
});

convertToInput.addEventListener("mousedown", (event) =>{
    event.preventDefault();
    convertToInput.value = "";
    const options = toDataList.querySelectorAll('option');
    options.forEach(option => {
        option.style.display = 'block';
    });
    convertToInput.focus();
});

function getValue(amount, fromExchangeRate, toExchangeRate) {
    if (amount <= 0 || isNaN(amount) || isNaN(fromExchangeRate) || isNaN(toExchangeRate)) {
        convertedAmount = 0;
    } else {
        convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
    }

    const resultText = `${convertedAmount.toFixed(2)} ${convertToCurrency}`;
    document.getElementById("result").value = resultText;
}

getCurrencies();

var typed = new Typed('.footer', {
    strings: ['Generated with ❤️ by Islam Khairy'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 2000,
    loop: true
});

typed.cursor.style.display = 'none';
