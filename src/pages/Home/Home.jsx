import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-tag">DIGITAL COMPLAINT MANAGEMENT</span>

          <h1>
            Report Your Complaint.
            <br />
            <span>Track Its Progress.</span>
          </h1>

          <p>
            A simple and transparent platform to register complaints,
            monitor their status, and get them resolved efficiently.
          </p>

          <div className="hero-buttons">
            <a href="/register" className="primary-btn">
              Register Complaint
            </a>

            <a href="/login" className="secondary-btn">
              Login
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>
          <h2>Simple. Transparent. Trackable.</h2>
          <p>
            Submit your complaint and follow its progress until resolution.
          </p>
        </div>

        <div className="steps-container">

          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Register</h3>
            <p>
              Create your account using your basic information.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3>Submit Complaint</h3>
            <p>
              Provide the complaint title, category, description and priority.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Track Progress</h3>
            <p>
              Monitor your complaint status and administrator remarks.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">04</div>
            <h3>Get Resolution</h3>
            <p>
              Receive updates as your complaint moves toward resolution.
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>FEATURES</span>
          <h2>Everything in One Place</h2>
        </div>

        <div className="features-container">

          <div className="feature-card">
            <h3>Easy Complaint Registration</h3>
            <p>
              Submit complaints through a simple and organized form.
            </p>
          </div>

          <div className="feature-card">
            <h3>Complaint Tracking</h3>
            <p>
              Track your complaint from submission to resolution.
            </p>
          </div>

          <div className="feature-card">
            <h3>Status Updates</h3>
            <p>
              Know whether your complaint is pending, in-progress or resolved.
            </p>
          </div>

          <div className="feature-card">
            <h3>Admin Management</h3>
            <p>
              Administrators can manage complaints and add remarks.
            </p>
          </div>

        </div>
      </section>
      <Footer />

    </div>
  );
}

export default Home;