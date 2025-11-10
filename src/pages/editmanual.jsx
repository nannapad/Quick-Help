import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { getManualById, updateManual } from "../data/manualdata";
import FormFieldBuilder from "../components/FormFieldBuilder";
import "./css/createmanual.css";

const EditManual = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [manual, setManual] = useState(null);
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);
  const [initialFields, setInitialFields] = useState([]);

  // Available field types
  const fieldTypes = [
    { id: "title", icon: "bi-text-left", label: "Title", type: "text" },
    {
      id: "description",
      icon: "bi-text-paragraph",
      label: "Description",
      type: "textarea",
    },
    { id: "category", icon: "bi-list", label: "Category", type: "select" },
    {
      id: "uploadPhoto",
      icon: "bi-image",
      label: "Upload Photo",
      type: "image",
    },
    {
      id: "uploadFile",
      icon: "bi-cloud-upload",
      label: "Upload File",
      type: "file",
    },
    { id: "tags", icon: "bi-tags", label: "Tags", type: "text" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(user);
    setCurrentUser(parsedUser);

    // Load manual data
    const manualData = getManualById(id);
    if (!manualData) {
      setAlertMessage({
        type: "danger",
        text: "Manual not found",
      });
      setLoading(false);
      setTimeout(() => navigate("/dashboard"), 2000);
      return;
    }

    // Check if user has permission to edit
    if (parsedUser.role !== "admin" && manualData.author.id !== parsedUser.id) {
      setAlertMessage({
        type: "danger",
        text: "You do not have permission to edit this manual",
      });
      setLoading(false);
      setTimeout(() => navigate("/feeds"), 2000);
      return;
    }
    setManual(manualData);
    setFormData({
      title: manualData.title,
      description: manualData.description,
      category: manualData.category,
      tags: manualData.tags.join(", "),
      uploadFile: manualData.uploadFile || "",
      fileSize: manualData.fileSize,
      pages: manualData.pages.toString(),
      uploadedFile: manualData.uploadedFile || null,
      uploadedPhoto: manualData.thumbnail
        ? { preview: manualData.thumbnail }
        : null,
    });

    // Initialize fields for FormFieldBuilder
    const initialFieldsData = fieldTypes.map((fieldType) => ({
      id: `${fieldType.id}-${Date.now()}`,
      type: fieldType.type,
      label: fieldType.label,
      fieldId: fieldType.id,
      value:
        manualData[fieldType.id] ||
        (fieldType.id === "tags" ? manualData.tags.join(", ") : ""),
      required: fieldType.id === "title" || fieldType.id === "description",
      placeholder:
        fieldType.id === "tags"
          ? "tag1, tag2, tag3"
          : fieldType.id === "uploadFile"
          ? "Choose a file to upload"
          : fieldType.id === "uploadPhoto"
          ? "Choose an image for thumbnail"
          : "Your answer",
    }));
    setInitialFields(initialFieldsData);

    setLoading(false);
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlertMessage({ type: "", text: "" });

    if (!formData.title || !formData.description) {
      setAlertMessage({
        type: "danger",
        text: "Please fill in all required fields (Title and Description)",
      });
      return;
    }

    const updatedData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      fileSize: formData.fileSize,
      pages: parseInt(formData.pages) || 0,
      // If current user is admin, persist approved status; otherwise mark as pending for admin approval
      status:
        currentUser && currentUser.role === "admin" ? "approved" : "pending",
    };

    updateManual(id, updatedData);

    setAlertMessage({
      type: "success",
      text:
        currentUser && currentUser.role === "admin"
          ? "Manual updated successfully!"
          : "Manual update submitted for admin approval.",
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      if (currentUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/feeds");
      }
    }, 2000);
  };

  const handleSaveDraft = () => {
    setAlertMessage({ type: "", text: "" });

    if (!formData.title) {
      setAlertMessage({
        type: "warning",
        text: "Please add a title before saving draft",
      });
      return;
    }

    const updatedData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      fileSize: formData.fileSize,
      pages: parseInt(formData.pages) || 0,
      thumbnail: formData.thumbnail || manual.thumbnail,
      status: "draft", // Update status to draft
      savedAt: new Date().toISOString(),
    };

    updateManual(id, updatedData);

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

    if (!formData.title || !formData.description) {
      setAlertMessage({
        type: "warning",
        text: "Please add Title and Description to preview",
      });
      return;
    }

    // Create preview data from current form state
    const previewData = {
      ...manual,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      fileSize: formData.fileSize,
      pages: parseInt(formData.pages) || 0,
      thumbnail: formData.thumbnail || manual.thumbnail,
    };

    // Store preview data temporarily
    localStorage.setItem("previewManual", JSON.stringify(previewData));

    // Open preview in new tab
    window.open("/preview-manual", "_blank");
  };

  const handleCancel = () => {
    if (currentUser.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/feeds");
    }
  };

  const handlePublishDraft = () => {
    setAlertMessage({ type: "", text: "" });

    if (!formData.title || !formData.description) {
      setAlertMessage({
        type: "danger",
        text: "Please fill in all required fields (Title and Description) before publishing",
      });
      return;
    }

    const publishStatus =
      currentUser && currentUser.role === "admin" ? "approved" : "pending";

    const updatedData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
      fileSize: formData.fileSize,
      pages: parseInt(formData.pages) || 0,
      thumbnail: formData.thumbnail || manual.thumbnail,
      status: publishStatus, // Publish status depends on user role
      publishedAt:
        publishStatus === "approved" ? new Date().toISOString() : undefined,
    };

    updateManual(id, updatedData);

    setAlertMessage({
      type: publishStatus === "approved" ? "success" : "info",
      text:
        publishStatus === "approved"
          ? "Manual published successfully!"
          : "Manual submitted for admin approval.",
    });

    // Redirect after 2 seconds
    setTimeout(() => {
      if (currentUser.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/feeds");
      }
    }, 2000);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!manual) {
    return (
      <div className="create-manual-container">
        <Alert variant="danger">Manual not found</Alert>
      </div>
    );
  }

  return (
    <div className="create-manual-container">
      {/* Header */}
      <div className="form-builder-header">
        <div className="form-builder-title-section">
          <h1 className="create-manual-title">Edit Manual</h1>
          <p className="create-manual-subtitle">
            Update the details of your manual
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
          {manual.status === "draft" && (
            <Button variant="success" onClick={handlePublishDraft} size="sm">
              <i className="bi bi-upload me-2"></i>Publish
            </Button>
          )}
          <Button variant="primary" onClick={handleSubmit} size="sm">
            <i className="bi bi-check2 me-2"></i>Update
          </Button>
        </div>
      </div>{" "}
      {/* Main Content */}
      <Card className="create-manual-card">
        <Card.Header style={{ display: "none" }}>
          <h2 className="create-manual-title">Edit Manual</h2>
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
          <FormFieldBuilder
            formData={formData}
            setFormData={setFormData}
            initialFields={initialFields}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditManual;
