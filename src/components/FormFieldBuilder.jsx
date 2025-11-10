import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./css/formfieldbuilder.css";

const FormFieldBuilder = ({ formData, setFormData }) => {
  const [fields, setFields] = useState([]);

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
    // Pages field removed - now auto-calculated from uploaded file
    { id: "tags", icon: "bi-tags", label: "Tags", type: "text" },
  ];
  // Add field to canvas
  const handleAddField = (fieldType) => {
    const newField = {
      id: `${fieldType.id}-${Date.now()}`,
      type: fieldType.type,
      label: fieldType.label,
      fieldId: fieldType.id,
      value: formData[fieldType.id] || "",
      required: fieldType.id === "title" || fieldType.id === "description",
      placeholder:
        fieldType.id === "tags"
          ? "tag1, tag2, tag3"
          : fieldType.id === "uploadFile"
          ? "Choose a file to upload"
          : fieldType.id === "uploadPhoto"
          ? "Choose an image for thumbnail"
          : "Your answer",
    };
    setFields([...fields, newField]);
  };

  // Delete field from canvas
  const handleDeleteField = (fieldId) => {
    setFields(fields.filter((field) => field.id !== fieldId));
  };

  // Update field value
  const handleFieldChange = (fieldId, value) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field) {
      setFormData({ ...formData, [field.fieldId]: value });
    }
  }; // Handle file upload
  const handleFileUpload = (fieldId, file) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && file) {
      const fileInfo = {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.type,
        lastModified: file.lastModified,
      };

      // Auto-calculate pages for PDF files
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function (e) {
          const typedArray = new Uint8Array(e.target.result);
          // Count /Page occurrences in PDF (rough estimate)
          const pdfText = String.fromCharCode.apply(null, typedArray);
          const pageMatches = pdfText.match(/\/Type[\s]*\/Page[^s]/g);
          const pageCount = pageMatches ? pageMatches.length : 0;

          setFormData({
            ...formData,
            [field.fieldId]: file.name,
            fileSize: fileInfo.size,
            pages: pageCount || 1, // Auto-set pages
            uploadedFile: { ...fileInfo, pageCount },
          });
        };
        reader.readAsArrayBuffer(file);
      } else {
        // For non-PDF files, estimate based on file size (rough approximation)
        // Assume ~50KB per page for Word docs
        const estimatedPages = Math.max(1, Math.round(file.size / 1024 / 50));

        setFormData({
          ...formData,
          [field.fieldId]: file.name,
          fileSize: fileInfo.size,
          pages: estimatedPages, // Auto-set estimated pages
          uploadedFile: { ...fileInfo, pageCount: estimatedPages },
        });
      }
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (fieldId, file) => {
    const field = fields.find((f) => f.id === fieldId);
    if (field && file) {
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoInfo = {
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
          type: file.type,
          preview: reader.result, // Base64 image data
          lastModified: file.lastModified,
        };
        setFormData({
          ...formData,
          [field.fieldId]: file.name,
          thumbnail: reader.result, // Update thumbnail with image data
          uploadedPhoto: photoInfo,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Render field based on type
  const renderField = (field, index) => {
    return (
      <div
        key={field.id}
        className="form-field-item"
      >
        <div className="field-header">
          <div className="field-drag-handle">
            <i className="bi bi-grip-vertical"></i>
          </div>
          <div className="field-label-section">
            <Form.Label>
              {field.label}
              {field.required && <span className="required">*</span>}
            </Form.Label>
          </div>
          <Button
            variant="link"
            className="field-delete-btn"
            onClick={() => handleDeleteField(field.id)}
          >
            <i className="bi bi-trash"></i>
          </Button>
        </div>{" "}
        <div className="field-input-section">
          {field.type === "textarea" ? (
            <Form.Control
              as="textarea"
              rows={3}
              value={formData[field.fieldId] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="form-input"
            />
          ) : field.type === "select" && field.fieldId === "category" ? (
            <Form.Select
              value={formData[field.fieldId] || "Programming"}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="form-input"
            >
              <option value="Programming">Programming</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Security">Security</option>
            </Form.Select>
          ) : field.type === "image" ? (
            <div className="file-upload-container">
              <Form.Control
                type="file"
                onChange={(e) => handlePhotoUpload(field.id, e.target.files[0])}
                className="form-input"
                accept="image/*"
              />
              {formData.uploadedPhoto && (
                <div className="uploaded-photo-info">
                  <div className="photo-preview">
                    <img
                      src={formData.uploadedPhoto.preview}
                      alt="Thumbnail preview"
                      className="thumbnail-preview-img"
                    />
                  </div>
                  <div className="photo-details">
                    <div className="photo-name">
                      <i className="bi bi-image-fill text-success"></i>
                      <span>{formData.uploadedPhoto.name}</span>
                    </div>
                    <span className="photo-size">
                      {formData.uploadedPhoto.size}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : field.type === "file" ? (
            <div className="file-upload-container">
              <Form.Control
                type="file"
                onChange={(e) => handleFileUpload(field.id, e.target.files[0])}
                className="form-input"
                accept=".pdf,.doc,.docx,.txt"
              />
              {formData.uploadedFile && (
                <div className="uploaded-file-info">
                  <i className="bi bi-file-earmark-check text-success"></i>
                  <span className="file-name">
                    {formData.uploadedFile.name}
                  </span>
                  <span className="file-size">
                    ({formData.uploadedFile.size})
                  </span>
                  {formData.uploadedFile.pageCount && (
                    <span className="file-pages">
                      <i className="bi bi-file-earmark-text ms-2"></i>
                      {formData.uploadedFile.pageCount}{" "}
                      {formData.uploadedFile.pageCount === 1 ? "page" : "pages"}
                    </span>
                  )}
                </div>
              )}
            </div>
          ) : (
            <Form.Control
              type={field.type}
              value={formData[field.fieldId] || ""}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="form-input"
            />
          )}{" "}
          {field.fieldId === "description" && (
            <div className="form-helper">
              Provide a clear and detailed description of the manual
            </div>
          )}
          {field.fieldId === "category" && (
            <div className="form-helper">Choose the most relevant category</div>
          )}
          {field.fieldId === "uploadPhoto" && (
            <div className="form-helper">
              Upload an image for manual thumbnail (JPG, PNG, GIF)
            </div>
          )}{" "}
          {field.fieldId === "uploadFile" && (
            <div className="form-helper">
              Upload PDF, DOC, DOCX, or TXT files (page count auto-calculated)
            </div>
          )}
          {field.fieldId === "tags" && (
            <div className="form-helper">
              Add tags separated by commas to help others find your manual
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Sidebar */}
      <div className="fields-sidebar">
        <h3>Add Fields</h3>
        <div className="field-type-list">
          {fieldTypes.map((fieldType) => (
            <div
              key={fieldType.id}
              className="field-type-item"
              onClick={() => handleAddField(fieldType)}
            >
              <i className={`bi ${fieldType.icon}`}></i>
              <span>{fieldType.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="form-canvas">
        <div className="form-canvas-inner">
          {/* Title Card */}
          <div className="form-title-card">
            <h2>{formData.title || "Untitled Manual"}</h2>
            <p className="form-description-placeholder">
              {formData.description || "Manual description"}
            </p>
          </div>

          {/* Fields List */}
          {fields.length > 0 ? (
            <div className="form-fields-container">
              {fields.map((field, index) => renderField(field, index))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                  <rect
                    x="35"
                    y="10"
                    width="10"
                    height="60"
                    rx="2"
                    fill="#d0d0d0"
                  />
                  <rect
                    x="10"
                    y="35"
                    width="60"
                    height="10"
                    rx="2"
                    fill="#d0d0d0"
                  />
                </svg>
              </div>
              <p className="empty-state-text">
                Click on field types from the left sidebar to start building
                your form
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FormFieldBuilder;
