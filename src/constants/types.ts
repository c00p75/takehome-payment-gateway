export interface ShowPaymentFormProps {
  showPaymentForm: boolean;
  setShowForm: (value: boolean) => void;
}

export interface ActiveSectionProps {
  setActiveSection:(value: number) => void;
  activeSection: number;
}

export interface PersonalDetailsFormProps extends ActiveSectionProps {
  firstName: string;
  setFirstName:(value: string) => void;
  lastName: string;
  setLastName:(value: string) => void;
  email: string;
  setEmail:(value: string) => void;
}

export interface PaymentFormProps {
  paymentmode?: string;
  airtelLogo?: string;
  mtnLogo?: string;
  zamtelLogo?: string;
  reference?: string;
  country?: string;
  wallet?: string;
  currency?: string;
  usdAmount?: string;
  localAmount?: string;
  visaLogo?: string;
  payPalId?: string;
  paymentStatusError?: string;
  paymentStatus?: string;
}

export interface AmountFormProps extends ActiveSectionProps, PaymentFormProps {
  setUsdAmount:(value: string) => void;
  setLocalAmount:(value: string) => void;
  setCountry:(value: string) => void;
  setCurrency:(value: string) => void; 
}

export interface CheckoutFormProps extends PaymentFormProps {
  setReference:(value: string) => void;
  setWallet:(value: string) => void;
  setPayPalStatus:(value: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  activeSection: number;
}

export interface CountryDropdownProps extends PaymentFormProps {
  countryCurrency:(value: string) => void;
}

export interface PaymentMethodProps extends ActiveSectionProps, PaymentFormProps {
  setPaymentmode:(value: string) => void;
  setPayPalId:(value: string) => void;
  setPaymentStatus:(value: string) => void;
  setWallet:(value: string) => void;
}

export interface PaymentStatusProps extends PaymentFormProps {
  activeSection: number;
  setPaymentStatus:(value: string) => void;
}

export interface PayPalCheckoutBtnProps extends PaymentFormProps {
  setPayPalStatus:(value: boolean) => void;
}
