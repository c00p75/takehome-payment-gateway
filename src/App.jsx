import { useEffect, useState } from "react"
import './index.css'
import Banner from "./components/banner/Banner"
import DonateBtn from "./components/donateBtn/DonateBtn";
import Metrics from "./components/metrics/Metrics";
import Footer from "./components/footer/Footer";
import Mission from "./components/mission/Mission";
import PaymentForm from "./components/paymentForm/PaymentForm";


const App = () => {
  const [showPaymentForm, setShowForm] = useState(false);
  const body = document.querySelector('body');
  useEffect(() => {
    if (showPaymentForm) { body.style.overflow = 'hidden';}
    if (!showPaymentForm) {body.style.overflow = 'auto';}
  }, [showPaymentForm]); 

  return (
    <div id="app">
      <Banner />
      <DonateBtn setShowForm={setShowForm} showPaymentForm={showPaymentForm} />
      <Metrics />
      <Mission setShowForm={setShowForm} showPaymentForm={showPaymentForm} />
      {showPaymentForm && (<PaymentForm setShowForm={setShowForm} showPaymentForm={showPaymentForm} />)}
      <Footer />
    </div>
  )
}

export default App