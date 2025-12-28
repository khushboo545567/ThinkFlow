# ThinkFlow

**ThinkFlow** is a full-stack content sharing platform built using the MERN stack. It allows users to express their thoughts, share experiences, and write posts across various topics such as education, health, technology, and more. The platform supports role-based access control (RBAC) to manage permissions and ensure secure content moderation.

---

## Project Overview

ThinkFlow enables users to create, manage, and engage with posts in a structured and interactive way. Users can follow authors, like and comment on posts, save content for later, and filter posts by categories. Admins have advanced control over roles and permissions, making the platform scalable and secure.

---

## Live Demo
Live URL: [Not deployed yet.]
GitHub Repository: https://github.com/khushboo545567/Civic-Track

---

## Features

### User Features
- User authentication (Register & Login)
- Create, edit, and delete posts
- Like and comment on posts
- Save posts for later reading
- Follow authors and view followed authors’ posts in the feed
- Filter posts by categories (Education, Health, Technology, etc.)
- View post engagement status (likes, comments)

### Role-Based Access Control (RBAC)
- Predefined roles: **Admin**, **Editor**, and **User**
- Admin can:
  - Create new roles
  - Define and manage permissions
  - Assign roles to users
- Editors can manage content based on assigned permissions
- Users have limited access based on their role

---

## Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication & Security
- JWT-based authentication
- Role-Based Access Control (RBAC)

---

## Categories Supported

- Education
- Health
- Technology
- General
- (Extendable for future categories)

---

## How to Run the Project Locally

### Prerequisites
- Node.js
- MongoDB
- Git

### Setup
```bash
cd backend
npm install
npm start

cd frontend
npm install
npm run dev
