import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PropTypes } from 'prop-types';

const PayPalCheckoutBtn = ({usdAmount, setPayPalStatus, payPalId}) => {
  const id = payPalId;
  const handleApprove = () => {
    setPayPalStatus(true);
    document.querySelector('#checkout-form').submit();
  };
  return (
    <>
      {id && (
        <PayPalScriptProvider options={{ "client-id": id}}>
          <PayPalButtons
            style={{color: "silver"}}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  description: 'FutureEd Donation',
                    amount: { value: usdAmount }
                }]
              })
            }}
            onApprove={async(data, actions) => {
              const order = await actions.order.capture;
              console.log("Order: ", order)
              handleApprove();
            }}
            onError={(error) => {
              alert(error);
              setPayPalStatus(false);
            }}
          />
        </PayPalScriptProvider>
      )}
    </>
  )
}

PayPalCheckoutBtn.propTypes = {
  usdAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setPayPalStatus: PropTypes.func.isRequired,
  payPalId: PropTypes.string.isRequired,
};

export default PayPalCheckoutBtn