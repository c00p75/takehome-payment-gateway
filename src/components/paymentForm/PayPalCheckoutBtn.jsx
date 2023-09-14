import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalCheckoutBtn = () => {
  const id = "AVSU4y6mlkdcv6_XHT4DpZ-XivLGkNL4Vmzh-KykJrlJ9CKTBlc-R1qKA7ZsB4rfRVigXxJsQwIhkhN-"
  console.log(id);
  return (
    <PayPalScriptProvider options={{ "client-id": id}}>
      <PayPalButtons />
    </PayPalScriptProvider>
  )
}

export default PayPalCheckoutBtn