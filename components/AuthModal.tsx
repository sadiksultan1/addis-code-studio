import React, { useState } from 'react';
import { X } from 'lucide-react';
import { auth, googleProvider } from '../firebaseConfig';
import * as firebaseAuth from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      await firebaseAuth.signInWithPopup(auth, googleProvider);
      onClose();
      navigate('/dashboard'); // Redirect to the beautiful user home
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6 sm:px-6 sm:py-12">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up flex flex-col">
        {/* Header */}
        <div className="px-6 py-6 border-b border-white/10 flex justify-between items-center bg-white/5">
          <h2 className="text-xl font-serif font-bold text-white">
            {initialMode === 'signin' ? 'Welcome Back' : 'Join Addis Web Studio'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">
          <p className="text-gray-400 text-center mb-8">
            Sign in to manage your projects, view exclusive content, and access our premium services.
          </p>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-gray-900 font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></span>
            ) : (
              <>
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                <span className="text-lg">Continue with Google</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-6 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
              {error}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;