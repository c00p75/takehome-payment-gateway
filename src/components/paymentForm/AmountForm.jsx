import { useState } from "react";
import { PropTypes } from 'prop-types';
import CountryDropdown from "./CountryDropdown";
import { fetchCurrencyData } from "../../modules/currencyConversion";

const AmountForm = ({
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

  const countryCurrency = async(country) => {
    const { countryCurrency, currencyToUsdRate } = await fetchCurrencyData(country);
    setCurrency(countryCurrency);
    setUsdExchangeRate(currencyToUsdRate);
    setCountry(country);
    if (usdAmount) { setLocalAmount(parseFloat(usdAmount) * currencyToUsdRate.toLocaleString('en-US'))}
  }

  return (
    <form
      className={`form-section currency-form form-section-2 slide-right-to-left flex-center-col ${activeSection == 2 ? "active" : ""} ${activeSection > 2 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <div className="payment-option">
          <span className="payment-info">Enter Amount ($)</span>
          <input required type="number" onChange={(e) => {setUsdAmount(e.target.value); setLocalAmount(parseFloat(e.target.value) * usdExchangeRate)}} value={usdAmount} name="usdAmount" placeholder="USD($)" />
        </div>
        <div className="payment-option">
          <div className="country-dropdown-container">
            <span className="payment-info">Local Currency</span>
            (<CountryDropdown countryCurrency={countryCurrency} country={country} />)
          </div>
          <input required type="text" value={localAmount ? `(${currency}) ${localAmount.toFixed(2).toLocaleString('en-us')}` : ""} name="currency" disabled placeholder={currency} />
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

AmountForm.propTypes = {
  activeSection: PropTypes.number.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  usdAmount: PropTypes.number.isRequired,
  setUsdAmount: PropTypes.func.isRequired,
  localAmount: PropTypes.number.isRequired,
  setLocalAmount: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired, 
};

export default AmountForm;
