import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignIn } from '@clerk/clerk-react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Music, ArrowRight } from 'lucide-react';

const SignIn = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Trigger entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Start the sign-in process using the email and password
            const result = await signIn.create({
                identifier: email,
                password,
            });

            if (result.status === 'complete') {
                // Set the active session
                await setActive({ session: result.createdSessionId });
                // Redirect to home page
                navigate('/');
            } else {
                // Handle other statuses if needed
                console.log('Sign in result:', result);
                setError('Sign in incomplete. Please try again.');
            }
        } catch (err: any) {
            // Handle errors
            console.error('Sign in error:', err);
            setError(err.errors?.[0]?.message || 'Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const signInWith = (strategy: 'oauth_google' | 'oauth_facebook') => {
        if (!isLoaded) return;

        signIn.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/'
        });
    };

    return (
        <>
            <style>{`
        /* Page entrance animation */
        .signin-entrance {
          opacity: 0;
          transform: scale(0.95);
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .signin-entrance.loaded {
          opacity: 1;
          transform: scale(1);
        }

        /* Glassmorphism card */
        .glass-card {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(0, 0, 0, 0.4));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(249, 115, 22, 0.3);
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 
                      0 0 0 1px rgba(249, 115, 22, 0.1) inset;
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .glass-card:hover {
          border-color: rgba(249, 115, 22, 0.5);
          box-shadow: 0 20px 60px rgba(249, 115, 22, 0.3),
                      0 0 0 1px rgba(249, 115, 22, 0.2) inset;
        }

        /* Input field styles */
        .input-field {
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(249, 115, 22, 0.2);
          border-radius: 12px;
          color: white;
          padding: 14px 16px 14px 48px;
          width: 100%;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .input-field:focus {
          outline: none;
          border-color: rgba(249, 115, 22, 0.6);
          background: rgba(0, 0, 0, 0.7);
          box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
        }

        .input-field::placeholder {
          color: rgba(203, 213, 225, 0.5);
        }

        /* Input icon positioning */
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(249, 115, 22, 0.6);
          transition: color 0.3s ease;
        }

        .input-wrapper:focus-within .input-icon {
          color: rgba(249, 115, 22, 1);
        }

        /* 3D Button effect */
        .btn-3d {
          position: relative;
          overflow: hidden;
          background: linear-gradient(45deg, #f97316, #fb923c);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 16px 32px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform: perspective(1000px) rotateX(0deg);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3),
                      0 10px 10px -5px rgba(249, 115, 22, 0.04);
          width: 100%;
        }

        .btn-3d::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .btn-3d:hover {
          transform: perspective(1000px) rotateX(-10deg) translateY(-3px);
          box-shadow: 0 25px 50px -10px rgba(249, 115, 22, 0.4),
                      0 20px 30px -5px rgba(249, 115, 22, 0.1);
          background: linear-gradient(45deg, #ea580c, #f97316);
        }

        .btn-3d:hover::before {
          left: 100%;
        }

        .btn-3d:active {
          transform: perspective(1000px) rotateX(0deg) translateY(0px);
          transition: transform 0.15s ease;
        }

        .btn-3d:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: perspective(1000px) rotateX(0deg);
        }

        .btn-3d:disabled:hover {
          transform: perspective(1000px) rotateX(0deg);
          box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.3),
                      0 10px 10px -5px rgba(249, 115, 22, 0.04);
        }

        /* Gradient text */
        .gradient-text {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffd23f 50%, #ff8c42 75%, #ff6b35 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientFlow 6s ease infinite;
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Floating animation for icons */
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        /* Link hover effect */
        .link-hover {
          position: relative;
          transition: color 0.3s ease;
        }

        .link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #f97316, #fb923c);
          transition: width 0.3s ease;
        }

        .link-hover:hover::after {
          width: 100%;
        }
      `}</style>

            <div className={`min-h-screen bg-black flex items-center justify-center px-4 py-12 signin-entrance ${isPageLoaded ? 'loaded' : ''}`}>
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-red-500/15 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-400/15 to-transparent blur-3xl"></div>
                </div>

                {/* Main Container */}
                <div className="w-full max-w-md relative z-10">
                    {/* Logo/Brand */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <Sparkles className="w-10 h-10 text-orange-500 float-animation" />
                            <Music className="w-10 h-10 text-orange-400 float-animation" style={{ animationDelay: '0.5s' }} />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">
                            <span className="gradient-text">Welcome Back</span>
                        </h1>
                        <p className="text-gray-400 text-lg">Sign in to continue your DJ journey</p>
                    </div>

                    {/* Sign In Card */}
                    <div className="glass-card p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Input */}
                            <div className="input-wrapper relative">
                                <Mail className="input-icon w-5 h-5" />
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="input-wrapper relative">
                                <Lock className="input-icon w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-orange-500/30 bg-black/50 text-orange-500 focus:ring-orange-500 focus:ring-offset-0"
                                    />
                                    <span className="text-gray-300">Remember me</span>
                                </label>
                                <a href="#" className="text-orange-400 link-hover">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Clerk CAPTCHA - Required for bot protection */}
                            <div id="clerk-captcha"></div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="btn-3d flex items-center justify-center gap-2"
                                disabled={isLoading || !isLoaded}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-transparent text-gray-400">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Sign In */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => signInWith('oauth_google')}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-black/50 border-2 border-orange-500/20 rounded-lg text-white hover:border-orange-500/40 hover:bg-black/70 transition-all"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    onClick={() => signInWith('oauth_facebook')}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-black/50 border-2 border-orange-500/20 rounded-lg text-white hover:border-orange-500/40 hover:bg-black/70 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                    Facebook
                                </button>
                            </div>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Don't have an account?{' '}
                                <Link to="/signup" className="text-orange-400 font-semibold link-hover">
                                    Sign up now
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-6 text-center">
                        <Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors link-hover">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
