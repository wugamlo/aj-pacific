import Link from "next/link";

const Footer = () => {
    // Fixed year avoids rare SSR/client year-boundary hydration mismatches
    const currentYear = 2026;

    return (
        <footer className="bg-slate-900 text-white mt-16">
            {/* Main Footer Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
                            <img
                                src="/images/ajp-logo.jpg"
                                alt="AJ Pacific Logo"
                                className="h-12 w-auto bg-white p-1 rounded-lg"
                            />
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Practical Solutions, Lasting Value.<br />
                            Your partner in AI & Finance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-brand-light mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-slate-400 hover:text-brand-light transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-slate-400 hover:text-brand-light transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore" className="text-slate-400 hover:text-brand-light transition-colors">
                                    Explore AI Opportunities
                                </Link>
                            </li>
                            <li>
                                <Link href="/services/ai/where-ai-helps" className="text-slate-400 hover:text-brand-light transition-colors">
                                    Where AI helps
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-400 hover:text-brand-light transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-400 hover:text-brand-light transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-brand-light mb-4">Get in Touch</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                            <li>Hong Kong SAR</li>
                            <li>
                                <a href="mailto:info@aj-pacific.com" className="hover:text-brand-light transition-colors">
                                    info@aj-pacific.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {currentYear} AJ Pacific (H.K.) Limited. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link href="#" className="hover:text-brand-light transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-brand-light transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
