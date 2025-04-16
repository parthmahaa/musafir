import { Link, useNavigate } from "react-router-dom";
import { MapPin, Home, LogIn } from "lucide-react";
import Header from "../Header/Header";

export default function NotFound({ requiresAuth }) {
  const navigate = useNavigate();

  if (requiresAuth) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6 py-12">
        <LogIn className="w-20 h-20 text-orange-500 mb-8" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Login Required</h1>
        <p className="text-lg text-gray-600 max-w-md mb-8">
          You need to be logged in to access this feature. Please log in to continue.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      {/* 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 bg-orange-100 rounded-full"></div>
          </div>
          <MapPin className="relative z-10 w-20 h-20 text-orange-500 mx-auto" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Oops! Page Not Found</h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          It seems like you've wandered off the beaten path. The destination you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors">
            <Home className="w-5 h-5" />
              Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t">
        <p>© {new Date().getFullYear()} Musafir. All rights reserved.</p>
      </footer>
    </div>
  );
}
