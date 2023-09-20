import { PaymentMethodProps } from "../../constants/types.ts";

const PaymentMethod: React.FC <PaymentMethodProps> = ({
  activeSection,
  setActiveSection,
  visaLogo,
  airtelLogo,
  mtnLogo,
  zamtelLogo,
  setPaymentmode,
  setPayPalId,
  setPaymentStatus,
  setWallet,
}) => {  
  const retrievePaypalId = async () => {
    setPaymentmode("visa");
    setPaymentStatus('pending');
    await fetch('http://localhost:3001/api/v1/payment/paypal-id')
      .then((res) => res.json())
      .then((data) => {
        setPayPalId(data["payPalId"])
      })
      .catch((err) => {
        console.log(err)
      })
      setPaymentStatus('');
  };
  return (
    <form
      className={`form-section slide-right-to-left ${activeSection == 3 ? "active" : ""} ${activeSection > 3 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => e.preventDefault()}
      id="payment-method-form"
    >
      <div className="payment-option">
        <span className="payment-info flex-center">SELECT PAYMENT METHOD</span>
        <div className="flex-center-col">
          <div className="flex-center-col payment-method">
            <p className="text text-sm payment-type-heading">Card</p>
            <div className="main visa-card-main">
              <div className="card">
                <button onClick={() => {retrievePaypalId(); setActiveSection(activeSection + 1)}} type="button" className="visa-btn">
                  <img src={visaLogo} alt="Visa" className="mobile-money-icon visa" />
                </button>
              </div>
              <p className="text payment-type-heading">Card</p>
              <div className="main_back" />
            </div>
          </div>
          <div className="flex-center-col payment-method">
            <p className="text text-sm payment-type-heading">Mobile Money</p>
            <div className="main">
              <div className="card">
                <button
                onClick={() => {
                  setPaymentmode("airtel");
                  setActiveSection(activeSection + 1);
                  setWallet("");
                }} 
                type="button"
                className="aitel-btn"
              >
                <img src={airtelLogo} alt="airtel money" className="mobile-money-icon airtel"/>
              </button>
              </div>
              <div className="card">
                <button
                onClick={() => {
                  setPaymentmode("mtn");
                  setActiveSection(activeSection + 1);
                  setWallet("");
                }} 
                type="button"
                className="mtn-btn"
              >
                <img src={mtnLogo} alt="mtn money" className="mobile-money-icon"/>
              </button>
              </div>
              <div className="card">
                <button
                onClick={() => {
                  setPaymentmode("zamtel");
                  setActiveSection(activeSection + 1);
                  setWallet("");
                }} 
                type="button"
                className="zamtel-btn"
              >
                <img src={zamtelLogo} alt="zamtel money" className="mobile-money-icon zamtel"/>
              </button>
              </div>
              <p className="text payment-type-heading">Mobile Money <br/><i style={{fontSize: "0.8em", letterSpacing: "0.2em", fontWeight: "lighter"}}>(Zambia only)</i> </p>
              <div className="main_back" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentMethod;
