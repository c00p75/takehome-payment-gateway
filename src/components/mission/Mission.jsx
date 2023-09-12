import { PropTypes } from 'prop-types';
import pupil from '../../assets/images/child-learning.jpg';
import DonateBtn from '../donateBtn/DonateBtn';
import './mission.css';

const Mission = ({showPaymentForm, setShowPaymentForm}) => {
  return (
    <div className="mission-container">
      <div className="mission flex-center">
        <div className="mission-info-1 flex-center">
          <h2>Why Donate to Our Education Program?</h2>
          <div className="flex-center">
            <p><strong>Transform Lives: </strong><span>Education has the power to transform lives, breaking the cycle of poverty and opening doors to new opportunities.</span></p>
            <p><strong>Equal Access: </strong><span>We are committed to ensuring that education is accessible to everyone, regardless of their socio-economic status or geographic location.</span></p>
            <p><strong>Quality Education: </strong><span>Your donations support innovative teaching methods, learning resources, and skilled educators who inspire and nurture a love for learning.</span></p>
            <p><strong>Empowerment: </strong><span>Education empowers individuals to make informed decisions, fosters critical thinking, and equips them with skills to succeed in the modern world.</span></p>
            <p><strong>Community Impact: </strong><span> By contributing to our education program, you are investing in stronger, more informed communities that can drive positive change.</span></p>
          </div>
        </div>
        <div className="mission-img">
          <img src={pupil} alt="school pupil" />
        </div>
      </div>
      <div className="mission flex-center">
        <div className="mission-info-2">
          <h2>Ways to Support</h2>
          <div className="mission-card-container flex-center">
            <div className="mission-card">
              <strong>One-Time Donation</strong>
              <span>
                Make a single, impactful donation to support our ongoing education initiatives.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
            <div className="mission-card">
              <strong>Monthly Giving</strong>
              <span>
                Join our community of monthly donors to provide consistent, reliable support for our programs.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
            <div className="mission-card">
              <strong>Sponsor a Student</strong>
              <span>
                Offer a scholarship or sponsorship to a deserving student, giving them the gift of education.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
            <div className="mission-card">
              <strong>In-Kind Donations</strong>
              <span>
                Contribute educational materials, books, or equipment to enhance the learning experience.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
            <div className="mission-card">
              <strong>Volunteer</strong>
              <span>
                Share your knowledge and expertise as a volunteer tutor or mentor.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
            <div className="mission-card">
              <strong>Corporate Partnerships</strong>
              <span>
                Explore partnership opportunities for your organization to invest in education and give back to the community.
                <DonateBtn setShowPaymentForm={setShowPaymentForm} showPaymentForm={showPaymentForm} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Mission.propTypes = {
  showPaymentForm: PropTypes.bool.isRequired,
  setShowPaymentForm: PropTypes.func.isRequired,
};


export default Mission;
