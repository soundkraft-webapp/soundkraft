import { useState } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, ArrowRight } from 'lucide-react';

const CompleteProfile = () => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Update user profile with additional information
            await user?.update({
                username: username || undefined,
                // Note: Phone number updates require verification
                // You may need to handle this differently
            });

            // Redirect to home page
            navigate('/');
        } catch (err: any) {
            console.error('Profile update error:', err);
            setError(err.errors?.[0]?.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSkip = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-orange-500/20 via-orange-600/10 to-transparent blur-3xl"></div>
            </div>

            {/* Main Container */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-gradient-to-br from-orange-500/10 to-black/40 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 shadow-2xl">
                    <h1 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h1>
                    <p className="text-gray-400 mb-6">Just a few more details to get started</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Input */}
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500/60" />
                            <input
                                type="text"
                                placeholder="Username (optional)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border-2 border-orange-500/20 rounded-xl text-white px-12 py-3 focus:outline-none focus:border-orange-500/60 transition-all"
                            />
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500/60" />
                            <input
                                type="tel"
                                placeholder="Phone number (optional)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className="w-full bg-black/50 border-2 border-orange-500/20 rounded-xl text-white px-12 py-3 focus:outline-none focus:border-orange-500/60 transition-all"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? 'Saving...' : 'Complete Profile'}
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                type="button"
                                onClick={handleSkip}
                                className="w-full bg-transparent border-2 border-orange-500/30 text-orange-400 font-semibold py-3 rounded-xl hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
                            >
                                Skip for now
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => signOut()}
                            className="text-sm text-gray-400 hover:text-orange-400 transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteProfile;
