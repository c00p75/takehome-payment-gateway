import bg from '../../assets/images/school_children.jpg';
import Nav from '../nav/Nav';
import './banner.css';

const Banner = () => {
  return (
    <section id="banner-container">
      <Nav />
      <div id="banner" className="flex-center">
        <h1>Support Education: Empower the Future</h1>
        <p> At <strong>FutureEd Foundation</strong>, we believe that education is the key to unlocking limitless potential and building a
          brighter future for all. We are dedicated to providing quality education and learning opportunities to
          individualsfrom all walks of life, regardless of their background or circumstances. Your support can make
          a profound difference in the lives of countless learners. Join us in our mission to empower the next
          generation through education.
        </p>
      </div>
      <div className="bg-img-container">
        <img src={bg} alt="background-img" className="bg-img" />
        <span className="bg-img-overlay" />
    </div>
    </section>
  );
};

export default Banner;
