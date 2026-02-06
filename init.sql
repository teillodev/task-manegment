-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- Insert some sample data
INSERT INTO tasks (title, description, status) VALUES
    ('Setup project', 'Initialize Next.js project with PostgreSQL', 'done'),
    ('Create database schema', 'Design and implement database tables', 'done'),
    ('Build API endpoints', 'Create REST API for CRUD operations', 'testing'),
    ('Design UI', 'Create task board interface', 'ready_for_testing'),
    ('Add authentication', 'Implement user authentication system', 'inprogress'),
    ('Write tests', 'Add unit and integration tests', 'todo'),
    ('Deploy to production', 'Setup CI/CD and deploy', 'todo');
