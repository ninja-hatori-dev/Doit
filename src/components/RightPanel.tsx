import { useState } from 'react';
import { Bell, Calendar as CalendarIcon, Repeat, Plus, Trash2, X } from 'lucide-react';
import { Todo } from '../types';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface RightPanelProps {
  selectedTodo: Todo;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export default function RightPanel({ selectedTodo, onClose, onDelete }: RightPanelProps) {
  const [showCalendar, setShowCalendar] = useState(false);
 

  // Update the function to handle Value type from react-calendar
  
  return (
    <div className=" hidden lg:block fixed right-0 top-[64px] w-80 h-[calc(100vh-64px)] bg-customGreen dark:bg-customDark border-l border-gray-200 dark:border-gray-700 p-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          {selectedTodo.title}
        </h2>
      </div>

      <div className="space-y-6">
        <button className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Plus className="h-5 w-5" />
          <span>Add Step</span>
        </button>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5" />
              <span>Add Reminder</span>
            </div>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5" />
                <span>Add Due Date</span>
              </div>
              {selectedTodo.date && (
                <span>{format(selectedTodo.date, 'MMM d, yyyy')}</span>
              )}
            </button>

            {showCalendar && (
              <div className="absolute z-50 mt-2 bg-white dark:bg-customDark rounded-lg shadow-lg p-2">
                <Calendar
                  onChange={() => {
                    // Handle date change
                    setShowCalendar(false);
                  }}
                  value={selectedTodo.date ? new Date(selectedTodo.date) : new Date()}
                  className="border-0 rounded-lg"
                />
              </div>
            )}
          </div>

          <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Repeat className="h-5 w-5" />
              <span>Add Repeat</span>
            </div>
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Notes
          </label>
          <textarea
            className="w-full mt-4 h-32 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-transparent dark:bg-transparent border-t border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Add notes..."
          />
        </div>

        <div className="fixed bottom-0 gap-7 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-customDark p-4">
          <button
            onClick={onClose}
            className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Created {format(new Date(), 'MMMM d, yyyy')}
          </p>

          <button
            onClick={() => onDelete(selectedTodo.id)}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
