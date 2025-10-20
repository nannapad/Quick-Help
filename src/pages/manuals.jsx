import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal } from "react-bootstrap";

export default function Manuals() {
  const [showEdit, setShowEdit] = useState(false);
  const [editing, setEditing] = useState(null);

  const manuals = [
    {
      id: "m-001",
      title: "Getting Started with Product X",
      excerpt:
        "Quickstart guide for installing and configuring Product X. Step-by-step walkthrough with screenshots.",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&q=60",
      category: "Setup",
      tags: ["quickstart", "install"],
    },
    {
      id: "m-002",
      title: "Admin Guide: Roles & Permissions",
      excerpt:
        "How to configure roles, permission levels and SSO integration for enterprise deployments.",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=60",
      category: "Administration",
      tags: ["security", "roles"],
    },
    {
      id: "m-003",
      title: "API Documentation",
      excerpt:
        "Reference for REST endpoints, request/response examples and authentication details.",
      thumbnail:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=60",
      category: "API",
      tags: ["api", "endpoints"],
    },
  ];

  const handleEdit = (manual) => {
    setEditing(manual);
    setShowEdit(true);
  };

  const handleSave = () => {
    // Save logic would go here
    setShowEdit(false);
    setEditing(null);
  };

  return (
    <Container fluid className="py-4">
      {/* Header and Search */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Manuals</h1>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search manuals..."
                style={{ width: "384px", paddingLeft: "2.5rem" }}
              />
              <i
                className="position-absolute"
                style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
              >
                🔍
              </i>
            </div>
          </div>
        </Col>
      </Row>

      {/* Main Content */}
      <Row>
        <Col lg={8}>
          <div className="d-flex flex-column gap-4">
            {manuals.map((manual) => (
              <ManualCard 
                key={manual.id} 
                manual={manual} 
                onEdit={() => handleEdit(manual)} 
              />
            ))}
          </div>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          <Card className="sticky-top" style={{ top: "2rem" }}>
            <Card.Body>
              <Card.Title>Quick actions</Card.Title>
              <div className="d-grid gap-2 mt-3">
                <Button variant="primary">Upload manual</Button>
                <Button variant="outline-secondary">Import CSV</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Floating AI Assistant Button */}
      <Button
        variant="primary"
        className="position-fixed rounded-circle"
        style={{ right: "24px", bottom: "24px", width: "64px", height: "64px" }}
        title="AI Assistant"
        onClick={() => alert("AI Assistant — visual prototype")}
      >
        💬
      </Button>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                defaultValue={editing?.title} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div className="d-flex gap-2 mt-2">
                {(editing?.tags || ["General"]).map((tag, index) => (
                  <span 
                    key={index}
                    className="badge bg-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select defaultValue={editing?.category}>
                    <option>General</option>
                    <option>Setup</option>
                    <option>Administration</option>
                    <option>API</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Format</Form.Label>
                  <Form.Select>
                    <option>HTML</option>
                    <option>PDF</option>
                    <option>Markdown</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

function ManualCard({ manual, onEdit }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={3}>
            <Card.Img 
              variant="top" 
              src={manual.thumbnail} 
              alt="Thumbnail"
              style={{ height: "128px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={9}>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <Card.Title>{manual.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {manual.category}
                </Card.Subtitle>
              </div>
              <div className="d-flex flex-column gap-1">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={onEdit}
                >
                  ✎
                </Button>
                <Button variant="outline-secondary" size="sm">
                  ⇩
                </Button>
              </div>
            </div>
            
            <Card.Text className="mt-2">
              {manual.excerpt}
            </Card.Text>
            
            <div className="d-flex gap-2 mt-3">
              {manual.tags.map((tag, index) => (
                <span key={index} className="badge bg-light text-dark">
                  {tag}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}