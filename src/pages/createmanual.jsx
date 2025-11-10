import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { addManual } from "../data/manualdata";
import FormFieldBuilder from "../components/FormFieldBuilder";
import "./css/createmanual.css";

const CreateManual = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [newManual, setNewManual] = useState({
    title: "",
    description: "",
    category: "Programming",
    tags: "",
    uploadPhoto: "",
    thumbnail: "",
    uploadFile: "",
    fileSize: "",
    pages: "",
    uploadedFile: null,
    uploadedPhoto: null,
  });
  const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    setCurrentUser(JSON.parse(user));
  }, [navigate]);

  const handleSubmitManual = (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", text: "" });

    if (!newManual.title || !newManual.description) {
      setAlertMessage({
        type: "danger",
        text: "Please fill in all required fields (Title and Description)",
      });
      return;
    }
    const manualData = {
      ...newManual,
      thumbnail:
        newManual.thumbnail ||
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
      author: {
        id: currentUser.id,
        name:
          currentUser.username ||
          `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      tags: newManual.tags
        ? newManual.tags.split(",").map((tag) => tag.trim())
        : [],
      pages: parseInt(newManual.pages) || 0,
      status: currentUser.role === "admin" ? "approved" : "pending",
    };

    addManual(manualData);

    if (currentUser.role === "admin") {
      setAlertMessage({
        type: "success",
        text: "Manual created and published successfully!",
      });
    } else {
      setAlertMessage({
        type: "success",
        text: "Manual submitted for admin approval!",
      });
    } // Reset form
    setNewManual({
      title: "",
      description: "",
      category: "Programming",
      tags: "",
      uploadPhoto: "",
      thumbnail: "",
      uploadFile: "",
      fileSize: "",
      pages: "",
      uploadedFile: null,
      uploadedPhoto: null,
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      navigate("/feeds");
    }, 2000);
  };
  const handleSaveDraft = () => {
    setAlertMessage({ type: "", text: "" });

    if (!newManual.title) {
      setAlertMessage({
        type: "warning",
        text: "Please add a title before saving draft",
      });
      return;
    }

    const draftData = {
      ...newManual,
      thumbnail:
        newManual.thumbnail ||
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
      author: {
        id: currentUser.id,
        name:
          currentUser.username ||
          `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      tags: newManual.tags
        ? newManual.tags.split(",").map((tag) => tag.trim())
        : [],
      pages: parseInt(newManual.pages) || 0,
      status: "draft", // Save as draft
      savedAt: new Date().toISOString(),
    };

    addManual(draftData);

    setAlertMessage({
      type: "info",
      text: "Draft saved successfully! You can continue editing or publish later.",
    });

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setAlertMessage({ type: "", text: "" });
    }, 3000);
  };

  const handlePreview = () => {
    setAlertMessage({ type: "", text: "" });

    if (!newManual.title || !newManual.description) {
      setAlertMessage({
        type: "warning",
        text: "Please add Title and Description to preview",
      });
      return;
    }

    // Create a temporary preview object
    const previewData = {
      ...newManual,
      thumbnail:
        newManual.thumbnail ||
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=200&fit=crop",
      author: {
        id: currentUser.id,
        name:
          currentUser.username ||
          `${currentUser.firstName} ${currentUser.lastName}`,
        avatar: currentUser.avatar,
        role: currentUser.role,
      },
      tags: newManual.tags
        ? newManual.tags.split(",").map((tag) => tag.trim())
        : [],
      pages: parseInt(newManual.pages) || 0,
      views: 0,
      likes: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
    };

    // Store preview data temporarily
    localStorage.setItem("previewManual", JSON.stringify(previewData));

    // Open preview in new tab
    window.open("/preview-manual", "_blank");
  };

  const handleCancel = () => {
    navigate("/feeds");
  };

  if (!currentUser) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="create-manual-container">
      {/* Header */}
      <div className="form-builder-header">
        <div className="form-builder-title-section">
          <h1 className="create-manual-title">Manual Builder</h1>
          <p className="create-manual-subtitle">
            Create beautiful forms with simplicity
          </p>
        </div>{" "}
        <div className="form-builder-actions">
          <Button variant="outline-secondary" onClick={handlePreview} size="sm">
            <i className="bi bi-eye me-2"></i>Preview
          </Button>
          <Button
            variant="outline-secondary"
            onClick={handleSaveDraft}
            size="sm"
          >
            <i className="bi bi-floppy me-2"></i>Save Draft
          </Button>
          <Button variant="primary" onClick={handleSubmitManual} size="sm">
            <i className="bi bi-share me-2"></i>Publish
          </Button>
        </div>
      </div>{" "}
      {/* Main Content */}
      <Card className="create-manual-card">
        <Card.Header style={{ display: "none" }}>
          <h2 className="create-manual-title">Create New Manual</h2>
        </Card.Header>
        <Card.Body>
          {alertMessage.text && (
            <Alert
              variant={alertMessage.type}
              style={{
                position: "fixed",
                top: "80px",
                right: "20px",
                zIndex: 1000,
                minWidth: "300px",
              }}
            >
              {alertMessage.text}
            </Alert>
          )}
          <FormFieldBuilder formData={newManual} setFormData={setNewManual} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateManual;
