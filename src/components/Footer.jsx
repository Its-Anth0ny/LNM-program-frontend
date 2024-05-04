import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Instagram,
    Github,
} from "lucide-react";
import { Link } from "react-router-dom";

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
                                <Link
                                    to="mailto:shubhankarbhatt27@gmail.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-2"
                                >
                                    <Mail />
                                    shubhankarbhatt27@gmail.com
                                </Link>
                            </li>
                            {/* <li className="flex items-center mb-2">
                                <Phone />
                                <span>+1 (123) 456-7890</span>
                            </li>
                            <li className="flex items-center">
                                <MapPin />
                                <span>1234 Elm Street, City, Country</span>
                            </li> */}
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
                            {/* <li className="mb-2">
                                <a href="#" className="hover:text-gray-300">
                                    Services
                                </a>
                            </li> */}
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
                                <Link
                                    to="https://twitter.com/BhattShubhankar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Twitter />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://www.linkedin.com/in/bhattshubhankar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Linkedin />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="https://github.com/Its-Anth0ny"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github />
                                </Link>
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
