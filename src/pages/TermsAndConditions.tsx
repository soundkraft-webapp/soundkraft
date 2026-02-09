import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
    const navigate = useNavigate();

    const scrollToSection = (id: string) => {
        navigate('/', { state: { scrollTo: id } });
        // Note: Home page would need to handle this state to scroll
        // For now, this just navigates to Home
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar activeSection="" scrollToSection={scrollToSection} />

            <div className="pt-32 pb-16 px-4 md:px-8 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                    Terms and Conditions
                </h1>

                <div className="space-y-6 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">1. Introduction</h2>
                        <p>
                            Welcome to SoundKraft DJ Academy. By using our website and services, you agree to these terms and conditions.
                            Please read them carefully.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">2. Use of Services</h2>
                        <p>
                            Our services are provided for educational and informational purposes. You agree to use our platform only for lawful purposes
                            and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">3. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, and images, is the property of SoundKraft DJ Academy
                            and is protected by copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">4. User Accounts</h2>
                        <p>
                            If you create an account with us, you are responsible for maintaining the confidentiality of your account and password
                            and for restricting access to your computer.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">5. Limitation of Liability</h2>
                        <p>
                            SoundKraft DJ Academy shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                            arising out of or in connection with your use of our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms and Conditions, please contact us at support@soundkraft.com.
                        </p>
                    </section>

                    <div className="mt-8 p-4 border border-orange-500/20 rounded-lg bg-orange-500/5">
                        <p className="text-sm text-orange-400">
                            Note: This is a placeholder for the full Terms and Conditions content. Please replace with your specific legal text.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;
