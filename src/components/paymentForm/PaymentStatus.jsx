import { PropTypes } from 'prop-types';

const PaymentStatus = ({activeSection, paymentStatus, paymentStatusError}) => {
  return (
    <div className={`form-section payment-status flex-center-col slide-right-to-left ${activeSection == 5 ? "active" : ""} `}>
      <div className="flex-center">
        {paymentStatus == "successful" && (<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="green" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20Zm-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10l5 5Z"></path></svg>)}
        {paymentStatus == "failed" && (<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="red" d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path></svg>)}
      </div>

      <div className="payment-info flex-center">
        {paymentStatus === "successful" && ("Transaction Successful!")}
        {paymentStatus === "failed" && ("Transaction Failed!")}
      </div>
      {paymentStatus === "failed" && (<p>{paymentStatusError}</p>)}
    </div>
  )
}

PaymentStatus.propTypes = {
  activeSection: PropTypes.number.isRequired,
  paymentStatus: PropTypes.string.isRequired,
  paymentStatusError: PropTypes.string.isRequired,  
};


export default PaymentStatus