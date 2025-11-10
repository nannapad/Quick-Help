# 🏗️ Project Architecture & Flow Diagrams

Visual guide to Quick Help's architecture, data flow, and component relationships.

---

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Quick Help                            │
│                   Manual Management System                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         Frontend (React + Vite)         │
        └─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│  Components   │       │     Pages     │
│  (Reusable)   │       │  (Routed)     │
└───────────────┘       └───────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │    Data Layer         │
        │  (Mock Data/State)    │
        └───────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│ Manual Data   │       │  User Data    │
│  (manualdata) │       │  (userdata)   │
└───────────────┘       └───────────────┘
```

---

## 🔄 Application Flow

### User Journey - Creating a Manual

```
┌──────────┐
│  Login   │
└────┬─────┘
     │
     ▼
┌──────────────┐
│  Dashboard   │
└────┬─────────┘
     │
     ▼
┌────────────────────┐
│  Create Manual     │
│  (FormFieldBuilder)│
└────┬───────────────┘
     │
     ├─────────────┐
     ▼             ▼
┌─────────┐   ┌──────────┐
│ Draft   │   │ Preview  │
└────┬────┘   └────┬─────┘
     │             │
     ▼             ▼
┌─────────────────────┐
│   Submit Manual     │
└────┬────────────────┘
     │
     ▼
┌──────────────┐
│  Dashboard   │
│ (View Status)│
└──────────────┘
```

### Draft System Flow

```
┌───────────────┐
│ Create Manual │
└───────┬───────┘
        │
        ▼
    [Has Title?] ───No──> Show Error
        │
       Yes
        │
        ▼
┌───────────────┐
│  Save Draft   │
│ (status: draft)│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Store in DB  │
│ (with user ID)│
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Show in Feeds │
│ (Private to   │
│   Creator)    │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Click to Edit │
│ (Resume Draft)│
└───────────────┘
```

---

## 🧩 Component Hierarchy

```
App.jsx
│
├── AppLayout
│   │
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation Links
│   │   └── User Menu
│   │
│   ├── Main Content Area
│   │   │
│   │   ├── Home
│   │   │
│   │   ├── Login
│   │   │
│   │   ├── Feeds
│   │   │   ├── Manual Cards (with Draft Badges)
│   │   │   └── Category Filter
│   │   │
│   │   ├── CreateManual
│   │   │   ├── FormFieldBuilder
│   │   │   │   ├── Field Types Sidebar
│   │   │   │   ├── Form Canvas
│   │   │   │   └── Field Items (draggable)
│   │   │   ├── Save Draft Button
│   │   │   └── Preview Button
│   │   │
│   │   ├── EditManual
│   │   │   ├── FormFieldBuilder
│   │   │   ├── Save Draft Button
│   │   │   └── Preview Button
│   │   │
│   │   ├── PreviewManual
│   │   │   ├── Preview Banner
│   │   │   └── Manual Detail (Read-Only)
│   │   │
│   │   ├── ManualDetail
│   │   │   ├── Manual Info
│   │   │   ├── Action Buttons
│   │   │   └── Comments
│   │   │
│   │   ├── Dashboard
│   │   │   ├── Stats Cards
│   │   │   ├── Manual Table (with Status)
│   │   │   └── Analytics
│   │   │
│   │   └── ProfileSettings
│   │
│   ├── Footer
│   │   ├── Links
│   │   └── Copyright
│   │
│   └── Chatbot (optional)
```

---

## 📊 Data Flow Diagram

### Manual Creation Flow

```
User Input
    │
    ▼
┌─────────────────┐
│  FormFieldBuilder│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Form Data     │
│   (React State) │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ Draft  │ │ Preview  │
└───┬────┘ └────┬─────┘
    │           │
    ▼           ▼
┌──────────────────┐
│  Validate Data   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Create Manual   │
│   Object         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Add to Array    │
│  (MANUAL_DATA)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update UI       │
│  (Feeds/Dashboard)│
└──────────────────┘
```

### File Upload Flow

```
User Selects File
    │
    ▼
┌──────────────────┐
│  handleFileUpload │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ PDF?    │
    ├─────────┤
   Yes       No
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│ Parse  │ │ Estimate │
│ PDF    │ │ Pages    │
└───┬────┘ └────┬─────┘
    │           │
    └─────┬─────┘
          ▼
┌──────────────────┐
│  Calculate Size  │
│  & Page Count    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Update Form Data│
│  - uploadFile    │
│  - fileSize      │
│  - pages         │
│  - uploadedFile  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Display Info    │
│  (Name, Size,    │
│   Page Count)    │
└──────────────────┘
```

---

## 🗂️ Data Models

### Manual Object

```javascript
Manual {
  id: number,              // Unique identifier
  title: string,           // Required
  description: string,     // Required for publish
  category: string,        // "Programming", "Design", etc.
  tags: string,           // Comma-separated
  thumbnail: string,      // URL or Base64
  fileSize: string,       // "2.5 MB"
  pages: number,          // Auto-calculated
  status: string,         // "draft" | "pending" | "approved" | "rejected"
  author: User,           // User object
  date: string,           // "11/5/2025"
  views: number,          // View count
  downloads: number,      // Download count
  uploadedFile: FileInfo, // File metadata
  uploadedPhoto: PhotoInfo // Photo metadata
}
```

### User Object

```javascript
User {
  id: number,             // Unique identifier
  name: string,           // Full name
  email: string,          // Email address
  role: string,          // "admin" | "user"
  avatar: string,        // Avatar URL
  joinDate: string       // Date joined
}
```

### File Info Object

```javascript
FileInfo {
  name: string,           // "document.pdf"
  size: string,           // "2.50 MB"
  type: string,           // "application/pdf"
  pageCount: number,      // Auto-calculated
  lastModified: number    // Timestamp
}
```

### Photo Info Object

```javascript
PhotoInfo {
  name: string,           // "thumbnail.jpg"
  size: string,           // "0.45 MB"
  type: string,           // "image/jpeg"
  preview: string,        // Base64 image data
  lastModified: number    // Timestamp
}
```

---

## 🔐 Authentication Flow

```
┌──────────────┐
│  Login Page  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  Enter Credentials│
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│  Validate User   │
└──────┬───────────┘
       │
  ┌────┴────┐
 Yes        No
  │          │
  ▼          ▼
┌───────┐  ┌──────┐
│ Login │  │ Error│
└───┬───┘  └──────┘
    │
    ▼
┌──────────────────┐
│ Store User in    │
│ localStorage     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Set Current User │
│ in Context       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Redirect to      │
│ Dashboard        │
└──────────────────┘
```

---

## 🎨 State Management

### Global State (localStorage)

```
localStorage
│
├── currentUser          // Current logged-in user
├── previewManual        // Manual being previewed
└── theme                // (future) Dark/light mode
```

### Component State

```javascript
// CreateManual.jsx / EditManual.jsx
useState({
  newManual: {
    // Form data
    title: "",
    description: "",
    category: "",
    // ...other fields
  },
  showDraftAlert: false,
  showPreviewAlert: false,
  error: null,
});

// Feeds.jsx
useState({
  manuals: [], // All manuals
  userDrafts: [], // User's drafts
  filter: "all",
  searchQuery: "",
});

// Dashboard.jsx
useState({
  userManuals: [], // User's manuals
  stats: {
    total: 0,
    approved: 0,
    pending: 0,
    drafts: 0,
  },
});
```

---

## 🔀 Routing Structure

```
/                       → Home
/login                  → Login
/feeds                  → Feeds (Browse Manuals)
/create-manual          → Create Manual
/edit-manual/:id        → Edit Manual
/manual/:id             → Manual Detail
/preview-manual         → Preview Manual
/dashboard              → User Dashboard
/profile-settings       → Profile Settings
/feedback               → Feedback
```

### Protected Routes

```
Private Routes (Require Login):
├── /create-manual
├── /edit-manual/:id
├── /dashboard
└── /profile-settings

Public Routes:
├── /
├── /login
├── /feeds
└── /manual/:id
```

---

## 📱 Responsive Breakpoints

```
Mobile:    0px - 575px
Tablet:    576px - 767px
Desktop:   768px - 991px
Large:     992px - 1199px
XLarge:    1200px+
```

### Layout Changes

```
Mobile (< 768px)
├── Navbar: Hamburger menu
├── Sidebar: Hidden
├── Form: Single column
└── Cards: Stacked

Tablet (768px - 991px)
├── Navbar: Full menu
├── Sidebar: Collapsible
├── Form: Single column
└── Cards: 2 columns

Desktop (> 992px)
├── Navbar: Full menu
├── Sidebar: Always visible
├── Form: Two columns
└── Cards: 3 columns
```

---

## 🚀 Performance Optimization

### Code Splitting

```
App.jsx (Main Bundle)
│
├── Home (Lazy Load)
├── Feeds (Lazy Load)
├── CreateManual (Lazy Load)
├── EditManual (Lazy Load)
└── Dashboard (Lazy Load)
```

### Optimization Strategies

1. **Lazy Loading**

   ```javascript
   const Home = lazy(() => import("./pages/home"));
   ```

2. **Memoization**

   ```javascript
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   ```

3. **Debouncing**
   ```javascript
   const debouncedSearch = useCallback(
     debounce((query) => search(query), 300),
     []
   );
   ```

---

## 🎯 Future Architecture (v3.0)

```
┌─────────────────────────────────────────────┐
│              Frontend (React)                │
└───────────────────┬─────────────────────────┘
                    │
                    ▼
        ┌───────────────────────┐
        │      API Gateway      │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│  REST API     │       │  GraphQL API  │
│  (Node.js)    │       │  (Optional)   │
└───────┬───────┘       └───────┬───────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │   Business Logic      │
        └───────────┬───────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌───────────────┐       ┌───────────────┐
│   Database    │       │ File Storage  │
│  (MongoDB)    │       │   (AWS S3)    │
└───────────────┘       └───────────────┘
```

---

## 📚 Resources

- **React Docs:** https://react.dev/
- **Vite Docs:** https://vite.dev/
- **React Router:** https://reactrouter.com/
- **React Bootstrap:** https://react-bootstrap.github.io/

---

**Last Updated:** January 26, 2025  
**Version:** 2.0.0
