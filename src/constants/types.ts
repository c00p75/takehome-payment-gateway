export interface ShowPaymentFormProps {
  showPaymentForm: boolean;
  setShowForm: (value: boolean) => void;
}

export interface PaymentFormProps {
  activeSection?: number;
  setActiveSection:(value: number) => void;
  firstName?: string;
  setFirstName?:(value: string) => void;
  lastName?: string;
  setLastName?:(value: string) => void;
  email?: string;
  setEmail?:(value: string) => void;
  paymentmode?: string;
  airtelLogo?: string;
  mtnLogo?: string;
  zamtelLogo?: string;
  reference?: string;
  setReference?:(value: string) => void;
  wallet?: string;
  setWallet?:(value: string) => void;
  currency?: string;
  usdAmount?: string;
  localAmount?: string;
  handleSubmit?: string;
  visaLogo?: string;
  setPayPalStatus?:(value: (boolean | string)[]) => void;
  payPalId?: string;
}
