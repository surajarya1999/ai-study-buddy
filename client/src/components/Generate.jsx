import React, { useState } from "react";

function Generate() {
  const [title, setTitle] = useState("");
  const [num, setNum] = useState(1);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // 🔹 Local predefined knowledge base
  const knowledgeBase = {
    java: [
      "Java is a high-level, object-oriented programming language.",
      "It is widely used for building enterprise-scale applications.",
      "Java applications are platform-independent due to JVM.",
      "It is popular for Android development and backend systems.",
    ],
    react: [
      "React is a JavaScript library for building user interfaces.",
      "It uses a component-based architecture.",
      "React enables efficient UI updates using the virtual DOM.",
      "It is widely used for single-page applications (SPAs).",
    ],
    html: [
      "HTML stands for HyperText Markup Language.",
      "It is the standard language for creating web pages.",
      "HTML uses tags to structure content on the web.",
      "It forms the backbone of every website.",
    ],
    css: [
      "CSS stands for Cascading Style Sheets.",
      "It is used to style and design HTML elements.",
      "CSS controls layout, colors, fonts, and animations.",
      "It helps in making websites responsive and attractive.",
    ],
    javascript: [
      "JavaScript is a versatile scripting language for the web.",
      "It allows adding interactivity and dynamic features to websites.",
      "JS runs in browsers and also on servers using Node.js.",
      "It is essential for frontend and full-stack development.",
    ],
  };

  const generateCards = () => {
    if (!title.trim()) return;

    setLoading(true);

    const key = title.toLowerCase().trim();
    const count = Number(num) || 3;

    let selectedData = knowledgeBase[key];

    // Fallback agar data na mile
    if (!Array.isArray(selectedData)) {
      selectedData = [
        `Sorry, I don't have information about "${title}".`,
        "Try topics like Java, React, HTML, CSS, or JavaScript.",
      ];
    }

    const parsedCards = selectedData.slice(0, count).map((desc, index) => ({
      question: `${title} – Info ${index + 1}`,
      answer: desc,
    }));

    setCards(parsedCards);
    setCurrentIndex(0);
    setFlipped(false);
    setLoading(false);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
    if (flipped) {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }
  };

  return (
    <div className="p-4 text-center">
      <h2>Generate Card</h2>

      <input
        type="text"
        className="form-control mb-2"
        style={{ width: "500px", margin: "0 auto" }}
        placeholder="Enter title (Java, React, HTML, CSS, JS)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        className="form-control mb-2"
        style={{ width: "500px", margin: "0 auto" }}
        placeholder="Number of cards"
        value={num}
        min={1}
        onChange={(e) => setNum(parseInt(e.target.value))}
      />

      <button
        className="btn btn-primary mb-4"
        onClick={generateCards}
        disabled={loading || !title}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {cards.length > 0 && (
        <div
          className={`flashcard ${flipped ? "flipped" : ""} mx-auto`}
          onClick={handleFlip}
          style={{ width: "300px", cursor: "pointer" }}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="card-content">
                <h5>{cards[currentIndex].question}</h5>
                <small className="text-muted">Click to see info</small>
              </div>
            </div>
            <div className="flashcard-back">
              <div className="card-content">
                <h5>{cards[currentIndex].answer}</h5>
                <small className="text-muted">Click to next info</small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Generate;
