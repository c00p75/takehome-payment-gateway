import PayPalCheckoutBtn from './PayPalCheckoutBtn';
import { CheckoutFormProps } from "../../constants/types.ts";

const CheckoutForm: React.FC <CheckoutFormProps> = ({
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
  usdAmount,
  handleSubmit,
  visaLogo,
  setPayPalStatus,
  payPalId,
}) => {
  return (
    <form
      className={`form-section slide-right-to-left ${activeSection == 4 ? "active" : ""} ${activeSection == 5 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => handleSubmit(e)}
      id='checkout-form'
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
            <div className="payment-option-input" style={{padding:"0"}}>
              <span style={{paddingLeft: "0.5em"}}>(+260)</span>
              <input
                required
                type="text"
                maxLength={9}
                onChange={(e) => setWallet(e.target.value)}
                value={wallet}
                name="wallet number"
                placeholder={paymentmode === "airtel" ? "974549983" : (paymentmode === "mtn" ? "966072500" : "955966226")}
                style={{padding: "1rem 0.4rem"}}
              />
            </div>
            
            <span className="payment-info">Amount</span>
            <input required type="text" value={`(${currency}) ${localAmount}`} name="reference" disabled placeholder="Reference" />

            <span className="payment-info">Reference</span>
            <input required type="text" onChange={(e) => setReference(e.target.value)} value={reference} name="reference" placeholder="Reference" />
          </div>
        </div>
      )}

      {paymentmode == "visa" && (
        <div className="payment-option">
          <span className="flex-center slected-paymaent-logo">
            <img src={visaLogo} alt="airtel money" className="mobile-money-icon mtn"/>
          </span>
          <div className="paypal-btn-container">
            <PayPalCheckoutBtn usdAmount={usdAmount} setPayPalStatus={setPayPalStatus} payPalId={payPalId} />
          </div>
        </div>
      )}
      
      <div className="form-btn-container">
        {paymentmode !== "visa" && (<button type="submit" className="choose-btn-2">Pay Now</button>)}
      </div>
    </form>
  );
};

export default CheckoutForm;
