import { useState } from "react"
import './index.css'
import Banner from "./components/banner/Banner"
import DonateBtn from "./components/donateBtn/DonateBtn";
import Metrics from "./components/metrics/Metrics";
import Mission from "./components/mission/Mission";
import Footer from "./components/footer/Footer";

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
      <Mission />
      <Footer />
    </div>
  )
}

export default App