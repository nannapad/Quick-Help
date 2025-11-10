# Changelog

All notable changes to Quick Help will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-01-26

### 🎉 Major Release - Auto Page Count & Complete Feature Set

#### Added

- ✨ **Auto Page Count Feature** - Automatically calculates page count from uploaded files
  - PDF files: Parses PDF structure and counts pages accurately
  - Other files (DOC, DOCX, TXT): Estimates based on file size
  - Visual display with file icon and proper singular/plural formatting
- 📁 **File Upload System** - Upload PDF, DOC, DOCX, TXT files
  - Auto-calculates file size in MB
  - Displays file info with success icon
  - Stores file metadata
- 🖼️ **Photo Upload Feature** - Custom thumbnail upload
  - Supports all image formats
  - Base64 encoding for storage
  - Live preview (120×80px)
  - Auto-assigns as manual thumbnail
- 💾 **Save Draft Functionality** - Save work in progress
  - Minimal validation (Title only)
  - Yellow "DRAFT" badge on cards
  - Private drafts (only creator can see)
  - Resume editing anytime
- 👁️ **Preview Mode** - Preview before publishing
  - Opens in new tab
  - Yellow "PREVIEW MODE" banner
  - Shows exact appearance
  - Disabled action buttons
- 🏷️ **Draft Badge System** - Visual draft indicators
  - Yellow badge with pencil icon
  - Click-to-edit functionality
  - Dashboard status column with color-coded badges
- 🔒 **Draft Privacy** - Secure draft access
  - Two-layer security: status + ownership
  - Users only see their own drafts
  - Admin can see all drafts

#### Changed

- 🔄 Removed manual "Pages" field from form builder (now auto-calculated)
- 🎨 Updated FormFieldBuilder with 6 field types (was 7)
- 📝 Updated helper text to clarify auto-calculation
- 🎯 Improved file upload display with page count

#### Fixed

- 🐛 Fixed page count accuracy for PDF files
- 🐛 Fixed draft visibility in feeds
- 🐛 Fixed edit flow for draft manuals

#### Documentation

- 📚 Added AUTO_PAGE_COUNT_FEATURE.md
- 📚 Added FIELD_TYPES_OVERVIEW.md
- 📚 Added COMPLETE_IMPLEMENTATION_SUMMARY.md
- 📚 Updated README.md with comprehensive documentation
- 📚 Added CONTRIBUTING.md with contribution guidelines
- 📚 Added QUICKSTART.md for quick developer onboarding
- 📚 Added CHANGELOG.md (this file)

---

## [1.5.0] - 2024-12-15

### Draft & Preview Features

#### Added

- 💾 Save Draft functionality
- 👁️ Preview Mode
- 🏷️ Draft badges in feeds
- 🔒 Draft privacy controls
- 📊 Status tracking in dashboard

#### Changed

- 🎨 Updated dashboard with status column
- 🎯 Improved manual creation flow

#### Documentation

- 📚 Added DRAFT_PREVIEW_FEATURES.md
- 📚 Added DRAFT_BADGE_FEATURE.md
- 📚 Added DRAFT_PRIVACY_VERIFICATION.md

---

## [1.4.0] - 2024-12-01

### Photo Upload Feature

#### Added

- 🖼️ Upload Photo field type
- 📸 Base64 image encoding
- 🎨 Live thumbnail preview
- 🔄 Auto-assign uploaded photo as thumbnail

#### Changed

- 🎯 Updated FormFieldBuilder with photo upload support
- 🎨 Enhanced CSS for photo display

#### Documentation

- 📚 Added PHOTO_UPLOAD_FEATURE.md
- 📚 Added PHOTO_UPLOAD_SUMMARY.md

---

## [1.3.0] - 2024-11-15

### File Upload Feature

#### Added

- 📁 Upload File field type
- 📊 Auto file size calculation
- ✅ File validation (.pdf, .doc, .docx, .txt)
- 📋 File info display

#### Changed

- 🔄 Replaced "File Size" text field with file upload
- 🎨 Updated form builder UI

#### Documentation

- 📚 Added FILE_UPLOAD_FEATURE.md
- 📚 Added FILE_UPLOAD_QUICK_START.md

---

## [1.2.0] - 2024-11-01

### Form Builder Enhancement

#### Added

- 🎨 Drag-and-drop form builder
- 📝 7 field types (Title, Description, Category, Photo, File, Pages, Tags)
- 🎯 Field type sidebar
- 🖱️ Drag-and-drop reordering

#### Changed

- 🔄 Refactored CreateManual page to use FormFieldBuilder
- 🔄 Refactored EditManual page to use FormFieldBuilder

#### Documentation

- 📚 Added FormFieldBuilder component documentation

---

## [1.1.0] - 2024-10-15

### Core Features

#### Added

- 📖 Manual creation page
- ✏️ Manual editing page
- 📋 Manual detail page
- 🏠 Feeds page (browse manuals)
- 📊 Dashboard page
- 👤 User profile settings
- 📝 Feedback page
- 🔐 Login/authentication

#### Changed

- 🎨 Improved UI/UX across all pages
- 🎯 Enhanced navigation

---

## [1.0.0] - 2024-10-01

### Initial Release

#### Added

- ⚛️ React 19.1.1 setup
- ⚡ Vite 7.1.7 build tool
- 🎨 React Bootstrap 2.10.10
- 🧭 React Router DOM 7.9.4
- 🎨 Google Forms-inspired design
- 📱 Responsive layout
- 🌐 Basic routing
- 🎯 App layout structure
- 🧩 Navbar and Footer components
- 🏠 Home page
- 🔐 Basic authentication

---

## Version History Summary

| Version | Date       | Description                         |
| ------- | ---------- | ----------------------------------- |
| 2.0.0   | 2025-01-26 | Auto page count & complete features |
| 1.5.0   | 2024-12-15 | Draft & preview features            |
| 1.4.0   | 2024-12-01 | Photo upload feature                |
| 1.3.0   | 2024-11-15 | File upload feature                 |
| 1.2.0   | 2024-11-01 | Form builder enhancement            |
| 1.1.0   | 2024-10-15 | Core features                       |
| 1.0.0   | 2024-10-01 | Initial release                     |

---

## Upcoming Releases

### [2.1.0] - Planned Q1 2025

#### Planned Features

- [ ] Real-time collaboration
- [ ] Comments on manuals
- [ ] Version control
- [ ] Advanced search
- [ ] Export to PDF

### [2.2.0] - Planned Q2 2025

#### Planned Features

- [ ] Multi-language support (i18n)
- [ ] Dark mode improvements
- [ ] Mobile app (React Native)
- [ ] Admin panel enhancements
- [ ] Analytics dashboard

### [3.0.0] - Planned Q3 2025

#### Planned Features

- [ ] Backend API (Node.js/Express)
- [ ] Database integration (MongoDB)
- [ ] User authentication (JWT)
- [ ] File storage (AWS S3)
- [ ] Real-time notifications
- [ ] Email notifications
- [ ] Advanced permissions

---

## Legend

- ✨ New feature
- 🔄 Changed feature
- 🐛 Bug fix
- 🚀 Performance improvement
- 📚 Documentation
- 🎨 UI/UX improvement
- 🔒 Security improvement
- ⚡ Performance
- 📝 Content
- 🧪 Testing

---

## Migration Guides

### Migrating from 1.x to 2.0

#### Breaking Changes

- Manual "Pages" field removed from form builder
  - Now automatically calculated from uploaded files
  - Existing manuals retain their page counts
  - New manuals use auto-calculation

#### New Features to Integrate

1. Remove manual page count entry from your forms
2. File upload now returns page count in metadata
3. Draft system requires user authentication
4. Preview mode requires Title + Description

#### Code Changes Required

None - All changes are backward compatible.

#### Data Migration

No data migration required. Existing page counts are preserved.

---

## Support

For questions about any version:

- 📧 **Email:** support@quickhelp.com
- 💬 **Discord:** [Join community](https://discord.gg/quickhelp)
- 🐛 **Issues:** [GitHub Issues](https://github.com/nannapad/quick-help/issues)

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to contribute to Quick Help.

---

**Last Updated:** January 26, 2025  
**Current Version:** 2.0.0  
**Status:** Stable ✅
