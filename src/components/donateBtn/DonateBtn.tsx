import './donateBtn.css';
import PropTypes from 'prop-types';
import { ShowPaymentFormProps } from "../../constants/types.ts";

const DonateBtn: React.FC <ShowPaymentFormProps> = ({showPaymentForm, setShowForm}) => {
  return (
    <div className={`donate-btn flex-center ${showPaymentForm ? 'non-visible' : ''}`}>
      <button onClick={() => setShowForm(true)}>DONATE NOW</button>
    </div>
  );
};

DonateBtn.propTypes = {
  showPaymentForm: PropTypes.bool.isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default DonateBtn;
