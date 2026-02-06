'use client';

import { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const statuses = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-100' },
  { key: 'inprogress', label: 'In Progress', color: 'bg-blue-100' },
  { key: 'ready_for_testing', label: 'Ready for Testing', color: 'bg-yellow-100' },
  { key: 'testing', label: 'Testing', color: 'bg-orange-100' },
  { key: 'done', label: 'Done', color: 'bg-green-100' },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTask) {
        await fetch(`/api/tasks/${editingTask.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }

      setIsModalOpen(false);
      setEditingTask(null);
      setFormData({ title: '', description: '', status: 'todo' });
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusChange = async (task: Task, newStatus: string) => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', status: 'todo' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + New Task
            </button>
          </div>
        </div>
      </header>

      {/* Task Board */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {statuses.map((status) => (
            <div key={status.key} className="flex flex-col">
              <div className={`${status.color} p-3 rounded-t-lg`}>
                <h2 className="font-semibold text-gray-700">{status.label}</h2>
                <span className="text-sm text-gray-600">
                  {tasks.filter((t) => t.status === status.key).length}
                </span>
              </div>
              <div className="bg-white rounded-b-lg shadow p-2 min-h-[500px] space-y-2">
                {tasks
                  .filter((task) => task.status === status.key)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition cursor-pointer"
                    >
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-3">
                          {task.description}
                        </p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(task)}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                        >
                          Delete
                        </button>
                      </div>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task, e.target.value)}
                        className="mt-2 text-xs w-full p-1 border border-gray-300 rounded"
                      >
                        {statuses.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statuses.map((status) => (
                    <option key={status.key} value={status.key}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
