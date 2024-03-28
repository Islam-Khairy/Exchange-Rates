let convertFromInput = document.getElementById('from');
let convertToInput = document.getElementById('to');
let fromDataList = document.getElementById('fromCurrencies');
let toDataList = document.getElementById('toCurrencies');
let amountInput = document.getElementById('amount');
let spinner = document.getElementById('spinner');
let convertedAmount = 0;
let isFirstTime = true;
let convertFromCurrency;
let convertToCurrency;
let currencies;
let lastInputValue = '';

const countries = [
  { code: 'USD', name: 'United States' },
  { code: 'AED', name: 'United Arab Emirates' },
  { code: 'AFN', name: 'Afghanistan' },
  { code: 'ALL', name: 'Albania' },
  { code: 'AMD', name: 'Armenia' },
  { code: 'ANG', name: 'Netherlands Antilles' },
  { code: 'AOA', name: 'Angola' },
  { code: 'ARS', name: 'Argentina' },
  { code: 'AUD', name: 'Australia' },
  { code: 'AWG', name: 'Aruba' },
  { code: 'AZN', name: 'Azerbaijan' },
  { code: 'BAM', name: 'Bosnia and Herzegovina' },
  { code: 'BBD', name: 'Barbados' },
  { code: 'BDT', name: 'Bangladesh' },
  { code: 'BGN', name: 'Bulgaria' },
  { code: 'BHD', name: 'Bahrain' },
  { code: 'BIF', name: 'Burundi' },
  { code: 'BMD', name: 'Bermuda' },
  { code: 'BND', name: 'Brunei' },
  { code: 'BOB', name: 'Bolivia' },
  { code: 'BRL', name: 'Brazil' },
  { code: 'BSD', name: 'Bahamas' },
  { code: 'BTN', name: 'Bhutan' },
  { code: 'BWP', name: 'Botswana' },
  { code: 'BYN', name: 'Belarus' },
  { code: 'BZD', name: 'Belize' },
  { code: 'CAD', name: 'Canada' },
  { code: 'CDF', name: 'Democratic Republic of the Congo' },
  { code: 'CHF', name: 'Switzerland' },
  { code: 'CLP', name: 'Chile' },
  { code: 'CNY', name: 'China' },
  { code: 'COP', name: 'Colombia' },
  { code: 'CRC', name: 'Costa Rica' },
  { code: 'CUP', name: 'Cuba' },
  { code: 'CVE', name: 'Cape Verde' },
  { code: 'CZK', name: 'Czech Republic' },
  { code: 'DJF', name: 'Djibouti' },
  { code: 'DKK', name: 'Denmark' },
  { code: 'DOP', name: 'Dominican Republic' },
  { code: 'DZD', name: 'Algeria' },
  { code: 'EGP', name: 'Egypt' },
  { code: 'ERN', name: 'Eritrea' },
  { code: 'ETB', name: 'Ethiopia' },
  { code: 'EUR', name: 'European Union' },
  { code: 'FJD', name: 'Fiji' },
  { code: 'FKP', name: 'Falkland Islands' },
  { code: 'GBP', name: 'United Kingdom' },
  { code: 'GEL', name: 'Georgia' },
  { code: 'GGP', name: 'Guernsey' },
  { code: 'GHS', name: 'Ghana' },
  { code: 'GIP', name: 'Gibraltar' },
  { code: 'GMD', name: 'The Gambia' },
  { code: 'GNF', name: 'Guinea' },
  { code: 'GTQ', name: 'Guatemala' },
  { code: 'GYD', name: 'Guyana' },
  { code: 'HKD', name: 'Hong Kong' },
  { code: 'HNL', name: 'Honduras' },
  { code: 'HRK', name: 'Croatia' },
  { code: 'HTG', name: 'Haiti' },
  { code: 'HUF', name: 'Hungary' },
  { code: 'IDR', name: 'Indonesia' },
  { code: 'ILS', name: 'Palestine' },
  { code: 'IMP', name: 'Isle of Man' },
  { code: 'INR', name: 'India' },
  { code: 'IQD', name: 'Iraq' },
  { code: 'IRR', name: 'Iran' },
  { code: 'ISK', name: 'Iceland' },
  { code: 'JEP', name: 'Jersey' },
  { code: 'JMD', name: 'Jamaica' },
  { code: 'JOD', name: 'Jordan' },
  { code: 'JPY', name: 'Japan' },
  { code: 'KES', name: 'Kenya' },
  { code: 'KGS', name: 'Kyrgyzstan' },
  { code: 'KHR', name: 'Cambodia' },
  { code: 'KID', name: 'Kiribati' },
  { code: 'KMF', name: 'Comoros' },
  { code: 'KRW', name: 'South Korea' },
  { code: 'KWD', name: 'Kuwait' },
  { code: 'KYD', name: 'Cayman Islands' },
  { code: 'KZT', name: 'Kazakhstan' },
  { code: 'LAK', name: 'Laos' },
  { code: 'LBP', name: 'Lebanon' },
  { code: 'LKR', name: 'Sri Lanka' },
  { code: 'LRD', name: 'Liberia' },
  { code: 'LSL', name: 'Lesotho' },
  { code: 'LYD', name: 'Libya' },
  { code: 'MAD', name: 'Morocco' },
  { code: 'MDL', name: 'Moldova' },
  { code: 'MGA', name: 'Madagascar' },
  { code: 'MKD', name: 'Macedonia' },
  { code: 'MMK', name: 'Myanmar' },
  { code: 'MNT', name: 'Mongolia' },
  { code: 'MOP', name: 'Macau' },
  { code: 'MRU', name: 'Mauritania' },
  { code: 'MUR', name: 'Mauritius' },
  { code: 'MVR', name: 'Maldives' },
  { code: 'MWK', name: 'Malawi' },
  { code: 'MXN', name: 'Mexico' },
  { code: 'MYR', name: 'Malaysia' },
  { code: 'MZN', name: 'Mozambique' },
  { code: 'NAD', name: 'Namibia' },
  { code: 'NGN', name: 'Nigeria' },
  { code: 'NIO', name: 'Nicaragua' },
  { code: 'NOK', name: 'Norway' },
  { code: 'NPR', name: 'Nepal' },
  { code: 'NZD', name: 'New Zealand' },
  { code: 'OMR', name: 'Oman' },
  { code: 'PAB', name: 'Panama' },
  { code: 'PEN', name: 'Peru' },
  { code: 'PGK', name: 'Papua New Guinea' },
  { code: 'PHP', name: 'Philippines' },
  { code: 'PKR', name: 'Pakistan' },
  { code: 'PLN', name: 'Poland' },
  { code: 'PYG', name: 'Paraguay' },
  { code: 'QAR', name: 'Qatar' },
  { code: 'RON', name: 'Romania' },
  { code: 'RSD', name: 'Serbia' },
  { code: 'RUB', name: 'Russia' },
  { code: 'RWF', name: 'Rwanda' },
  { code: 'SAR', name: 'Saudi Arabia' },
  { code: 'SBD', name: 'Solomon Islands' },
  { code: 'SCR', name: 'Seychelles' },
  { code: 'SDG', name: 'Sudan' },
  { code: 'SEK', name: 'Sweden' },
  { code: 'SGD', name: 'Singapore' },
  { code: 'SHP', name: 'Saint Helena' },
  { code: 'SLE', name: 'Sierra Leone' },
  { code: 'SLL', name: 'Sierra Leone' },
  { code: 'SOS', name: 'Somalia' },
  { code: 'SRD', name: 'Suriname' },
  { code: 'SSP', name: 'South Sudan' },
  { code: 'STN', name: 'Sao Tome and Principe' },
  { code: 'SYP', name: 'Syria' },
  { code: 'SZL', name: 'Eswatini' },
  { code: 'THB', name: 'Thailand' },
  { code: 'TJS', name: 'Tajikistan' },
  { code: 'TMT', name: 'Turkmenistan' },
  { code: 'TND', name: 'Tunisia' },
  { code: 'TOP', name: 'Tonga' },
  { code: 'TRY', name: 'Turkey' },
  { code: 'TTD', name: 'Trinidad and Tobago' },
  { code: 'TVD', name: 'Tuvalu' },
  { code: 'TWD', name: 'Taiwan' },
  { code: 'TZS', name: 'Tanzania' },
  { code: 'UAH', name: 'Ukraine' },
  { code: 'UGX', name: 'Uganda' },
  { code: 'UYU', name: 'Uruguay' },
  { code: 'UZS', name: 'Uzbekistan' },
  { code: 'VES', name: 'Venezuela' },
  { code: 'VND', name: 'Vietnam' },
  { code: 'VUV', name: 'Vanuatu' },
  { code: 'WST', name: 'Samoa' },
  { code: 'XAF', name: 'Central African Republic' },
  { code: 'XCD', name: 'East Caribbean' },
  { code: 'XDR', name: 'International Monetary Fund' },
  { code: 'XOF', name: 'West African Economic and Monetary Union' },
  { code: 'XPF', name: 'French Polynesia' },
  { code: 'YER', name: 'Yemen' },
  { code: 'ZAR', name: 'South Africa' },
  { code: 'ZMW', name: 'Zambia' },
  { code: 'ZWL', name: 'Zimbabwe' },
];

countries.sort((a, b) => a.name.localeCompare(b.name));

async function getCurrencies() {
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/baa3a9e2509c9b674a3486a2/latest/usd?api_key=e62be596`,
    );
    const data = await response.json();
    currencies = data.conversion_rates;

    updateCurrencyOptions();

    if (!isFirstTime) {
      convertFromInput.value = convertFromCurrency;
      convertToInput.value = convertToCurrency;
    }
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

function updateCurrencyOptions() {
  fromDataList.innerHTML = '';
  toDataList.innerHTML = '';

  for (const currencyObj of countries) {
    const currency = currencyObj.code;
    const countryName = currencyObj.name;
    const optionFrom = createOptionElement(currency, countryName);
    const optionTo = createOptionElement(currency, countryName);

    fromDataList.appendChild(optionFrom);
    toDataList.appendChild(optionTo);
  }
}

function createOptionElement(currency, countryName) {
  const option = document.createElement('option');
  option.value = `${countryName} - ${currency}`;
  option.textContent = `${countryName} - ${currency}`;
  return option;
}

function handleDeleteInput(inputField) {
  const inputValue = inputField.value.trim();
  if (inputValue === '') {
    convertFromCurrency = null;
    convertToCurrency = null;
  } else {
    const lastIndex = inputValue.lastIndexOf(' - ');
    if (lastIndex !== -1) {
      inputField.value = inputValue.substring(0, lastIndex - 1);
    }
  }
}

function handleInput(inputField, countryList) {
  const input = inputField.value.toLowerCase();
  const enteredCountry = input.split(' - ')[0].trim();
  const foundCountry = countryList.find((country) => country.name.toLowerCase() === enteredCountry);
  if (foundCountry) {
    inputField.value = `${foundCountry.name} - ${foundCountry.code}`;
    if (inputField === convertFromInput) {
      convertFromCurrency = foundCountry.code;
    } else if (inputField === convertToInput) {
      convertToCurrency = foundCountry.code;
    }
    inputField.dispatchEvent(new Event('change'));
  }
}

function handleEscapeKey(inputField) {
  console.log('Handling Escape key');
  inputField.value = '';
  if (inputField === convertFromInput) {
    convertFromCurrency = null;
  } else if (inputField === convertToInput) {
    convertToCurrency = null;
  }
}

function handleMouseDown(event, inputField, dataList) {
  event.preventDefault();
  inputField.value = '';
  const options = dataList.querySelectorAll('option');
  options.forEach((option) => {
    option.style.display = 'block';
  });
  inputField.focus();
}

function handleInputChange(inputField, event) {
  const keyPressed = event.inputType;

  if (keyPressed === 'deleteContentBackward' || keyPressed === 'deleteContentForward') {
    handleDeleteInput(inputField);
  } else {
    handleInput(inputField, countries);
  }
}

convertFromInput.addEventListener('input', (event) => {
  handleInputChange(convertFromInput, event);
});

convertToInput.addEventListener('input', (event) => {
  handleInputChange(convertToInput, event);
});

convertFromInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    handleEscapeKey(convertFromInput);
  }
});

convertToInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    handleEscapeKey(convertToInput);
  }
});

convertFromInput.addEventListener('mousedown', (event) => {
  handleMouseDown(event, convertFromInput, fromDataList);
});

convertToInput.addEventListener('mousedown', (event) => {
  handleMouseDown(event, convertToInput, toDataList);
});

document.getElementById('convert').addEventListener('click', async (event) => {
  event.preventDefault();
  spinner.style.display = 'block';
  await getCurrencies();
  convertFromCurrency = convertFromInput.value.split(' - ')[1];
  convertToCurrency = convertToInput.value.split(' - ')[1];

  let title, text;
  if (!navigator.onLine) {
    title = 'Connection Error';
    text = 'Please check your internet connection and try again.';
  } else if (!currencies.hasOwnProperty(convertFromCurrency)) {
    title = 'Currency not selected';
    text = 'Please select the source currency from the list to proceed.';
  } else if (!currencies.hasOwnProperty(convertToCurrency)) {
    title = 'Currency not selected';
    text = 'Please select the target currency from the list to proceed.';
  } else if (amountInput.value.trim() === '' || amountInput.value <= 0) {
    title = 'Invalid amount';
    text = 'Please enter a valid amount to proceed.';
  } else {
    spinner.style.display = 'none';
    fromExchangeRate = currencies[convertFromCurrency];
    toExchangeRate = currencies[convertToCurrency];
    getValue(parseFloat(amountInput.value), fromExchangeRate, toExchangeRate);
  }

  if (title && text) {
    spinner.style.display = 'none';
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
});

function getValue(amount, fromExchangeRate, toExchangeRate) {
  let convertedAmount;
  if (amount <= 0 || isNaN(amount) || isNaN(fromExchangeRate) || isNaN(toExchangeRate)) {
    convertedAmount = 0;
  } else {
    convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
    convertedAmount = Math.round(convertedAmount * 100) / 100;
  }

  const formattedAmount = convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const resultText = `${formattedAmount} ${convertToCurrency}`;
  document.getElementById('result').value = resultText;
}

getCurrencies();

var typed = new Typed('.footer', {
  strings: ['Generated with ❤️ by Islam Khairy'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 2000,
  loop: true,
});

typed.cursor.style.display = 'none';
