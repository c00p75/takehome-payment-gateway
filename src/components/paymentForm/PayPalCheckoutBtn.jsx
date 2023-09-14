import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PropTypes } from 'prop-types';

const PayPalCheckoutBtn = ({usdAmount, setPayPalStatus}) => {
  const id = "AVSU4y6mlkdcv6_XHT4DpZ-XivLGkNL4Vmzh-KykJrlJ9CKTBlc-R1qKA7ZsB4rfRVigXxJsQwIhkhN-"
  console.log(id);

  const handleApprove = () => {
    setPayPalStatus(true);
    document.querySelector('#checkout-form').submit();
  };
  return (
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
  )
}

PayPalCheckoutBtn.propTypes = {
  usdAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  setPayPalStatus: PropTypes.func.isRequired,
};

export default PayPalCheckoutBtn