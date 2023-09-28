import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalCheckoutBtnProps } from "../../constants/types.ts";

const PayPalCheckoutBtn: React.FC <PayPalCheckoutBtnProps> = ({usdAmount, setPayPalStatus, payPalId}) => {
  const id:string|undefined = payPalId;
  const handleApprove = () => {
    setPayPalStatus(true);
    const checkoutForm = document.querySelector('#checkout-form') as HTMLFormElement;
    if(checkoutForm){checkoutForm.submit();}
  };
  return (
    <>
      {id && (
        <PayPalScriptProvider options={{clientId: id}}>
          <PayPalButtons
            style={{color: "silver"}}
            createOrder={(_, actions) => {
              return actions.order.create({
                purchase_units: [{
                  description: 'FutureEd Donation',
                    amount: { value: usdAmount || '0' }
                }],
              })
            }}
            onApprove={async(_, actions) => {
              if (actions.order) {
                const order = await actions.order.capture();
                console.log("Order: ", order);
              }
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
  );
};

export default PayPalCheckoutBtn;
