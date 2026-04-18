import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor In Computer Application</h4>
                <h5>ICIS College, Bankura University</h5>
              </div>
              <h3>2021 – 2024</h3>
            </div>
            <p>
              Completed BCA from ICIS College under Bankura University, building
              a strong foundation in computer fundamentals, data structures, and
              web technologies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Development Certification</h4>
                <h5>oneroadmap</h5>
              </div>
              <h3>Jun 2025</h3>
            </div>
            <p>
              Earned a Frontend Development certification, strengthening skills
              in HTML5, CSS3, JavaScript, and React.js for building modern,
              responsive web applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Masters In Computer Application</h4>
                <h5>Dr. B.C. Roy Engineering College, Durgapur</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Currently pursuing MCA at Dr. B.C. Roy Engineering College,
              deepening expertise in full-stack development, algorithms, and
              software engineering principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
