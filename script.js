let convertFrom = document.getElementById("from");
let convertTo = document.getElementById("to");
let amountInput = document.getElementById("amount");
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
    return fetch(`https://api.fastforex.io/fetch-all?api_key=c08c586352-6a9807a75f-s7a3f5`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            currencies = data.results;
            const fromDataList = document.getElementById("fromCurrencies");
            const toDataList = document.getElementById("toCurrencies");

            fromDataList.innerHTML = "";
            toDataList.innerHTML = "";

            for (const currency in currencies) {
                if (currencies.hasOwnProperty(currency)) {
                    const optionFrom = document.createElement("option");
                    const optionTo = document.createElement("option");

                    const countryName = countryNames[currency];
                    optionFrom.value = `${countryName} - ${currency}`;
                    optionTo.value = `${countryName} - ${currency}`;

                    fromDataList.appendChild(optionFrom);
                    toDataList.appendChild(optionTo);
                }
            }

            if (!isFirstTime) {
                convertFrom.value = convertFromCurrency;
                convertTo.value = convertToCurrency;
            }
        })
        .catch(error => {
            console.error('Error fetching currencies:', error);
        });
}


document.getElementById("convert").addEventListener("click", async (event) => {
    await getCurrencies();
    convertFromCurrency = convertFrom.value.split(' - ')[1];
    convertToCurrency = convertTo.value.split(' - ')[1];

    if (
        amountInput.value <= 0 ||
        amountInput.value.trim() === '' ||
        !currencies.hasOwnProperty(convertFromCurrency) ||
        !currencies.hasOwnProperty(convertToCurrency)
    ) {
        Swal.fire({
            title: 'Invalid amount or currency',
            text: 'Enter a valid amount, select the source and target currencies from the list to proceed.',
        });
    } else {
        fromExchangeRate = currencies[convertFromCurrency];
        toExchangeRate = currencies[convertToCurrency];
        getValue(parseFloat(amountInput.value), fromExchangeRate, toExchangeRate);
    }
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
