import './metrics.css';

const Metrics = () => {
  return (
    <div className="metrics-container">
      <div className="metrics-card flex-center">
        <span>Enrollments </span>
        <span>400+</span>
        <a href="#">Learn More</a>
      </div>
      <div className="metrics-card flex-center">
        <span>Attenendance</span>
        <span>93%</span>
        <a href="#">Learn More</a>
      </div>
      <div className="metrics-card flex-center">
        <span>Schools</span>
        <span>50+</span>
        <a href="#">Learn More</a>
      </div>
    </div>
  );
};

export default Metrics;
