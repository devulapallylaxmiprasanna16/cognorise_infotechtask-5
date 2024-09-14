const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
const apiURL = `https://open.er-api.com/v6/latest/`;

const fromCountry = document.getElementById('fromCountry');
const toCountry = document.getElementById('toCountry');
const convertBtn = document.getElementById('convertBtn');
const result = document.getElementById('result');


const countryCurrencyMap = {
    'United States': 'USD',
    'United Kingdom': 'GBP',
    'Eurozone': 'EUR',
    'India': 'INR',
    'Australia': 'AUD',
    'Canada': 'CAD',
    'Japan': 'JPY',
    'China': 'CNY',
    'Russia': 'RUB',
    'Brazil': 'BRL'
};


function populateCountryDropdown() {
    Object.keys(countryCurrencyMap).forEach(country => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = country;
        option1.textContent = option2.textContent = country;
        fromCountry.appendChild(option1);
        toCountry.appendChild(option2);
    });
}

// Fetch currency rates when user clicks 'Convert'
convertBtn.addEventListener('click', () => {
    const amount = document.getElementById('amount').value;
    const from = countryCurrencyMap[fromCountry.value];
    const to = countryCurrencyMap[toCountry.value];

    if (amount === '' || !from || !to) {
        alert('Please fill in all fields.');
        return;
    }

    fetch(`${apiURL}${from}`)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amount * rate).toFixed(2);
            result.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
        })
        .catch(error => console.log('Error fetching data: ', error));
});

populateCountryDropdown();
