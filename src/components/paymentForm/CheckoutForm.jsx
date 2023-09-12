import { PropTypes } from 'prop-types';

const CheckoutForm = ({
  activeSection,
  paymentmode,
  airtelLogo,
  mtnLogo,
  zamtelLogo,
  reference,
  setReference,
  wallet,
  setWallet,
  currency,
  localAmount,
  handleSubmit,
}) => {
  
  return (
    <form
      className={`form-section slide-right-to-left ${activeSection == 4 ? "active" : ""} ${activeSection == 5 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      {(paymentmode == "airtel" || paymentmode == "mtn" || paymentmode == "zamtel") && (
        <div className="payment-option">
          <span className="flex-center slected-paymaent-logo">
            {paymentmode == "airtel" && (<img src={airtelLogo} alt="airtel money" className="mobile-money-icon airtel" />)}
            {paymentmode == "mtn" && (<img src={mtnLogo} alt="mtn money" className="mobile-money-icon mtn" />)}
            {paymentmode == "zamtel" && (<img src={zamtelLogo} alt="zamtel money" className="mobile-money-icon zamtel"/>)}
          </span>
          <div>
            <span className="payment-info">Enter number</span>
            <div className="payment-option-input">
              <span>(+260)</span>
              <input required type="text" onChange={(e) => setWallet(e.target.value)} value={wallet} name="wallet number"placeholder={paymentmode === "airtel" ? "974549983" : (paymentmode === "mtn" ? "966072500" : "955966226")}/>
            </div>
            
            <span className="payment-info">Amount</span>
            <input required type="text" value={`(${currency}) ${localAmount.toFixed(2)}`} name="reference" disabled placeholder="Reference" />

            <span className="payment-info">Reference</span>
            <input required type="text" onChange={(e) => setReference(e.target.value)} value={reference} name="reference" placeholder="Reference" />
          </div>
        </div>
      )}
      
      <div className="form-btn-container">
        <button type="submit" className="choose-btn-2">Pay Now</button>
      </div>
    </form>
  );
};

CheckoutForm.propTypes = {
  activeSection: PropTypes.number.isRequired,
  visaLogo: PropTypes.string.isRequired,
  airtelLogo: PropTypes.string.isRequired,
  mtnLogo: PropTypes.string.isRequired,
  zamtelLogo: PropTypes.string.isRequired,
  paymentmode: PropTypes.string.isRequired,
  reference: PropTypes.string.isRequired,
  setReference: PropTypes.func.isRequired,
  wallet: PropTypes.string.isRequired,
  setWallet: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  localAmount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default CheckoutForm;
