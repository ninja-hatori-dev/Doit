import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Moon, Sun, Grip, List, User, ChevronDown, Menu } from 'lucide-react'; // Add List icon
import { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import { logout } from '../store/authSlice';

interface HeaderProps {
  onSearch: (query: string) => void;
  setView: (
    view: 'grid' | 'list' | ((prevView: 'grid' | 'list') => 'grid' | 'list')
  ) => void;
  onToggleLeftPanel: () => void;
}

export default function Header({ onSearch, setView, onToggleLeftPanel }: HeaderProps) {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [view, setLocalView] = useState<'grid' | 'list'>('list'); // Track the current view

  const onViewChange = () => {
    const newView = view === 'list' ? 'grid' : 'list';
    setLocalView(newView);
    setView(newView); // Update the parent state
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-customDark border-b border-gray-200 dark:border-gray-700">
      <div className="container px-4 py-3">
        <div className="flex w-screen items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Hamburger menu button */}
            <button
              onClick={onToggleLeftPanel}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>

            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-green-600 dark:text-green-500">DoIt</span>
            </a>
          </div>

          <div className="flex items-center pr-10 space-x-6">
            <div className="relative">
              {isSearchOpen ? (
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-64 pl-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  onChange={(e) => onSearch(e.target.value)}
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              )}
            </div>

            <button
              onClick={onViewChange}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {view === 'grid' ? (
                <List className="h-5 w-5 bg-transparent text-gray-600 dark:text-gray-300" />
              ) : (
                <Grip className="h-5 w-5 bg-transparent text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.name.toLocaleUpperCase()}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-customDark rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="py-1">
                    <button
                      onClick={() => dispatch(logout())}
                      className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
