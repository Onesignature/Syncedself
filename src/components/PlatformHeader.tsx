import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  Book, 
  Award, 
  Heart, 
  User, 
  Wallet,
  Menu,
  X
} from 'lucide-react';

const PlatformHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/Logo.png" alt="SyncedSelf" className="h-8 w-auto" />
              <span className="font-bold">SyncedSelf</span>
            </Link>
            <span className="hidden md:block ml-6 text-sm text-gray-500">|</span>
            <Link 
              to="/platform" 
              className={`hidden md:flex ml-6 items-center ${
                isActive('/platform') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <span>AI Assistant</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/platform/forum" 
              className={`flex items-center ${
                isActive('/platform/forum') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-1" />
              <span>Forum</span>
            </Link>
            <Link 
              to="/platform/resources" 
              className={`flex items-center ${
                isActive('/platform/resources') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <Book className="h-5 w-5 mr-1" />
              <span>Resources</span>
            </Link>
            <Link 
              to="/platform/rewards" 
              className={`flex items-center ${
                isActive('/platform/rewards') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <Award className="h-5 w-5 mr-1" />
              <span>Rewards</span>
            </Link>
            <Link 
              to="/platform/healer" 
              className={`flex items-center ${
                isActive('/platform/healer') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <Heart className="h-5 w-5 mr-1" />
              <span>My Healer</span>
            </Link>
            <Link 
              to="/platform/profile" 
              className={`flex items-center ${
                isActive('/platform/profile') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <User className="h-5 w-5 mr-1" />
              <span>Profile</span>
            </Link>
            <Link 
              to="/platform/wallet" 
              className={`flex items-center ${
                isActive('/platform/wallet') ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
              }`}
            >
              <Wallet className="h-5 w-5 mr-1" />
              <span>Wallet</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-teal-600 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="space-y-2">
              <Link
                to="/platform"
                className={`block px-4 py-2 ${
                  isActive('/platform') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                AI Assistant
              </Link>
              <Link
                to="/platform/forum"
                className={`block px-4 py-2 ${
                  isActive('/platform/forum') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="h-5 w-5 inline-block mr-2" />
                Forum
              </Link>
              <Link
                to="/platform/resources"
                className={`block px-4 py-2 ${
                  isActive('/platform/resources') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Book className="h-5 w-5 inline-block mr-2" />
                Resources
              </Link>
              <Link
                to="/platform/rewards"
                className={`block px-4 py-2 ${
                  isActive('/platform/rewards') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Award className="h-5 w-5 inline-block mr-2" />
                Rewards
              </Link>
              <Link
                to="/platform/healer"
                className={`block px-4 py-2 ${
                  isActive('/platform/healer') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="h-5 w-5 inline-block mr-2" />
                My Healer
              </Link>
              <Link
                to="/platform/profile"
                className={`block px-4 py-2 ${
                  isActive('/platform/profile') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 inline-block mr-2" />
                Profile
              </Link>
              <Link
                to="/platform/wallet"
                className={`block px-4 py-2 ${
                  isActive('/platform/wallet') ? 'text-teal-600 bg-teal-50' : 'text-gray-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Wallet className="h-5 w-5 inline-block mr-2" />
                Wallet
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PlatformHeader;