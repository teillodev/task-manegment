# Task Manager

A simple task management application built with Next.js 14 and PostgreSQL, inspired by Jira's board view.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Kanban-style board with 5 columns:
  - To Do
  - In Progress
  - Ready for Testing
  - Testing
  - Done
- ✅ Drag task status with dropdown
- ✅ Modal for creating/editing tasks
- ✅ PostgreSQL database backend
- ✅ Responsive design with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

## Setup Instructions

### 1. Install PostgreSQL

If you don't have PostgreSQL installed:

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [postgresql.org](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE taskmanager;

# Create user (optional, if you want a separate user)
CREATE USER taskuser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE taskmanager TO taskuser;

# Exit
\q
```

### 3. Initialize Database Schema

```bash
# Run the initialization script
psql -U postgres -d taskmanager -f init.sql

# Or if using a custom user:
psql -U taskuser -d taskmanager -f init.sql
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Configure Environment Variables

Update `.env.local` with your database credentials:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/taskmanager
```

Replace `postgres:postgres` with your username:password if different.

### 6. Run the Application

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
task-manager/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET, POST /api/tasks
│   │       └── [id]/
│   │           └── route.ts      # PATCH, DELETE /api/tasks/:id
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main board page
│   └── globals.css               # Global styles
├── lib/
│   └── db.ts                     # Database connection
├── init.sql                      # Database schema
├── .env.local                    # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## API Endpoints

### Get All Tasks
```
GET /api/tasks
```

### Create Task
```
POST /api/tasks
Body: {
  "title": "Task title",
  "description": "Task description",
  "status": "todo"
}
```

### Update Task
```
PATCH /api/tasks/:id
Body: {
  "title": "Updated title",
  "description": "Updated description",
  "status": "inprogress"
}
```

### Delete Task
```
DELETE /api/tasks/:id
```

## Database Schema

```sql
tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'todo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

Valid status values:
- `todo`
- `inprogress`
- `ready_for_testing`
- `testing`
- `done`

## Usage

1. **Create a Task**: Click the "+ New Task" button in the header
2. **Edit a Task**: Click the "Edit" button on any task card
3. **Delete a Task**: Click the "Delete" button on any task card
4. **Change Status**: Use the dropdown on each task card

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **PostgreSQL** - Relational database
- **Tailwind CSS** - Utility-first CSS framework
- **pg** - PostgreSQL client for Node.js

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

**Database connection errors:**
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check your DATABASE_URL in `.env.local`
- Ensure the database exists: `psql -l`

**Port already in use:**
- Change the port: `PORT=3001 npm run dev`

**Module not found errors:**
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Future Enhancements

- Drag and drop between columns
- User authentication
- Task assignments
- Due dates and priorities
- Comments and attachments
- Search and filters
- Dark mode

## License

MIT
