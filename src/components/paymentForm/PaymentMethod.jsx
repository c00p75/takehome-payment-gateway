import { PropTypes } from 'prop-types';

const PaymentMethod = ({
  activeSection,
  setActiveSection,
  setPaymentmode,
  visaLogo,
  airtelLogo,
  mtnLogo,
  zamtelLogo,
}) => {
  return (
    <form
      className={`form-section slide-right-to-left ${activeSection == 3 ? "active" : ""} ${activeSection > 3 ? "slide-left-to-right" : ""}`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="payment-option">
        <span className="payment-info flex-center">SELECT PAYMENT METHOD</span>
        <div className="flex-center-col">
          <div className="flex-center-col payment-method">
            <div className="main visa-card-main">
              <div className="card">
                <button onClick={() => {setPaymentmode("visa"); setActiveSection(activeSection + 1)}} type="button" className="visa-btn">
                  <img src={visaLogo} alt="Visa" className="mobile-money-icon visa" />
                </button>
              </div>
              <p className="text payment-type-heading">Card</p>
              <div className="main_back" />
            </div>
          </div>
          <div className="flex-center-col payment-method">
            <div className="main">
              <div className="card">
                <button onClick={() => {setPaymentmode("airtel"); setActiveSection(activeSection + 1)}} type="button" className="aitel-btn"><img src={airtelLogo} alt="airtel money" className="mobile-money-icon airtel"/></button>
              </div>
              <div className="card">
                <button onClick={() => {setPaymentmode("mtn"); setActiveSection(activeSection + 1)}} type="button" className="mtn-btn"><img src={mtnLogo} alt="mtn money" className="mobile-money-icon"/></button>
              </div>
              <div className="card">
                <button onClick={() => {setPaymentmode("zamtel"); setActiveSection(activeSection + 1)}} type="button" className="zamtel-btn"><img src={zamtelLogo} alt="zamtel money" className="mobile-money-icon zamtel"/></button>
              </div>
              <p className="text payment-type-heading">Mobile Money</p>
              <div className="main_back" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

PaymentMethod.propTypes = {
  activeSection: PropTypes.number.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  setPaymentmode: PropTypes.func.isRequired,
  visaLogo: PropTypes.string.isRequired,
  airtelLogo: PropTypes.string.isRequired,
  mtnLogo: PropTypes.string.isRequired,
  zamtelLogo: PropTypes.string.isRequired, 
};

export default PaymentMethod;
