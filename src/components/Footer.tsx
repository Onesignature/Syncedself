import React from 'react';
import { Zap, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Zap className="text-teal-400 h-6 w-6" />
              <span className="ml-2 text-xl font-bold">SyncedSelf</span>
            </div>
            <p className="text-gray-400 mb-6">
              Decentralized mental health support on the blockchain. Private, secure, and accessible.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-teal-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-teal-400 transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-teal-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">For Therapists</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Token Economics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Mental Health Resources</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">Partners</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SyncedSelf. All rights reserved.
          </p>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 justify-center">
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-teal-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;