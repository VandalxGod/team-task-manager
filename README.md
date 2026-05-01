# Team Task Manager

This is a full-stack web app I built using the MERN stack where users can create projects, assign tasks to team members, and track progress.

---

## What it does

* Users can sign up and log in
* Admin can create projects and assign tasks
* Tasks can be assigned to multiple users
* Members can update their task status
* Dashboard shows task stats (total, completed, pending, overdue)
* Admin can delete tasks and projects if needed

---

## Tech Stack

* Frontend: React, Tailwind CSS
* Backend: Node.js, Express
* Database: MongoDB
* Auth: JWT

---

## Roles

**Admin**

* Can create and delete projects
* Can assign tasks
* Can see all tasks

**Member**

* Can only see tasks assigned to them
* Can update task status

---

## API Routes

* `/api/auth` → login / register
* `/api/projects` → create & fetch projects
* `/api/tasks` → create, update, delete tasks
* `/api/dashboard` → stats

---

## How to run locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
PORT=5000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Live

* Frontend: https://taskmanager.sumitweb.me
* Backend: https://team-task-manager-sdo8.onrender.com

---

## Notes

This project helped me understand:

* how role-based access works
* how to manage relationships between users, tasks, and projects
* how to deploy a full-stack app

---

## Author

Sumit Singh
