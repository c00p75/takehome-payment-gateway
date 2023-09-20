import { PersonalDetailsFormProps } from "../../constants/types.ts";

const PersonalDetailsForm: React.FC <PersonalDetailsFormProps> = ({
  activeSection,
  setActiveSection,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
}) => {
  return (
    <form 
      className={`form-section slide-left-to-right ${activeSection == 1 ? "active" : ''}`}
      onSubmit={(e) => e.preventDefault()}
      id='personal-details-form'
    >
      <div>
        <div className="header flex-center">
          <span className="logo title">FutureEd<br />Foundation</span>
          <p className="desc">Support Education: Empower the Future</p>
        </div>
        <div className="payment-option">
          <span className="payment-info flex-center">Personal Details</span>
          <input required type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} name="firstName" placeholder="First Name" />
          <input required type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} name="lastName" placeholder="Last Name" />
          <input required type="text" onChange={(e) => setEmail(e.target.value)} value={email} name="email" placeholder="Email Address" />
        </div>
      </div>

      <div>
        <div className="form-btn-container">
          <button type="submit" className="choose-btn" onClick={() => {
            if (firstName && lastName && email) {setActiveSection(activeSection + 1)}
          }}> Next </button>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
