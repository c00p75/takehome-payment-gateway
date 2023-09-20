const fetchCurrencyData = async (country: string) => {
  let countryCurrency:string = '', currencyToUsdRate, status;
  await fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((res) => res.json())
  .then((json) => {
    countryCurrency = Object.keys(json[0].currencies)[0]
  })
  .catch(error => {                                                      // Handle any errors
    console.error(error);
    status = false;
  });


  const tempAccessKey = "397012be4f747e005d730440024aaf2a"
  // Free currency api that only provides the base currency in euros.
  await fetch(`http://data.fixer.io/api/latest?access_key=${tempAccessKey}`)
  .then((res) => res.json())
  .then((json) => {
    const eurToUsd = 1/json.rates.USD;  // Converte Euro Amount to USD. 1 USD = 1 / 1.20 EUR
    currencyToUsdRate = json.rates[countryCurrency] * eurToUsd;
    status = true;
  })
  .catch(error => {                                                      // Handle any errors
    console.error(error);
    status = false;
  });
  
  return {countryCurrency, currencyToUsdRate, status};
}

export default fetchCurrencyData;
