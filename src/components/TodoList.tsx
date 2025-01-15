import { Trash2, CheckSquare, Square, Star } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  view: 'list' | 'grid';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdatePriority: (id: string, priority: Todo['priority']) => void;
  onSelect: (todo: Todo) => void;
}

export default function TodoList({
  todos,
  view,
  onToggle,
  onDelete,
  onUpdatePriority,
  onSelect,
}: TodoListProps) {
  const priorityColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  // Separate and sort todos by completion status
  const sortedTodos = [
    ...todos.filter((todo) => !todo.completed),
    ...todos.filter((todo) => todo.completed),
  ];

  if (view === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTodos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => onSelect(todo)}
            className="bg-white mt-3 dark:bg-customDark p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle(todo.id);
                  }}
                >
                  {todo.completed ? (
                    <CheckSquare className="h-5 w-5 text-green-500" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <span
                  className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}
                >
                  {todo.title}
                </span>
              </div>
              <Star
                className={`h-5 w-5 ${
                  todo.priority === 'high'
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdatePriority(todo.id, todo.priority === 'high' ? 'medium' : 'high');
                }}
              />
            </div>
            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}
              >
                {todo.priority}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(todo.id);
                }}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className=""> {/* Parent div added */}
        {sortedTodos.map((todo) => (
          <div>
            <div className='bg-slate-300 dark:bg-slate-700 h-[1px]'></div>
          <div
            key={todo.id}
            onClick={() => onSelect(todo)}
            className={`flex items-center justify-between mt-1 mb-1 p-4 ${todo.completed ? `p-4` : ``} bg-white dark:bg-customDark cursor-pointer hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(todo.id);
                }}
              >
                {todo.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-500" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
              </button>
              <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                {todo.title}
              </span>
            </div>
  
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[todo.priority]}`}>
                {todo.priority}
              </span>
              <Star
                className={`h-5 w-5 ${
                  todo.priority === 'high'
                    ? 'text-yellow-500 fill-current'
                    : 'text-gray-400'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onUpdatePriority(todo.id, todo.priority === 'high' ? 'medium' : 'high');
                }}
              />
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}