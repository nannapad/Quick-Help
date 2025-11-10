# Contributing to Quick Help

Thank you for considering contributing to Quick Help! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Be respectful and considerate
- Welcome diverse perspectives and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Unprofessional conduct

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```powershell
git clone https://github.com/your-username/quick-help.git
cd quick-help
```

### 3. Add Upstream Remote

```powershell
git remote add upstream https://github.com/nannapad/quick-help.git
```

### 4. Install Dependencies

```powershell
npm install
```

### 5. Create a Branch

```powershell
git checkout -b feature/your-feature-name
```

Branch naming conventions:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes

---

## 🔄 Development Workflow

### 1. Keep Your Fork Updated

```powershell
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Make Your Changes

- Write clean, well-documented code
- Follow the coding standards (see below)
- Test your changes thoroughly
- Update documentation if needed

### 3. Run Tests

```powershell
npm run lint        # Check code style
npm run dev         # Test in development mode
npm run build       # Test production build
```

### 4. Commit Your Changes

Follow the commit message guidelines (see below).

```powershell
git add .
git commit -m "Add: Brief description of changes"
```

### 5. Push to Your Fork

```powershell
git push origin feature/your-feature-name
```

### 6. Create a Pull Request

Go to GitHub and create a Pull Request from your branch to the main repository.

---

## 📝 Coding Standards

### JavaScript/React Guidelines

#### 1. **Use Functional Components**

✅ **Good:**

```jsx
const MyComponent = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);
  return <div>{/* JSX */}</div>;
};
```

❌ **Avoid:**

```jsx
class MyComponent extends React.Component {
  // Class components
}
```

#### 2. **Use Descriptive Names**

✅ **Good:**

```javascript
const [isLoading, setIsLoading] = useState(false);
const [manuals, setManuals] = useState([]);
const handleFileUpload = (file) => {
  /* ... */
};
```

❌ **Avoid:**

```javascript
const [flag, setFlag] = useState(false);
const [data, setData] = useState([]);
const fn = (f) => {
  /* ... */
};
```

#### 3. **Component Structure**

```jsx
import React, { useState, useEffect } from "react";
import "./css/mycomponent.css";

// 1. Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // 2. State declarations
  const [state1, setState1] = useState(null);
  const [state2, setState2] = useState([]);

  // 3. Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // 4. Event handlers
  const handleClick = () => {
    // Handler logic
  };

  // 5. Helper functions
  const calculateValue = () => {
    // Helper logic
  };

  // 6. Return JSX
  return <div className="my-component">{/* JSX content */}</div>;
};

export default MyComponent;
```

#### 4. **Props Validation**

Use PropTypes (optional but recommended):

```jsx
import PropTypes from "prop-types";

MyComponent.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
  prop3: PropTypes.arrayOf(PropTypes.object),
};

MyComponent.defaultProps = {
  prop2: 0,
  prop3: [],
};
```

#### 5. **Destructuring**

✅ **Good:**

```jsx
const { title, description, author } = manual;
const { id, name } = author;
```

❌ **Avoid:**

```jsx
const title = manual.title;
const description = manual.description;
```

### CSS Guidelines

#### 1. **Use CSS Variables**

```css
:root {
  --primary: #4285f4;
  --text: #202124;
  --bg: #ffffff;
}

.my-component {
  color: var(--text);
  background: var(--bg);
}
```

#### 2. **BEM Naming Convention**

```css
/* Block */
.form-field {
}

/* Element */
.form-field__label {
}
.form-field__input {
}

/* Modifier */
.form-field--required {
}
.form-field--error {
}
```

#### 3. **Responsive Design**

```css
/* Mobile first */
.component {
  padding: 16px;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: 24px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: 32px;
  }
}
```

### File Organization

```
src/
├── components/
│   ├── MyComponent.jsx       # Component logic
│   └── css/
│       └── mycomponent.css   # Component styles
├── pages/
│   ├── mypage.jsx           # Page logic
│   └── css/
│       └── mypage.css       # Page styles
└── data/
    └── mydata.jsx           # Data/state management
```

---

## 💬 Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **Add:** New feature or functionality
- **Fix:** Bug fix
- **Update:** Update existing feature
- **Remove:** Remove feature or code
- **Refactor:** Code refactoring (no functional changes)
- **Docs:** Documentation changes
- **Style:** Code style changes (formatting, whitespace)
- **Test:** Adding or updating tests
- **Chore:** Maintenance tasks

### Examples

✅ **Good:**

```
Add: User authentication with JWT

- Implement login/logout functionality
- Add protected routes
- Store auth token in localStorage

Closes #123
```

```
Fix: Page count extraction from PDF files

The regex pattern was not matching all PDF page markers.
Updated to handle edge cases.

Fixes #456
```

❌ **Avoid:**

```
fixed stuff
```

```
update
```

### Rules

1. Use present tense ("Add feature" not "Added feature")
2. Keep subject line under 50 characters
3. Capitalize first letter of subject
4. Don't end subject with period
5. Add detailed description in body if needed
6. Reference issues/PRs in footer

---

## 🔀 Pull Request Process

### Before Creating a PR

- [ ] Code follows project coding standards
- [ ] All tests pass (`npm run lint`)
- [ ] Code builds successfully (`npm run build`)
- [ ] Documentation updated if needed
- [ ] Commits follow commit guidelines
- [ ] Branch is up to date with main

### PR Title Format

Same as commit message format:

```
Add: Brief description of changes
```

### PR Description Template

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Changes Made

- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)

[Add screenshots here]

## Testing

Describe how you tested these changes.

## Related Issues

Closes #123
Relates to #456

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
```

### Review Process

1. **Automated Checks:** PR must pass all automated checks
2. **Code Review:** At least one maintainer must review
3. **Testing:** Changes must be tested
4. **Approval:** PR must be approved before merging
5. **Merge:** Maintainer will merge the PR

### After PR is Merged

1. Delete your branch on GitHub
2. Delete local branch:
   ```powershell
   git checkout main
   git pull upstream main
   git branch -d feature/your-feature-name
   ```

---

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** - Check if bug is already reported
2. **Try latest version** - Update to latest version and test
3. **Isolate the issue** - Try to reproduce in isolation

### Bug Report Template

```markdown
## Bug Description

Clear and concise description of the bug.

## Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior

What you expected to happen.

## Actual Behavior

What actually happened.

## Screenshots

If applicable, add screenshots.

## Environment

- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 2.0.0]

## Additional Context

Any other relevant information.
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description

Clear and concise description of the feature.

## Problem Statement

What problem does this feature solve?

## Proposed Solution

How should this feature work?

## Alternatives Considered

What other solutions did you consider?

## Use Cases

1. Use case 1
2. Use case 2

## Additional Context

Any other relevant information.
```

---

## 🏆 Recognition

Contributors will be:

- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Thanked on our website

---

## 📞 Questions?

- **Discord:** [Join our community](https://discord.gg/quickhelp)
- **Email:** dev@quickhelp.com
- **Discussions:** [GitHub Discussions](https://github.com/nannapad/quick-help/discussions)

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

Thank you for contributing to Quick Help! 🎉
