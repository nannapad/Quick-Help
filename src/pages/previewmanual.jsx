import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge, Row, Col } from "react-bootstrap";
import "./css/manualdetail.css";

const PreviewManual = () => {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState(null);

  useEffect(() => {
    // Get preview data from localStorage
    const preview = localStorage.getItem("previewManual");
    if (preview) {
      setPreviewData(JSON.parse(preview));
    } else {
      // Redirect back if no preview data
      window.close();
    }
  }, []);

  const handleClose = () => {
    window.close();
  };

  if (!previewData) {
    return (
      <div className="manual-detail-container" style={{ padding: "40px" }}>
        <div className="loading">Loading preview...</div>
      </div>
    );
  }

  return (
    <div
      className="manual-detail-container"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Preview Banner */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "#ffc107",
          color: "#000",
          padding: "12px 20px",
          textAlign: "center",
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <i className="bi bi-eye-fill me-2"></i>
        PREVIEW MODE - This is how your manual will appear
        <Button
          variant="dark"
          size="sm"
          onClick={handleClose}
          style={{ marginLeft: "20px" }}
        >
          <i className="bi bi-x-lg me-2"></i>Close Preview
        </Button>
      </div>

      {/* Manual Detail Content */}
      <div style={{ marginTop: "60px", padding: "20px" }}>
        <Card className="manual-detail-card">
          <Card.Body>
            {/* Thumbnail */}
            <div className="manual-thumbnail-container">
              <img
                src={previewData.thumbnail}
                alt={previewData.title}
                className="manual-detail-thumbnail"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
            </div>

            {/* Title and Meta */}
            <div className="manual-header">
              <h1 className="manual-title">{previewData.title}</h1>
              <div className="manual-meta">
                <span>
                  <i className="bi bi-person-circle"></i>{" "}
                  {previewData.author?.name || "Anonymous"}
                </span>
                <span>
                  <i className="bi bi-calendar3"></i>{" "}
                  {new Date(
                    previewData.createdAt || Date.now()
                  ).toLocaleDateString()}
                </span>
                <span>
                  <i className="bi bi-eye"></i> {previewData.views || 0} views
                </span>
              </div>
            </div>

            {/* Category and Tags */}
            <div className="manual-tags" style={{ marginTop: "20px" }}>
              <Badge
                bg="primary"
                style={{ marginRight: "8px", fontSize: "0.9rem" }}
              >
                <i className="bi bi-folder me-1"></i>
                {previewData.category}
              </Badge>
              {previewData.tags &&
                previewData.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    bg="secondary"
                    style={{ marginRight: "8px", fontSize: "0.9rem" }}
                  >
                    #{tag}
                  </Badge>
                ))}
            </div>

            {/* Description */}
            <div className="manual-description" style={{ marginTop: "30px" }}>
              <h3>Description</h3>
              <p style={{ lineHeight: "1.8", color: "var(--text)" }}>
                {previewData.description}
              </p>
            </div>

            {/* File Info */}
            <Row className="manual-info" style={{ marginTop: "30px" }}>
              <Col md={6}>
                <Card className="info-card">
                  <Card.Body>
                    <h5>
                      <i className="bi bi-file-earmark-text"></i> File
                      Information
                    </h5>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "10px 0 0 0",
                      }}
                    >
                      <li>
                        <strong>Size:</strong> {previewData.fileSize || "N/A"}
                      </li>
                      <li>
                        <strong>Pages:</strong> {previewData.pages || 0}
                      </li>
                      <li>
                        <strong>Format:</strong> PDF
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="info-card">
                  <Card.Body>
                    <h5>
                      <i className="bi bi-graph-up"></i> Statistics
                    </h5>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "10px 0 0 0",
                      }}
                    >
                      <li>
                        <strong>Views:</strong> {previewData.views || 0}
                      </li>
                      <li>
                        <strong>Likes:</strong> {previewData.likes || 0}
                      </li>
                      <li>
                        <strong>Downloads:</strong> {previewData.downloads || 0}
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Action Buttons */}
            <div
              style={{
                marginTop: "40px",
                padding: "20px",
                backgroundColor: "var(--bg-light)",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <Button
                variant="primary"
                size="lg"
                disabled
                style={{ marginRight: "10px" }}
              >
                <i className="bi bi-download me-2"></i>
                Download (Preview Only)
              </Button>
              <Button variant="outline-primary" size="lg" disabled>
                <i className="bi bi-heart me-2"></i>
                Like (Preview Only)
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PreviewManual;
