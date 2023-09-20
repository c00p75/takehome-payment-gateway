import { useState } from "react";
import CountryDropdown from "./CountryDropdown";
import fetchCurrencyData from "../../modules/currencyConversion";
import { AmountFormProps } from "../../constants/types.ts";

const AmountForm: React.FC <AmountFormProps> = ({
  activeSection,
  setActiveSection,
  usdAmount,
  setUsdAmount,
  localAmount,
  setLocalAmount,
  country,
  setCountry,
  currency,
  setCurrency, 
}) => {
  const [usdExchangeRate, setUsdExchangeRate] = useState(1);
  const [fetchCurrencyState, setFetchCurrencyState] = useState<boolean | string>(false);


  // fetching currency data from api and assigning the returned value to appropriate variables
  const countryCurrency = async(country: string) => {
    setCountry(country);                                               // Set selected country
    setFetchCurrencyState("pending");
    const { countryCurrency, currencyToUsdRate, status } = await fetchCurrencyData(country);
    if (status){ setFetchCurrencyState(status); }                // set fetch currency call status
    if (countryCurrency){ setCurrency(countryCurrency); }        // Set local currency name
    if (currencyToUsdRate){ setUsdExchangeRate(currencyToUsdRate); }   // Set usd to local currency echange rate
    // Compute local currency based on exchange rate.
    if (usdAmount && currencyToUsdRate) {setLocalAmount((parseFloat(usdAmount) * currencyToUsdRate).toLocaleString())}
  }

  return (
    <form
      className={`form-section currency-form form-section-2 slide-right-to-left flex-center-col ${activeSection == 2 ? "active" : ""} ${activeSection > 2 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => e.preventDefault()}
      id="amount-form"    >
      <div>
        <div className="payment-option">
          <span className="payment-info">Enter Amount ($)</span>
          <input required type="number" onChange={(e) => {setUsdAmount(e.target.value); setLocalAmount((parseFloat(e.target.value) * usdExchangeRate).toLocaleString())}} value={usdAmount} name="usdAmount" placeholder="USD($)" />
        </div>
        <div className="payment-option">
          <div className="country-dropdown-container">
            <span className="payment-info">Local Currency</span>
            (<CountryDropdown countryCurrency={countryCurrency} country={country} />)
          </div>
          <input 
            required
            type="text"
            value={ localAmount && fetchCurrencyState == true ? `(${currency}) ${localAmount}` : "" }
            name="amount" 
            disabled
            placeholder={fetchCurrencyState == "pending" ? "converting.." : currency}
            style={{cursor: "not-allowed"}}
          />
        </div>
      </div>

      <div>
        <div className="form-btn-container">
          <button type="submit" className="choose-btn" onClick={() => { if (localAmount && usdAmount) {setActiveSection(activeSection + 1)} }}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};


export default AmountForm;
