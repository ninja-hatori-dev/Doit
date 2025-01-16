import { useDispatch, useSelector } from 'react-redux';
import { ListTodo, Calendar, Star, Users, Plus } from 'lucide-react';
import { RootState, AppDispatch } from '../store';
import { format } from 'date-fns';
import TodayTasks from './TaskProgress';
import { useEffect, useState } from 'react';
import { fetchWeather } from '../store/weatherSlice';

interface LeftPanelProps {
  selectedView: string;
  onViewChange: (view: string) => void;
}

export default function LeftPanel({ selectedView, onViewChange }: LeftPanelProps) {


  const TempColors = {
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

 

  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const { desc,temperature, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const today = format(new Date(), 'yyyy-MM-dd');
  const user = useSelector((state: RootState) => state.auth.user);
  const todayTasks = todos.filter((todo) => todo.date === today);
  const completedToday = todayTasks.filter((todo) => todo.completed).length;
  const totalToday = todayTasks.length;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(fetchWeather(latitude, longitude));
      },
      () => {
        console.error('Geolocation permission denied.');
      }
    );
  }, [dispatch]);

  const [tempStatus, setTempStatus] = useState<'low' | 'medium' | 'high'>('low');

  useEffect(() => {
    if (temperature !== null) {
      if (temperature <= 20) {
        setTempStatus('low');
      } else if (temperature > 20 && temperature <= 35) {
        setTempStatus('medium');
      } else {
        setTempStatus('high');
      }
    }
  }, [temperature]);

  const navigationItems = [
    { id: 'all', label: 'All Tasks', icon: ListTodo },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'important', label: 'Important', icon: Star },
    { id: 'planned', label: 'Planned', icon: Calendar },
    { id: 'assigned', label: 'Assigned to Me', icon: Users },
  ];

  return (
    <div className="w-64 h-full bg-green-50 dark:bg-bulkDark border-r border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-center items-center">
      <img src="/avatar.jpeg" alt="Profile" className="w-24 h-24 object-cover rounded-full" />

      </div>
      <div className="text-gray-700 dark:text-gray-300 font-outfit text-[20px] leading-[20px] font-medium mt-2 mb-2 flex justify-center">
        Hey, {user?.name.toUpperCase()}
      </div>
     <div></div>
     <div className="flex mt-3 text-gray-700 dark:text-gray-300 justify-between">
      {loading && <p>Loading temperature...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {temperature !== null && (
        <>
          <p className="mr-3 text-xl">
            <strong>{temperature}°C</strong>
          </p>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${TempColors[tempStatus]}`}>
            {desc}
          </span>
        </>
      )}
    </div>
     <div className='mt-2 '></div>
     <div className='bg-white dark:bg-customDark'><nav className="space-y-1 mb-8">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-sm ${
                selectedView === item.id
                  ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav></div>
      
 
      <button className="w-full flex pt-4 pb-4 items-center space-x-2 px-4 py-2 text-sm bg-white dark:bg-customDark text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 rounded-lg">
        <Plus className="h-5 w-5" />
        <span>Add List</span>
      </button>

      <div className="mt-8 dark:bg-gray-700 rounded-lg shadow">
        <TodayTasks completedTasks={completedToday} totalTasks={totalToday} />
      </div>
    </div>
  );
}
