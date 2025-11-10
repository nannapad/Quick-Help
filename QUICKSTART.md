# 🚀 Quick Start Guide for Developers

This is a quick reference guide to get you started with Quick Help development in minutes.

---

## ⚡ 5-Minute Setup

```powershell
# 1. Clone repository
git clone https://github.com/nannapad/quick-help.git
cd quick-help

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# Visit http://localhost:5173
```

---

## 📁 Key Files to Know

### Most Important Files

| File                                  | What It Does  | When to Edit        |
| ------------------------------------- | ------------- | ------------------- |
| `src/App.jsx`                         | Main routing  | Add new routes      |
| `src/components/FormFieldBuilder.jsx` | Form builder  | Add field types     |
| `src/data/manualdata.jsx`             | Manual CRUD   | Update data logic   |
| `src/pages/createmanual.jsx`          | Create page   | Modify create flow  |
| `src/pages/editmanual.jsx`            | Edit page     | Modify edit flow    |
| `src/index.css`                       | Global styles | Change theme colors |

---

## 🎨 Common Tasks

### Add a New Page

1. **Create page file:**

```powershell
# Create new file
New-Item -Path "src/pages/newpage.jsx" -ItemType File
```

2. **Add page component:**

```jsx
// src/pages/newpage.jsx
import React from "react";
import "./css/newpage.css";

const NewPage = () => {
  return (
    <div className="newpage-container">
      <h1>New Page</h1>
    </div>
  );
};

export default NewPage;
```

3. **Add route in App.jsx:**

```jsx
import NewPage from "./pages/newpage";

// In Routes:
<Route path="/newpage" element={<NewPage />} />;
```

4. **Create CSS file:**

```powershell
New-Item -Path "src/pages/css/newpage.css" -ItemType File
```

### Add a New Component

1. **Create component:**

```jsx
// src/components/MyComponent.jsx
import React from "react";
import "./css/mycomponent.css";

const MyComponent = ({ title, children }) => {
  return (
    <div className="my-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default MyComponent;
```

2. **Use in page:**

```jsx
import MyComponent from "../components/MyComponent";

<MyComponent title="Hello">
  <p>Content here</p>
</MyComponent>;
```

### Add a New Field Type

Edit `src/components/FormFieldBuilder.jsx`:

```javascript
const fieldTypes = [
  // ...existing fields
  {
    id: "myfield",
    icon: "bi-star",
    label: "My Field",
    type: "text",
  },
];
```

### Change Theme Colors

Edit `src/index.css`:

```css
:root {
  --primary: #4285f4; /* Change this */
  --highlight: #5a95f5; /* And this */
  --danger: #ea4335;
  --success: #34a853;
}
```

### Add API Integration

1. **Install axios:**

```powershell
npm install axios
```

2. **Create API service:**

```javascript
// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api.com/api",
});

export const getManuals = () => api.get("/manuals");
export const createManual = (data) => api.post("/manuals", data);
```

3. **Use in component:**

```jsx
import { useEffect, useState } from "react";
import { getManuals } from "../services/api";

const [manuals, setManuals] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const response = await getManuals();
    setManuals(response.data);
  };
  fetchData();
}, []);
```

---

## 🛠️ Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Check code quality       |
| `npm run deploy`  | Deploy to GitHub Pages   |

---

## 📦 Project Structure Quick Reference

```
src/
├── components/          # Reusable UI components
│   ├── FormFieldBuilder.jsx    # ⭐ Form builder
│   ├── navbar.jsx              # Top navigation
│   ├── footer.jsx              # Footer
│   └── css/                    # Component styles
├── pages/              # Application pages
│   ├── createmanual.jsx        # ⭐ Create manual
│   ├── editmanual.jsx          # ⭐ Edit manual
│   ├── feeds.jsx               # ⭐ Browse manuals
│   ├── dashboard.jsx           # User dashboard
│   └── css/                    # Page styles
├── data/               # Data management
│   ├── manualdata.jsx          # ⭐ Manual CRUD
│   └── userdata.jsx            # ⭐ User auth
├── layouts/            # Page layouts
│   └── applayout.jsx           # Main layout
└── App.jsx             # ⭐ Main routing
```

---

## 🎯 Key Concepts

### State Management

```jsx
// Local state
const [state, setState] = useState(initialValue);

// Update state
setState(newValue);
setState((prev) => prev + 1);
```

### Form Data Structure

```javascript
const formData = {
  title: "", // Required
  description: "", // Required for publish
  category: "Programming",
  tags: "",
  uploadPhoto: "",
  thumbnail: "", // Base64 image
  uploadFile: "",
  fileSize: "", // Auto-calculated
  pages: 0, // Auto-calculated
  uploadedFile: null,
  uploadedPhoto: null,
};
```

### Manual Object Structure

```javascript
const manual = {
  id: 12345,
  title: "My Manual",
  description: "Description",
  category: "Programming",
  tags: "react, javascript",
  thumbnail: "url or base64",
  fileSize: "2.5 MB",
  pages: 15,
  status: "draft" | "pending" | "approved" | "rejected",
  author: {
    id: 1,
    name: "User Name",
    email: "user@email.com"
  },
  date: "11/5/2025",
  views: 0,
  downloads: 0,
  uploadedFile: { ... },
  uploadedPhoto: { ... }
};
```

---

## 🔑 Important Functions

### Manual Data Functions

```javascript
// Get all manuals
const manuals = getManuals();

// Get manual by ID
const manual = getManualById(id);

// Get approved manuals
const approved = getApprovedManuals();

// Get user's drafts
const drafts = getUserDrafts(userId);

// Add new manual
addManual(manual);

// Update manual
updateManual(id, updatedManual);

// Delete manual
deleteManual(id);
```

### User Functions

```javascript
// Get current user
const user = getCurrentUser();

// Login
login(email, password);

// Logout
logout();

// Check if logged in
const isLoggedIn = !!getCurrentUser();
```

---

## 🎨 Styling Tips

### Use CSS Variables

```css
.my-component {
  color: var(--text); /* Text color */
  background: var(--bg); /* Background */
  border: 1px solid var(--border);
}

.my-component:hover {
  background: var(--bg-light);
}
```

### Common Patterns

```css
/* Card style */
.card {
  background: var(--bg-light);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
}

/* Button style */
.button {
  background: var(--primary);
  color: white;
  padding: 10px 24px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.button:hover {
  background: var(--highlight);
}
```

---

## 🐛 Debugging Tips

### Check Console

```javascript
console.log("Data:", data);
console.table(manuals);
console.error("Error:", error);
```

### React DevTools

Install React DevTools browser extension to inspect components.

### Common Issues

**Issue:** Page not found

- Check route in `App.jsx`
- Check component import

**Issue:** Styles not applying

- Check CSS file import
- Check class name spelling
- Check CSS specificity

**Issue:** State not updating

- Check if using `setState` correctly
- Check if effect dependencies are correct

---

## 📚 Learning Resources

- **React:** https://react.dev/learn
- **React Router:** https://reactrouter.com/
- **React Bootstrap:** https://react-bootstrap.github.io/
- **Vite:** https://vite.dev/guide/

---

## 💡 Pro Tips

1. **Use ESLint:** Run `npm run lint` frequently
2. **Component Reuse:** Create reusable components
3. **Keep It Simple:** Start small, iterate
4. **Test Often:** Test in browser after changes
5. **Read Docs:** Check documentation files
6. **Ask Questions:** Use GitHub Discussions

---

## 🎉 You're Ready!

Start coding and have fun! 🚀

For detailed information, see:

- [README.md](./README.md) - Full documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
- [Documentation files](./AUTO_PAGE_COUNT_FEATURE.md) - Feature docs

---

**Need Help?**

- 💬 Discord: [Join community](https://discord.gg/quickhelp)
- 📧 Email: dev@quickhelp.com
- 🐛 Issues: [GitHub Issues](https://github.com/nannapad/quick-help/issues)
