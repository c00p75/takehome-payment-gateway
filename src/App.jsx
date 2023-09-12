import { useState } from "react"
import './index.css'
import Banner from "./components/banner/Banner"
import DonateBtn from "./components/donateBtn/DonateBtn";
import Metrics from "./components/metrics/Metrics";
import Footer from "./components/footer/Footer";
import Mission from "./components/mission/Mission";
import PaymentForm from "./components/paymentForm/PaymentForm";


const App = () => {
  const [showPaymentForm, setShowForm] = useState(false);
  const setShowPaymentForm = (bool) => {
    const body = document.querySelector('body');
    if (bool) { body.style.overflow = 'hidden';}
    else {body.style.overflow = 'auto';}
    setShowForm(bool);
  }

  return (
    <div id="app">
      <Banner />
      <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
      <Metrics />
      <Mission setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
      <PaymentForm setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
      <Footer />
    </div>
  )
}

export default App