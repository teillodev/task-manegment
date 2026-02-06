import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, status } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const result = await query(
      'INSERT INTO tasks (title, description, status) VALUES ($1, $2, $3) RETURNING *',
      [title, description || '', status || 'todo']
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
