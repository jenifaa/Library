# 📚 Library Management System

A modern, full-stack Library Management System built with React, TypeScript, Node.js, Express, and MongoDB. This application provides a comprehensive solution for managing book inventory, handling borrow/return operations, and offering a seamless user experience for both librarians and readers.


## 🎯 Overview

The Library Management System is designed to streamline library operations with a focus on user experience and administrative efficiency. It features a responsive web interface for patrons to browse and borrow books, while providing librarians with powerful tools for inventory management, user management, and analytics.

### ✨ Key Features

- **📖 Book Management** - Complete CRUD operations for library inventory
- **👥 User Management** - Borrower registration and profile management
- **🔄 Borrow & Return System** - Efficient book lending and return tracking
- **📊 Real-time Analytics** - Dashboard with library statistics and insights
- **🔍 Advanced Search** - Find books by title, author, genre, or ISBN
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **🎨 Modern UI/UX** - Clean, intuitive interface with smooth animations
- **🔒 Secure Authentication** - Protected routes and data validation
- **📄 Pagination** - Efficient data loading for large book collections
- **💰 Fine Management** - Automated fine calculation for overdue books

## 🏗️ System Architecture

### Frontend (Client)
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for modern, responsive styling
- **React Hook Form** for efficient form handling and validation
- **React Router** for seamless navigation
- **Redux Toolkit Query** for state management and API calls
- **Lucide React** for beautiful icons
- **React Toastify** for user notifications

### Backend (Server)
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM for database operations
- **CORS** enabled for cross-origin requests
- **RESTful API** design with proper HTTP status codes
- **Environment variables** for secure configuration

## 📁 Project Structure

```
library-management-system/
├── client/ # Frontend React application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── store/ # Redux store and API slices
│ │ ├── types/ # TypeScript type definitions
│ │ └── utils/ # Utility functions
│ └── package.json
├── server/ # Backend Node.js application
│ ├── models/ # MongoDB models
│ ├── routes/ # Express routes
│ └── package.json
└── README.md

```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/jenifaa/library-management-system.git
   cd library-management-system
   ```
2. **Backend Setup**
```
cd server
npm install
```
3. **Environment Configuration**
Create a .env file in the server directory:

```env
PORT=5000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.5lka3.mongodb.net/libraryDB
```
4. **Start the backend sever**

```bash
npm run dev
Server will run on http://localhost:5000
```

5. **Frontend Setup**

```bash
cd ../client
npm install
```
6. **Start the Frontend Development Server**


```bash
npm run dev
Client will run on http://localhost:5173
```

7. **🗄️ Database Models**

### Book Schema

javascript
{
  title: String,
  author: String,
  genre: String,
  ISBN: String,
  description: String,
  copies: Number,
  isAvailable: Boolean
}

### Borrow Record Schema

javascript
{
  bookId: ObjectId,
  bookTitle: String,
  borrowerName: String,
  borrowerEmail: String,
  borrowerId: String,
  borrowDate: Date,
  dueDate: Date,
  quantity: Number,
  returnDate: Date,
  status: String, // 'borrowed', 'returned', 'overdue'
  fineAmount: Number
}


**🔌 API Endpoints**

**Books Management**

```
GET /books - Get paginated books list

GET /books/:id - Get single book details

POST /create-book - Add new book to library

PUT /edit-book/:id - Update book information

DELETE /books/:id - Remove book from library
```

**Borrow Management**

```
POST /borrow-book - Create new borrow record

GET /borrow-summery - Get all borrow records
```



### 🎨 UI Components

**The system uses a custom component library built with:**

Shadcn/UI components for consistent design

Tailwind CSS for utility-first styling

Custom form components with validation

Responsive tables for data display

Modal dialogs for user interactions

Calendar components for date selection

### 📊 Key Pages

**Public Pages**

Homepage - Featured books and library introduction

Books Catalog - Browse all available books with search and filters

Book Details - Detailed book information with borrowing option

Testimonials - User reviews and feedback

Management Pages
Books Table - Administrative book management with CRUD operations

Borrow Records - Track all borrowing activities

Borrow Form - Complete borrowing process with validation

### 🔧 Development Features

**Frontend Development**

Hot reloading for rapid development

TypeScript for type safety

ESLint and Prettier for code quality

Component-based architecture

**Backend Development**

RESTful API design

Error handling middleware

CORS configuration

MongoDB connection pooling



### 🚀 Deployment

**Backend Deployment (Vercel)**
```
Set environment variables in deployment platform

Connect MongoDB Atlas database

Deploy from GitHub repository
```

**Frontend Deployment (Vercel/Netlify/surge)**
```
Build the React application

Configure environment variables

Deploy with continuous integration
```
