import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login"; // Login component
import "../App.css";

function Flashcarddisplay() {
  const [flipped, setFlipped] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const flashCard = {
    question: "AI Study Buddy",
    answer:
      "AI Study Buddy is your personal AI-powered study companion. Get flashcards, short notes, and simplified explanations to learn faster and smarter, anytime, anywhere!",
  };

  const handleGenerateClick = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      setShowLogin(true); // show login modal
    } else {
      navigate("/generate"); // directly go to generate page
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    navigate("/generate"); // after login, go to generate page
  };

  return (
    <div className="container text-center py-5 position-relative">
      <div className="animated-background"></div>

      <h1 className="fw-bold display-4 text-primary mb-3 position-relative">
        Welcome to <span className="text-success">AI Study Buddy</span>
      </h1>
      <p className="lead text-muted mb-4 position-relative">
        Your personal AI-powered study partner. Get instant flashcards, short
        notes, and simplified explanations for complex topics. Learn smarter,
        faster, and in a fun way— anytime, anywhere with AI Study Buddy.
      </p>

      <div className="mb-5 position-relative">
        <button
          className="btn btn-primary btn-lg me-3 shadow-sm"
          onClick={handleGenerateClick}
        >
          🚀 Generate Cards
        </button>
        <button className="btn btn-outline-success btn-lg shadow-sm text-light">
          📚 See More
        </button>
      </div>

      <div
        className={`flashcard ${flipped ? "flipped" : ""} mx-auto hover-card`}
        onClick={() => setFlipped(!flipped)}
        style={{ width: "320px", cursor: "pointer", zIndex: 1 }}
      >
        <div className="flashcard-inner">
          <div
            className="flashcard-front d-flex align-items-center justify-content-center p-2"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.10), rgba(0,0,0,0.5)), url('3.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "15px",
              color: "white",
              textShadow: "1px 1px 2px black",
            }}
          >
            <div>
              <h5 className="fw-bold">{flashCard.question}</h5>
              <small className="d-block mt-3">
                <i className="fas fa-mouse-pointer me-1"></i>Click to reveal
                info
              </small>
            </div>
          </div>

          <div
            className="flashcard-back d-flex align-items-center justify-content-center p-4"
            style={{
              backgroundColor: "#0d6efd",
              borderRadius: "15px",
              color: "white",
              textShadow: "1px 1px 2px black",
            }}
          >
            <div>
              <i className="fas fa-lightbulb text-warning fs-2 mb-3"></i>
              <p>{flashCard.answer}</p>
              <small className="opacity-75 d-block mt-3">
                <i className="fas fa-mouse-pointer me-1"></i>Click to see front
              </small>
            </div>
          </div>
        </div>
      </div>

      {showLogin && <Login onSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default Flashcarddisplay;
