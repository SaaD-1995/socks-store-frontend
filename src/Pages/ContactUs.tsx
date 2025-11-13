import { useState } from "react";
import { motion } from "motion/react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { toast } from "sonner";

function ContactUs() {
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer standard shipping (5-7 business days), express shipping (2-3 business days), and next-day delivery. Free standard shipping on orders over $50."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with tags attached. Return shipping is free for exchanges."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes! We ship to over 50 countries worldwide. International shipping times vary by location, typically 7-14 business days."
    },
    {
      question: "How do I care for my socks?",
      answer: "For best results, machine wash cold with like colors. Tumble dry low or air dry. Avoid bleach and fabric softeners to maintain sock quality and elasticity."
    },
    {
      question: "Do you have a size guide?",
      answer: "Yes! Our socks come in S (US 5-7), M (US 7-9), L (US 9-11), and XL (US 11-13). Most styles are unisex and fit all genders."
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri, 9am-6pm EST",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "Email",
      detail: "support@sockshop.com",
      description: "We'll respond within 24 hours",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      detail: "Available Now",
      description: "Chat with our team",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "123 Fashion Street",
      description: "New York, NY 10001",
      gradient: "from-green-500 to-teal-500"
    }
  ];
  const moveToContactForm = () => {
    document.getElementById('form-contact')?.scrollIntoView({ behavior: 'smooth' });
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 py-16 md:py-20">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-3xl mx-auto"
          >
            <h1 className="mb-6 text-white">Get in Touch</h1>
            <p className="text-white/90 mb-8">
              Have questions about our socks? Our friendly team is here to help. 
              Reach out and we'll get back to you as soon as possible.
            </p>
            {/* <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Send a Message
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
              >
                View FAQs
              </Button>
            </div> */}
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${method.gradient} flex items-center justify-center mb-4`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="mb-2">{method.title}</h3>
                    <p className="text-gray-900 mb-1">{method.detail}</p>
                    <p className="text-gray-500">{method.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              id="contact-form"
            >
              <div className="bg-white rounded-2xl p-8 border shadow-lg" id="form-contact">
                <h2 className="mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                      className="mt-1.5 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Office Hours */}
              {/* <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-4">Office Hours</h3>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="text-gray-900">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span className="text-gray-900">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span className="text-gray-900">Closed</span>
                        </div>
                      </div>
                      <p className="text-gray-500 mt-4">
                        All times are in Eastern Standard Time (EST)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Location Image & Details */}
              {/* <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative h-48">
                  <img
                    src="https://images.unsplash.com/photo-1560264280-88b68371db39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b21lciUyMHNlcnZpY2UlMjBvZmZpY2V8ZW58MXx8fHwxNzYyOTQ2MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="SockShop Office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <CardContent className="p-8">
                  <h3 className="mb-4">Visit Our Showroom</h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>123 Fashion Street<br />New York, NY 10001<br />United States</span>
                    </p>
                    <p className="text-gray-500">
                      Come visit our flagship store and experience our full collection in person. 
                      Free parking available.
                    </p>
                  </div>
                </CardContent>
              </Card> */}

              {/* Social Media */}
              <Card className="border shadow-lg">
                <CardContent className="p-8">
                  <h3 className="mb-4">Connect With Us</h3>
                  <p className="text-gray-600 mb-6">
                    Follow us on social media for the latest updates, exclusive offers, and sock inspiration!
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600 transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="hover:bg-sky-50 hover:text-sky-600 hover:border-sky-600 transition-all"
                    >
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline"
                      className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-600 transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions. Can't find what you're looking for? 
              Send us a message and we'll help you out!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow">
                  <AccordionItem value={`item-${index}`} className="border-0">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center text-white max-w-2xl mx-auto"
          >
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="mb-4 text-white">We're Here to Help</h2>
            <p className="mb-8 text-white/90">
              Our customer service team is dedicated to providing you with the best experience. 
              Whether you have a question about sizing, shipping, or anything else, we're just a message away.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={moveToContactForm}
              >
                Contact Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
export default ContactUs;