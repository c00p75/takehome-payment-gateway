import './donateBtn.css';
import { PropTypes } from 'prop-types';

const DonateBtn = ({showPaymentForm, setShowPaymentForm}) => {
  return (
    <div className={`donate-btn flex-center ${showPaymentForm ? 'non-visible' : ''}`}>
      <button onClick={() => setShowPaymentForm(true)}>DONATE NOW</button>
    </div>
  );
};

DonateBtn.propTypes = {
  showPaymentForm: PropTypes.bool.isRequired,
  setShowPaymentForm: PropTypes.func.isRequired,
};

export default DonateBtn;
