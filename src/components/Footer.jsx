import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-8 text-white bg-gray-900">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Contact Us
                        </h3>
                        <ul>
                            <li className="flex items-center mb-2">
                                <Mail />
                                <a
                                    href="mailto:info@example.com"
                                    className="hover:text-gray-300"
                                >
                                    info@example.com
                                </a>
                            </li>
                            <li className="flex items-center mb-2">
                                <Phone />
                                <span>+1 (123) 456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin />
                                <span>1234 Elm Street, City, Country</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Quick Links
                        </h3>
                        <ul>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Home
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    About Us
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Services
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">
                            Follow Us
                        </h3>
                        <ul className="flex space-x-4">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    <Twitter />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    <Linkedin />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-gray-300"
                                >
                                    <Instagram />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="px-4 mx-auto mt-8 border-t border-gray-800 max-w-7xl sm:px-6 lg:px-8">
                <p className="text-sm text-center">
                    &copy; {new Date().getFullYear()} LNM-Program Dashboard. All
                    rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
