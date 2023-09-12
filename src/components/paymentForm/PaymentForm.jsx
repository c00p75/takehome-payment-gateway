import { useState } from 'react';
import { PropTypes } from 'prop-types';
import './paymentForm.css';
import airtelLogo from '../../assets/images/Airtel Money.png'
import mtnLogo from '../../assets/images/MTN.png'
import zamtelLogo from '../../assets/images/Zamtel.jpg'
import visaLogo from '../../assets/images/VISA.png'
import Loader from './Loader';
import PersonalDetailsForm from './PersonalDetailsForm';
import AmountForm from './AmountForm';
import PaymentMethod from './PaymentMethod';
import CheckoutForm from './CheckoutForm';

const PaymentForm = ({showPaymentForm, setShowPaymentForm}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const [localAmount, setLocalAmount] = useState("");
  const [country, setCountry] = useState("country");
  const [currency, setCurrency] = useState("USD");
  const [activeSection, setActiveSection] = useState(1);
  const [paymentmode, setPaymentmode] = useState("");
  const [wallet, setWallet] = useState("");
  const [reference, setReference] = useState("Donation");
  const [paymentStatus, setPaymentStatus] = useState("");
  const baseUrl =  "http://localhost:3001/api/v1/payment";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentStatus("pending");
    setActiveSection(activeSection + 1);

    const formData = {
      firstName,
      lastName,
      email,
      wallet,
      usdAmount,
      localAmount,
      currency,
      paymentmode,
      reference,
    };

    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {    // Check the response status
        console.log('Data was successfully submitted.');  // Data was successfully sent.
        setPaymentStatus("successful")
      } else {
        console.error('Error submitting data:', response.statusText);  // Handle the error response
        setPaymentStatus("successful")
      }
    } catch (error) {
      console.error('An error occurred:', error);  // Handle other errors here
    }
  }


  return (
    <div className={`form-container flex-center ${showPaymentForm ? '' : 'non-visible'}`}>
      <div className="payment-form">
        <div className="form-section-container">        
          <PersonalDetailsForm
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
          />

          <AmountForm
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            usdAmount={usdAmount}
            setUsdAmount={setUsdAmount}
            localAmount={localAmount}
            setLocalAmount={setLocalAmount}
            country={country}
            setCountry={setCountry}
            currency={currency}
            setCurrency={setCurrency}
          />
          
          <PaymentMethod
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setPaymentmode={setPaymentmode}
            visaLogo={visaLogo}
            airtelLogo={airtelLogo}
            mtnLogo={mtnLogo}
            zamtelLogo={zamtelLogo}
          />
          
          <CheckoutForm
            activeSection={activeSection}
            paymentmode={paymentmode}
            airtelLogo={airtelLogo}
            mtnLogo={mtnLogo}
            zamtelLogo={zamtelLogo}
            reference={reference}
            setReference={setReference}
            wallet={wallet}
            setWallet={setWallet}
            currency={currency}
            localAmount={localAmount}
            handleSubmit={handleSubmit}
          />
          

          <div className={`form-section payment-status flex-center-col slide-right-to-left ${activeSection == 5 ? "active" : ""} `}>
            <div className="flex-center">
              {paymentStatus == "successful" && (<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 20 20"><path fill="green" d="M10 20a10 10 0 0 1 0-20a10 10 0 1 1 0 20Zm-2-5l9-8.5L15.5 5L8 12L4.5 8.5L3 10l5 5Z"></path></svg>)}
              {paymentStatus == "failed" && (<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="red" d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A.999.999 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467L12.884 2.532zM13 18h-2v-2h2v2zm-2-4V9h2l.001 5H11z"></path></svg>)}
            </div>

            <div className="payment-info flex-center">
              {paymentStatus === "successful" && ("Transaction Successful!")}
              {paymentStatus === "failed" && ("Transaction Failed!")}
            </div>
          </div>
        </div>

        <button type="button" className="close-form-btn" onClick={() => setShowPaymentForm(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32"><path fill="black" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z" /></svg>
        </button>
        {activeSection > 1 && (
          <button type="button" className="back-form-btn" onClick={() => setActiveSection(activeSection - 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
              <path fill="black" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.425 12q0-.2.063-.375T4.7 11.3l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12q0 .425-.288.713T19 13H7.825Z"></path>
            </svg>
        </button>
        )}

        {paymentStatus === "pending" && (<Loader />)}
      </div>
    </div>
  );
};

PaymentForm.propTypes = {
  showPaymentForm: PropTypes.bool.isRequired,
  setShowPaymentForm: PropTypes.func.isRequired,
};

export default PaymentForm;
