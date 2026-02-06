#!/bin/bash

echo "🚀 Setting up Task Manager..."

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install it first."
    exit 1
fi

echo "✅ PostgreSQL found"

# Create database if it doesn't exist
echo "📊 Creating database..."
sudo -u postgres psql -c "CREATE DATABASE taskmanager;" 2>/dev/null || echo "Database already exists"

# Initialize schema
echo "🗄️ Initializing database schema..."
sudo -u postgres psql -d taskmanager -f init.sql

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"
