import { useState } from "react"
import Banner from "./components/banner/Banner"
import DonateBtn from "./components/donateBtn/DonateBtn"

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
    </div>
  )
}

export default App