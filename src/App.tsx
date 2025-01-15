import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { RootState } from './store';
import { addTodo, removeTodo, toggleTodo, updateTodoPriority } from './store/todosSlice';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Login from './components/Login';
import { Todo } from './types';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const todos = useSelector((state: RootState) => state.todos.items);
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  
  const [selectedView, setSelectedView] = useState('all');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLeftPanelVisible, setIsLeftPanelVisible] = useState(true); // Manage left panel visibility

  if (!isAuthenticated) {
    return <Login />;
  }


  const handleAddTodo = (todoData: Omit<Todo, 'id' | 'completed'>) => {
    dispatch(addTodo({
      ...todoData,
      id: crypto.randomUUID(),
      completed: false,
    }));
  };

  const filteredTodos = todos.filter(todo => {
    if (searchQuery) {
      return todo.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    switch (selectedView) {
      case 'today':
        return todo.date === format(new Date(), 'yyyy-MM-dd');
      case 'important':
        return todo.priority === 'high';
      case 'planned':
        return new Date(todo.date) > new Date();
      default:
        return true;
    }
  });

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-bulkLight dark:bg-bulkDark">
        <Header
          onSearch={setSearchQuery}
        setView={setView}
          onToggleLeftPanel={() => setIsLeftPanelVisible(!isLeftPanelVisible)} // Toggle handler passed to Header
        />
        
        <div className="flex h-[calc(100vh-64px)]">
          {isLeftPanelVisible && (
            <LeftPanel
              selectedView={selectedView}
              onViewChange={setSelectedView}
            />
          )}

              
          <main className={`flex-1 w-full overflow-auto p-6  ${
              !isLeftPanelVisible && !selectedTodo
                ? 'w-full' // when no panels are visible
                : isLeftPanelVisible && selectedTodo
                ? 'mr-80' // when both panels are visible
                : isLeftPanelVisible
                ? '' // when only the left panel is visible
                : selectedTodo
                ? '' // when only the right panel is visible
                : '' // when no panels are visible
            }`}>
            <div className="m">
              <div className="bg-customGradient  dark:bg-aadDark p-6  shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
                  </h1>
                </div>
                   <div className= '  '>
                   <TodoInput
                  selectedDate={new Date()}
                  onAdd={handleAddTodo}
                />
                   </div>
                
              </div>
              
              <TodoList 
                todos={filteredTodos}
                view={view}
                onToggle={(id) => dispatch(toggleTodo(id))}
                onDelete={(id) => dispatch(removeTodo(id))}
                onUpdatePriority={(id, priority) => dispatch(updateTodoPriority({ id, priority }))}
                onSelect={setSelectedTodo}
              />
              
              
            </div>
          </main>

          {selectedTodo && (
            <RightPanel
              selectedTodo={selectedTodo}
              onClose={() => setSelectedTodo(null)}
              onDelete={(id) => {
                dispatch(removeTodo(id));
                setSelectedTodo(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
