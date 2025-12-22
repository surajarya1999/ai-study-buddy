import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { deleteStoredTopic } from "../services/storageServices";

const Saved = ({ topics = [], onTopicSelect, onTopicsChange }) => {
  const handleDelete = (topic) => {
    if (window.confirm(`Delete "${topic}" flashcards?`)) {
      deleteStoredTopic(topic);
      onTopicsChange();
    }
  };

  if (!topics.length) {
    return (
      <Card className="shadow-lg border-0 text-center">
        <Card.Body className="py-5">
          <div className="text-muted mb-4">
            <i className="fas fa-bookmark fa-3x mb-3"></i>
            <h4>No Saved Flashcards</h4>
            <p>Generate and save some flashcards to see them here!</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2 className="text-white fw-bold mb-2">
          <i className="fas fa-bookmark me-2"></i>Saved Flashcards
        </h2>
        <p className="text-light opacity-75">
          Continue studying your saved topics
        </p>
      </div>

      <Row>
        {topics?.map(({ topic, flashcards, date }) => (
          <Col key={topic} lg={6} className="mb-4">
            <Card className="topic-card h-100 border-0 shadow">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold text-primary mb-2">{topic}</h5>
                    <Badge bg="secondary" className="mb-2">
                      {flashcards?.length || 0} cards
                    </Badge>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(topic)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>

                <div className="mb-3 flex-grow-1">
                  <small className="text-muted">
                    <i className="fas fa-clock me-1"></i>
                    Saved {date ? new Date(date).toLocaleDateString() : "N/A"}
                  </small>
                </div>

                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => onTopicSelect(topic, flashcards)}
                >
                  <i className="fas fa-play me-2"></i>
                  Study Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Saved;
