import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
// import { Separator } from "../ui/separator.jsx";
const Footer = () => {
    const companyItems= [{
        link: "/about", label: "About Us"
    },
     {
        link: "/careers", label: "Careers"
    },
        {
        link: "/privacy-policy", label: "Privacy Policy"
    },
        {
        link: "/terms-of-service", label: "Terms of Service"
    }]
    const supportItems= [{
        link: "/contact", label: "Contact Us"
    },
    {
        link: "/faqs", label: "FAQs"
    },
    {
        link: "/shipping-info", label: "Shipping Info"
    },
    {
        link: "/returns", label: "Returns"
    }]
    const shopItems= [{
        link: "/new-arrivals", label: "New Arrivals"
    },
    {
        link: "/best-sellers", label: "Best Sellers"
    },
    {
        link: "/collections", label: "Collections"
    },
    {
        link: "/sale", label: "Sale"
    }]
  return (
    <footer className="bg-gray-800 text-white py-4">
         <div className="container mx-auto px-4 pt-12">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                <div className="lg:col-span-2 col-span-2 space-y-4">
                    <h3 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    SockShop
                    </h3>
                    <p className="text-gray-400 max-w-md">
                    Your premier destination for premium socks. Quality, comfort, and style in every step.
                    </p>
                    <div className="flex gap-4">
                    <button variant="ghost" size="icon" className="hover:text-purple-400">
                        <Facebook className="h-5 w-5" />
                    </button>
                    <button variant="ghost" size="icon" className="hover:text-purple-400">
                        <Instagram className="h-5 w-5" />
                    </button>
                    <button variant="ghost" size="icon" className="hover:text-purple-400">
                        <Twitter className="h-5 w-5" />
                    </button>
                    <button variant="ghost" size="icon" className="hover:text-purple-400">
                        <Youtube className="h-5 w-5" />
                    </button>
                    </div>
                </div>

                <div>
                    <h4 className="text-gray-300 mb-4">Shop</h4>
                    <ul className="space-y-2">
                        {shopItems.map((item) => (
                        <li key={item.label}>
                            <Link to={item.link} className="hover:text-purple-400 transition-colors">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-300 mb-4">Support</h4>
                    <ul className="space-y-2">
                    {supportItems.map((item) => (
                        <li key={item.label}>
                        <Link to={item.link} className="hover:text-purple-400 transition-colors">
                            {item.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-gray-300 mb-4">Company</h4>
                    <ul className="space-y-2">
                    {companyItems.map((item) => (
                        <li key={item.label}>
                        <Link to={item.link} className="hover:text-purple-400 transition-colors">
                            {item.label}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400">&copy; {new Date().getFullYear()} SockShop. All rights reserved.</p>
                <div className="flex gap-4 text-gray-400">
                    <div className="w-12">
                        <img src="/visa.png" alt="" />
                    </div>
                    <div className="w-12">
                        <img src="/new-Jazzcash-logo.png" alt="Jazzcash" />
                    </div>
                    <div className="w-11">
                        <img src="/easypaisa-logo.png" alt="EssayPaisa" />
                    </div>
                    <span>Apple Pay</span>
                </div>
            </div>
         </div>
    </footer>
  );
}
export default Footer;