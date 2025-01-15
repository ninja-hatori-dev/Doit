import React, { useState } from 'react';
import { format } from 'date-fns';
import { Bell,Calendar, PlusCircle, Repeat } from 'lucide-react';
import { Todo } from '../types';

interface TodoInputProps {
  selectedDate: Date;
  onAdd: (todo: Omit<Todo, 'id' | 'completed'>) => void;
}

export default function TodoInput({ selectedDate, onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        priority,
        date: format(selectedDate, 'yyyy-MM-dd'),
      });
      setTitle('');
      setPriority('medium');
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex mb-4 space-x-4">
        <input 
          
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 h-[100px] text-gray-700 dark:text-white bg-transparent px-4 py-2 rounded-lg "
        />
        
      </div>

               <div className='flex justify-between'>
                <div className='flex gap-5 h-4 text-gray-700 dark:text-gray-200'>
                <Bell></Bell>
                   <Calendar>
                    
                   </Calendar>
                   <Repeat></Repeat>
                </div>
                   
               
      <div className='  flex justify-end'>
  
      <select
  value={priority}
  onChange={(e) => setPriority(e.target.value as Todo['priority'])}
  className="px-4 pl-4 bg-green-200 dark:bg-green-800 dark:text-white rounded-lg"
>
  <option className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" value="low">
    Low Priority
  </option>
  <option className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" value="medium">
    Medium Priority
  </option>
  <option className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" value="high">
    High Priority
  </option>
</select>
          <div className='mr-2'></div>
          <button
            type="submit"
          className="px-6 py-2 bg-green-200 dark:bg-green-800 text-[rgba(53, 121, 55, 1)] dark:text-white rounded-lg hover:bg-[rgba(53, 12, 55, 0.16)] flex items-center space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Task</span>
          </button>
          
     </div>
      </div>
      





    </form>
  );
}