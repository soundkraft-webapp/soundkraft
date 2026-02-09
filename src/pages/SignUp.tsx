import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignUp } from '@clerk/clerk-react';
import { Mail, Lock, Eye, EyeOff, Sparkles, Music, User, ArrowRight, Check } from 'lucide-react';

const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');


    // Trigger entrance animation
    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) {
            return;
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            console.log('Starting sign-up process...');
            console.log('Form data:', { ...formData, password: '[REDACTED]', confirmPassword: '[REDACTED]' });

            // Prepare sign-up data
            const signUpData: any = {
                emailAddress: formData.email,
                password: formData.password,
                firstName: formData.fullName.split(' ')[0],
                lastName: formData.fullName.split(' ').slice(1).join(' ') || undefined,
            };

            // Use provided username, or fall back to full name if not provided
            signUpData.username = formData.username.trim() || formData.fullName.trim();

            console.log('Sign-up data:', { ...signUpData, password: '[REDACTED]' });

            // Start the sign-up process
            await signUp.create(signUpData);

            console.log('Sign-up created successfully');

            // Send email verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            console.log('Verification email sent');

            // Show verification form
            setPendingVerification(true);
        } catch (err: any) {
            console.error('Sign up error:', err);
            console.error('Error details:', err.errors);
            setError(err.errors?.[0]?.message || 'An error occurred during sign up. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoaded) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            console.log('Starting verification process...');
            console.log('Current signUp state:', signUp);
            console.log('Form data:', formData);

            // Verify the email code
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            console.log('Verification status:', completeSignUp.status);
            console.log('Full verification result:', completeSignUp);
            console.log('Unverified fields:', completeSignUp.unverifiedFields);
            console.log('Missing fields:', completeSignUp.missingFields);

            // Check if sign up is complete
            if (completeSignUp.status === 'complete') {
                // Set the active session
                await setActive({ session: completeSignUp.createdSessionId });
                // Redirect to home page
                navigate('/');
            } else if (completeSignUp.status === 'missing_requirements') {
                // Handle missing requirements
                console.log('Missing requirements detected!');
                console.log('Required fields:', completeSignUp.requiredFields);
                console.log('Missing fields:', completeSignUp.missingFields);
                console.log('Unverified fields:', completeSignUp.unverifiedFields);
                console.log('Complete sign-up object:', JSON.stringify(completeSignUp, null, 2));

                // Try to extract more detailed information
                const missingFields = completeSignUp.missingFields || [];
                const unverifiedFields = completeSignUp.unverifiedFields || [];

                let errorMessage = 'Missing required fields: ';
                if (missingFields.length > 0) {
                    errorMessage += missingFields.join(', ');
                } else if (unverifiedFields.length > 0) {
                    errorMessage += `Unverified: ${unverifiedFields.join(', ')}`;
                } else {
                    errorMessage += 'Could not determine missing fields. Check console for details.';
                }

                setError(errorMessage);
            } else {
                // Log the actual status for debugging
                console.log('Unexpected status:', completeSignUp.status);
                console.log('All available fields:', Object.keys(completeSignUp));
                setError(`Verification status: ${completeSignUp.status}. Please check the console for details or contact support.`);
            }
        } catch (err: any) {
            console.error('Verification error:', err);
            console.error('Error code:', err.errors?.[0]?.code);
            console.error('Error message:', err.errors?.[0]?.message);
            console.error('Full error object:', JSON.stringify(err, null, 2));

            // Check if the error is "already verified" - this means verification succeeded!
            if (err.errors?.[0]?.code === 'verification_already_verified') {
                console.log('Email already verified! Attempting to set session...');

                // Try to set the active session and redirect
                try {
                    if (signUp.createdSessionId) {
                        await setActive({ session: signUp.createdSessionId });
                        navigate('/');
                        return;
                    }
                } catch (sessionErr) {
                    console.error('Session error:', sessionErr);
                }

                // If we can't set session, show success message and ask user to sign in
                setError('Email already verified! Please sign in with your credentials.');
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            } else {
                setError(err.errors?.[0]?.message || err.errors?.[0]?.longMessage || 'Invalid verification code. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const signUpWith = (strategy: 'oauth_google' | 'oauth_facebook') => {
        if (!isLoaded) return;

        signUp.authenticateWithRedirect({
            strategy,
            redirectUrl: '/sso-callback',
            redirectUrlComplete: '/'
        });
    };

    const benefits = [
        'Access to 600+ professional lessons',
        'Learn from industry experts',
        'Lifetime access to course materials',
        'Certificate of completion',
        'Join a community of 20K+ students'
    ];

    return (
        <>
            <style>{`
        /* Page entrance animation */
        .signup-entrance {
          opacity: 0;
          transform: scale(0.95);
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        
        .signup-entrance.loaded {
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
          opacity: 0.5;
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

        /* Benefits list animation */
        .benefit-item {
          opacity: 0;
          transform: translateX(-20px);
          animation: slideIn 0.5s ease forwards;
        }

        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .benefit-item:nth-child(1) { animation-delay: 0.1s; }
        .benefit-item:nth-child(2) { animation-delay: 0.2s; }
        .benefit-item:nth-child(3) { animation-delay: 0.3s; }
        .benefit-item:nth-child(4) { animation-delay: 0.4s; }
        .benefit-item:nth-child(5) { animation-delay: 0.5s; }

        /* Custom checkbox */
        .custom-checkbox {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(249, 115, 22, 0.3);
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.5);
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .custom-checkbox:checked {
          background: linear-gradient(45deg, #f97316, #fb923c);
          border-color: #f97316;
        }

        .custom-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        /* Responsive grid */
        @media (max-width: 768px) {
          .signup-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

            <div className={`min-h-screen bg-black flex items-center justify-center px-4 py-12 signup-entrance ${isPageLoaded ? 'loaded' : ''}`}>
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-red-500/15 to-transparent blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-orange-400/15 to-transparent blur-3xl"></div>
                </div>

                {/* Main Container */}
                <div className="w-full max-w-6xl relative z-10">
                    <div className="grid signup-grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Side - Benefits */}
                        <div className="hidden lg:block">
                            {/* Logo/Brand */}
                            <div className="mb-8">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Sparkles className="w-10 h-10 text-orange-500 float-animation" />
                                    <Music className="w-10 h-10 text-orange-400 float-animation" style={{ animationDelay: '0.5s' }} />
                                </div>
                                <h1 className="text-5xl font-bold mb-4">
                                    <span className="gradient-text">Start Your DJ Journey</span>
                                </h1>
                                <p className="text-gray-400 text-xl">Join thousands of aspiring DJs worldwide</p>
                            </div>

                            {/* Benefits Card */}
                            <div className="glass-card p-8">
                                <h3 className="text-2xl font-bold text-white mb-6">What you'll get:</h3>
                                <ul className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start space-x-3 benefit-item">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 flex items-center justify-center mt-0.5">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-gray-300 text-lg">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-orange-500/20">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-400">20K+</div>
                                        <div className="text-sm text-gray-400 mt-1">Students</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-400">600+</div>
                                        <div className="text-sm text-gray-400 mt-1">Lessons</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-orange-400">95%</div>
                                        <div className="text-sm text-gray-400 mt-1">Success</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Sign Up Form */}
                        <div>
                            {/* Mobile Logo */}
                            <div className="lg:hidden text-center mb-8">
                                <div className="flex items-center justify-center space-x-2 mb-4">
                                    <Sparkles className="w-10 h-10 text-orange-500 float-animation" />
                                    <Music className="w-10 h-10 text-orange-400 float-animation" style={{ animationDelay: '0.5s' }} />
                                </div>
                                <h1 className="text-4xl font-bold mb-2">
                                    <span className="gradient-text">Create Account</span>
                                </h1>
                                <p className="text-gray-400 text-lg">Start your DJ journey today</p>
                            </div>

                            {/* Sign Up Card */}
                            <div className="glass-card p-8">
                                <h2 className="text-2xl font-bold text-white mb-6 hidden lg:block">
                                    {pendingVerification ? 'Verify Your Email' : 'Create your account'}
                                </h2>

                                {!pendingVerification ? (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {/* Full Name Input */}
                                        <div className="input-wrapper relative">
                                            <User className="input-icon w-5 h-5" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                placeholder="Full Name"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        {/* Username Input (Optional) */}
                                        <div className="input-wrapper relative">
                                            <User className="input-icon w-5 h-5" />
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Username (optional)"
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="input-field"
                                            />
                                        </div>

                                        {/* Email Input */}
                                        <div className="input-wrapper relative">
                                            <Mail className="input-icon w-5 h-5" />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        {/* Password Input */}
                                        <div className="input-wrapper relative">
                                            <Lock className="input-icon w-5 h-5" />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                placeholder="Password"
                                                value={formData.password}
                                                onChange={handleChange}
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

                                        {/* Confirm Password Input */}
                                        <div className="input-wrapper relative">
                                            <Lock className="input-icon w-5 h-5" />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                placeholder="Confirm Password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="input-field"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-400 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>

                                        {/* Terms & Conditions */}
                                        <div className="flex items-start space-x-3">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                checked={agreedToTerms}
                                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                className="custom-checkbox mt-1"
                                                required
                                            />
                                            <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                                                I agree to the{' '}
                                                <Link to="/terms-and-conditions" className="text-orange-400 link-hover">
                                                    Terms of Service
                                                </Link>
                                            </label>
                                        </div>

                                        {/* Clerk CAPTCHA - Required for bot protection */}
                                        <div id="clerk-captcha"></div>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Sign Up Button */}
                                        <button
                                            type="submit"
                                            className="btn-3d flex items-center justify-center gap-2"
                                            disabled={!agreedToTerms || isLoading || !isLoaded}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Creating account...
                                                </>
                                            ) : (
                                                <>
                                                    Create Account
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
                                                <span className="px-4 bg-transparent text-gray-400">Or sign up with</span>
                                            </div>
                                        </div>

                                        {/* Social Sign Up */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                type="button"
                                                onClick={() => signUpWith('oauth_google')}
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
                                                onClick={() => signUpWith('oauth_facebook')}
                                                className="flex items-center justify-center gap-2 px-4 py-3 bg-black/50 border-2 border-orange-500/20 rounded-lg text-white hover:border-orange-500/40 hover:bg-black/70 transition-all"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                                Facebook
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    /* Verification Form */
                                    <form onSubmit={handleVerify} className="space-y-6">
                                        <div className="text-center mb-6">
                                            <p className="text-gray-300 mb-2">
                                                We've sent a verification code to
                                            </p>
                                            <p className="text-orange-400 font-semibold">{formData.email}</p>
                                        </div>

                                        {/* Verification Code Input */}
                                        <div className="input-wrapper relative">
                                            <Mail className="input-icon w-5 h-5" />
                                            <input
                                                type="text"
                                                placeholder="Enter verification code"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value)}
                                                className="input-field"
                                                required
                                                maxLength={6}
                                            />
                                        </div>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {/* Verify Button */}
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
                                                    Verifying...
                                                </>
                                            ) : (
                                                <>
                                                    Verify Email
                                                    <ArrowRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>

                                        <div className="text-center">
                                            <button
                                                type="button"
                                                onClick={() => setPendingVerification(false)}
                                                className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                                            >
                                                ← Back to sign up
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {/* Sign In Link */}
                                <div className="mt-6 text-center">
                                    <p className="text-gray-400">
                                        Already have an account?{' '}
                                        <Link to="/signin" className="text-orange-400 font-semibold link-hover">
                                            Sign in
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
                </div>
            </div>
        </>
    );
};

export default SignUp;
