import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PATCH(
  request: Request,
  params: any
) {
  try {
    const body = await request.json();
    const { title, description, status } = body;
    const p = await params;

    const { id } = (await p.params);

    const result = await query(
      'UPDATE tasks SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), updated_at = NOW() WHERE id = $4 RETURNING *',
      [title, description, status, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  params: any
) {
  try {
    const p = await params;
    const { id } =  (await p.params);

    const result = await query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
