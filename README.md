# 📚 Quick Help - Manual Management System

<div align="center">

![Quick Help Logo](https://img.shields.io/badge/Quick%20Help-v2.0.0-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=for-the-badge&logo=vite)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3?style=for-the-badge&logo=bootstrap)

**A modern, Google Forms-inspired platform for creating, sharing, and managing technical manuals and documentation.**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Project Structure](#-project-structure)
- [Core Features](#-core-features)
- [Documentation](#-documentation)
- [Expanding the Project](#-expanding-the-project)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Quick Help** is a comprehensive manual management system designed to help teams and individuals create, organize, and share technical documentation. Built with React and Vite, it features a clean, Google Forms-inspired interface that makes documentation management intuitive and efficient.

### Why Quick Help?

- 🎨 **Beautiful UI**: Google Forms-inspired design with modern aesthetics
- 📱 **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🚀 **Fast**: Built with Vite for lightning-fast development and builds
- 💾 **Draft System**: Save work in progress and return to it later
- 👁️ **Preview Mode**: See how your manual will look before publishing
- 📁 **Smart File Upload**: Automatic page count extraction from PDFs
- 🖼️ **Custom Thumbnails**: Upload custom images for manual covers
- 🔒 **Privacy**: Drafts are private, only visible to the creator
- 🏷️ **Tagging System**: Organize and discover manuals easily

---

## ✨ Features

### 🎯 Core Features

#### 1. **Manual Creation & Editing**

- Drag-and-drop form builder
- 6 field types: Title, Description, Category, Upload Photo, Upload File, Tags
- Real-time validation
- Google Forms-inspired interface

#### 2. **File Upload System**

- ✅ Support for PDF, DOC, DOCX, TXT files
- ✅ Auto-calculates file size (MB)
- ✅ **Auto-extracts page count** from PDFs
- ✅ Estimates page count for other file types
- ✅ Visual file info display with icons

#### 3. **Photo Upload**

- ✅ Custom thumbnail upload (all image formats)
- ✅ Base64 encoding for storage
- ✅ Live preview (120×80px)
- ✅ Auto-assigns as manual thumbnail
- ✅ Fallback to default thumbnail

#### 4. **Draft System**

- ✅ Save drafts with minimal validation (Title only)
- ✅ Yellow "DRAFT" badge on cards
- ✅ Click-to-edit functionality
- ✅ Private drafts (only creator can see)
- ✅ Resume editing anytime

#### 5. **Preview Mode**

- ✅ Preview before publishing
- ✅ Opens in new tab
- ✅ Yellow "PREVIEW MODE" banner
- ✅ Shows exactly how manual will appear
- ✅ Disabled action buttons

#### 6. **Dashboard & Analytics**

- Status tracking (Draft, Pending, Approved, Rejected)
- Color-coded badges
- Manual statistics
- User management

#### 7. **Feeds & Discovery**

- Browse approved manuals
- See your own drafts
- Filter by category
- Search functionality

---

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - UI library
- **React Router DOM 7.9.4** - Routing
- **React Bootstrap 2.10.10** - UI components
- **Bootstrap 5.3.8** - CSS framework
- **Bootstrap Icons** - Icon library

### Build Tools

- **Vite 7.1.7** - Build tool & dev server
- **ESLint 9.36.0** - Code linting
- **Tailwind CSS 4.1.16** - Utility-first CSS (optional)

### Development

- **Hot Module Replacement (HMR)** - Fast refresh
- **gh-pages** - GitHub Pages deployment
- **Modern JavaScript (ES6+)** - Latest syntax

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

Check your installations:

```powershell
node --version  # Should be v18+
npm --version   # Should be v9+
git --version
```

### Installation

1. **Clone the repository**

```powershell
git clone https://github.com/nannapad/quick-help.git
cd quick-help
```

2. **Install dependencies**

```powershell
npm install
```

This will install all required packages from `package.json`.

### Development

Start the development server with hot reload:

```powershell
npm run dev
```

The app will be available at:

- **Local:** `http://localhost:5173`
- **Network:** `http://[your-ip]:5173`

### Building for Production

Create an optimized production build:

```powershell
npm run build
```

The build files will be in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```powershell
npm run preview
```

### Linting

Check code quality:

```powershell
npm run lint
```

---

## 📁 Project Structure

```
quick-help/
├── public/                  # Static assets
│   └── vite.svg
├── src/
│   ├── assets/             # Images, icons
│   │   └── react.svg
│   ├── components/         # Reusable components
│   │   ├── chatbot.jsx
│   │   ├── footer.jsx
│   │   ├── FormFieldBuilder.jsx    # ⭐ Form builder component
│   │   ├── navbar.jsx
│   │   └── css/
│   │       ├── footer.css
│   │       ├── formfieldbuilder.css
│   │       └── navbar.css
│   ├── data/               # Mock data & state management
│   │   ├── commentdata.jsx
│   │   ├── manualdata.jsx  # ⭐ Manual CRUD operations
│   │   └── userdata.jsx    # ⭐ User authentication
│   ├── layouts/            # Page layouts
│   │   ├── applayout.css
│   │   └── applayout.jsx
│   ├── pages/              # Application pages
│   │   ├── createmanual.jsx     # ⭐ Create new manual
│   │   ├── editmanual.jsx       # ⭐ Edit existing manual
│   │   ├── previewmanual.jsx    # ⭐ Preview mode
│   │   ├── dashboard.jsx        # ⭐ User dashboard
│   │   ├── feeds.jsx           # ⭐ Browse manuals
│   │   ├── manualdetail.jsx    # View manual details
│   │   ├── home.jsx            # Landing page
│   │   ├── login.jsx           # Authentication
│   │   ├── feedback.jsx        # User feedback
│   │   ├── profilesettings.jsx # User settings
│   │   └── css/                # Page-specific styles
│   ├── App.css             # Global styles
│   ├── App.jsx             # ⭐ Main app component & routing
│   ├── index.css           # Root styles
│   └── main.jsx            # Entry point
├── .eslintrc.config.js     # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── vite.config.js          # Vite configuration
├── README.md               # This file
└── Documentation/          # Feature documentation
    ├── AUTO_PAGE_COUNT_FEATURE.md
    ├── FIELD_TYPES_OVERVIEW.md
    ├── COMPLETE_IMPLEMENTATION_SUMMARY.md
    └── ... (other docs)
```

### Key Files & Folders

| Path                                  | Description                          |
| ------------------------------------- | ------------------------------------ |
| `src/App.jsx`                         | Main routing and layout setup        |
| `src/components/FormFieldBuilder.jsx` | Drag-and-drop form builder           |
| `src/data/manualdata.jsx`             | Manual CRUD operations & state       |
| `src/data/userdata.jsx`               | User authentication & management     |
| `src/pages/createmanual.jsx`          | Create manual page with form builder |
| `src/pages/editmanual.jsx`            | Edit manual page with form builder   |
| `src/pages/feeds.jsx`                 | Browse & discover manuals            |
| `src/pages/dashboard.jsx`             | User dashboard with stats            |

---

## 🎯 Core Features

### 1. Form Field Builder

The `FormFieldBuilder` component is a drag-and-drop form creator:

```jsx
import FormFieldBuilder from "./components/FormFieldBuilder";

<FormFieldBuilder formData={formData} setFormData={setFormData} />;
```

**Available Field Types:**

1. **Title** (required) - Text input
2. **Description** (required) - Textarea
3. **Category** (optional) - Select dropdown
4. **Upload Photo** (optional) - Image upload
5. **Upload File** (optional) - Document upload
6. **Tags** (optional) - Text input

### 2. File Upload with Auto Page Count

```javascript
// Automatically extracts page count from PDFs
const handleFileUpload = (fieldId, file) => {
  if (file.type === "application/pdf") {
    // Reads PDF and counts pages
    const pageCount = extractPageCount(file);
    setFormData({ ...formData, pages: pageCount });
  }
};
```

### 3. Draft System

```javascript
// Save as draft (minimal validation)
const handleSaveDraft = () => {
  const manual = {
    ...formData,
    status: "draft",
    author: currentUser,
  };
  MANUAL_DATA.push(manual);
};

// Get user's drafts only
const userDrafts = getUserDrafts(userId);
```

### 4. Preview Mode

```javascript
// Preview before publishing
const handlePreview = () => {
  localStorage.setItem("previewManual", JSON.stringify(formData));
  window.open("/preview-manual", "_blank");
};
```

---

## 📚 Documentation

Comprehensive documentation is available for all features:

| Document                                                                   | Description                    |
| -------------------------------------------------------------------------- | ------------------------------ |
| [AUTO_PAGE_COUNT_FEATURE.md](./AUTO_PAGE_COUNT_FEATURE.md)                 | Auto page count implementation |
| [FIELD_TYPES_OVERVIEW.md](./FIELD_TYPES_OVERVIEW.md)                       | All field types explained      |
| [COMPLETE_IMPLEMENTATION_SUMMARY.md](./COMPLETE_IMPLEMENTATION_SUMMARY.md) | Full feature summary           |
| [FILE_UPLOAD_FEATURE.md](./FILE_UPLOAD_FEATURE.md)                         | File upload details            |
| [PHOTO_UPLOAD_FEATURE.md](./PHOTO_UPLOAD_FEATURE.md)                       | Photo upload guide             |
| [DRAFT_PREVIEW_FEATURES.md](./DRAFT_PREVIEW_FEATURES.md)                   | Draft & preview features       |

---

## 🔧 Expanding the Project

### Adding New Features

#### 1. **Add a New Field Type**

Edit `src/components/FormFieldBuilder.jsx`:

```javascript
const fieldTypes = [
  // ...existing fields...
  {
    id: "myNewField",
    icon: "bi-star",
    label: "My New Field",
    type: "text",
  },
];
```

#### 2. **Add a New Page**

Create `src/pages/mypage.jsx`:

```jsx
import React from "react";
import "./css/mypage.css";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <h1>My New Page</h1>
    </div>
  );
};

export default MyPage;
```

Add route in `src/App.jsx`:

```jsx
import MyPage from "./pages/mypage";

<Route path="/mypage" element={<MyPage />} />;
```

#### 3. **Add a New Component**

Create `src/components/MyComponent.jsx`:

```jsx
import React from "react";
import "./css/mycomponent.css";

const MyComponent = ({ props }) => {
  return <div>{/* Component JSX */}</div>;
};

export default MyComponent;
```

### Customization

#### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --primary: #4285f4; /* Primary color */
  --highlight: #5a95f5; /* Hover color */
  --danger: #ea4335; /* Error color */
  --success: #34a853; /* Success color */
  /* ...more variables... */
}
```

#### Change Layout

Edit `src/layouts/applayout.jsx` to modify the overall layout structure.

---

## 🔌 API Integration

Currently, the app uses mock data. To integrate with a backend:

### 1. **Setup Axios**

```powershell
npm install axios
```

### 2. **Create API Service**

Create `src/services/api.js`:

```javascript
import axios from "axios";

const API_BASE_URL = "https://your-api.com/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Manual endpoints
export const getManuals = () => api.get("/manuals");
export const getManual = (id) => api.get(`/manuals/${id}`);
export const createManual = (data) => api.post("/manuals", data);
export const updateManual = (id, data) => api.put(`/manuals/${id}`, data);
export const deleteManual = (id) => api.delete(`/manuals/${id}`);

// User endpoints
export const login = (credentials) => api.post("/auth/login", credentials);
export const register = (userData) => api.post("/auth/register", userData);
```

### 3. **Replace Mock Data**

In `src/data/manualdata.jsx`, replace arrays with API calls:

```javascript
import { getManuals, createManual } from "../services/api";

// Before (mock data)
export const MANUAL_DATA = [
  /* mock data */
];

// After (API integration)
export const fetchManuals = async () => {
  const response = await getManuals();
  return response.data;
};

export const addManual = async (manual) => {
  const response = await createManual(manual);
  return response.data;
};
```

### 4. **Use in Components**

```jsx
import { useState, useEffect } from "react";
import { fetchManuals } from "../data/manualdata";

const Feeds = () => {
  const [manuals, setManuals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadManuals = async () => {
      try {
        const data = await fetchManuals();
        setManuals(data);
      } catch (error) {
        console.error("Error fetching manuals:", error);
      } finally {
        setLoading(false);
      }
    };
    loadManuals();
  }, []);

  // ...rest of component
};
```

### 5. **File Upload to Server**

For file uploads, use FormData:

```javascript
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.fileUrl;
};
```

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. **Update package.json**

Already configured:

```json
{
  "homepage": "https://yourusername.github.io/quick-help",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. **Deploy**

```powershell
npm run deploy
```

### Deploy to Vercel

1. **Install Vercel CLI**

```powershell
npm install -g vercel
```

2. **Deploy**

```powershell
vercel
```

Follow the prompts to complete deployment.

### Deploy to Netlify

1. **Install Netlify CLI**

```powershell
npm install -g netlify-cli
```

2. **Build & Deploy**

```powershell
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

Create `.env` file for production:

```env
VITE_API_URL=https://your-api.com
VITE_APP_NAME=Quick Help
VITE_VERSION=2.0.0
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 🧪 Testing

### Add Testing Framework

```powershell
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Update `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest run --coverage"
  }
}
```

### Example Test

Create `src/components/__tests__/FormFieldBuilder.test.jsx`:

```jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormFieldBuilder from "../FormFieldBuilder";

describe("FormFieldBuilder", () => {
  it("renders field types", () => {
    render(<FormFieldBuilder formData={{}} setFormData={() => {}} />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

### 1. Fork the Repository

Click the "Fork" button on GitHub.

### 2. Clone Your Fork

```powershell
git clone https://github.com/your-username/quick-help.git
cd quick-help
```

### 3. Create a Branch

```powershell
git checkout -b feature/my-new-feature
```

### 4. Make Changes

- Write clean, documented code
- Follow existing code style
- Add tests if applicable
- Update documentation

### 5. Commit Changes

```powershell
git add .
git commit -m "Add: My new feature description"
```

### 6. Push to GitHub

```powershell
git push origin feature/my-new-feature
```

### 7. Create Pull Request

Go to GitHub and create a Pull Request from your branch.

### Code Style Guidelines

- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Keep components small and focused
- Use CSS modules or scoped styles

---

## 🐛 Known Issues

- [ ] PDF page count extraction may be inaccurate for complex PDFs
- [ ] Large file uploads (>50MB) may cause performance issues
- [ ] Safari browser compatibility not fully tested
- [ ] Mobile responsive design needs improvement on some pages

See [Issues](https://github.com/nannapad/quick-help/issues) for full list.

---

## 🗺️ Roadmap

### Version 2.1 (Q1 2025)

- [ ] Real-time collaboration
- [ ] Comments on manuals
- [ ] Version control for manuals
- [ ] Advanced search with filters
- [ ] Export manuals to PDF

### Version 2.2 (Q2 2025)

- [ ] Multi-language support (i18n)
- [ ] Dark mode improvements
- [ ] Mobile app (React Native)
- [ ] Admin panel enhancements
- [ ] Analytics dashboard

### Version 3.0 (Q3 2025)

- [ ] Backend API (Node.js/Express)
- [ ] Database integration (MongoDB)
- [ ] User authentication (JWT)
- [ ] File storage (AWS S3)
- [ ] Real-time notifications

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 Quick Help Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Support

- 📧 **Email:** support@quickhelp.com
- 💬 **Discord:** [Join our community](https://discord.gg/quickhelp)
- 📖 **Documentation:** [docs.quickhelp.com](https://docs.quickhelp.com)
- 🐛 **Issues:** [GitHub Issues](https://github.com/nannapad/quick-help/issues)

---

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Vite Team** - For the blazing fast build tool
- **Bootstrap Team** - For the UI components
- **Contributors** - For making this project better

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/nannapad/quick-help?style=social)
![GitHub forks](https://img.shields.io/github/forks/nannapad/quick-help?style=social)
![GitHub issues](https://img.shields.io/github/issues/nannapad/quick-help)
![GitHub pull requests](https://img.shields.io/github/issues-pr/nannapad/quick-help)

---

<div align="center">

**Made with ❤️ by the Quick Help Team**

[⬆ Back to Top](#-quick-help---manual-management-system)

</div>
