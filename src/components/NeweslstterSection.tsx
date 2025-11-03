import { Button } from "../ui/button";
const NewsletterSection = () => {
    return(
        <>
            {/* Newsletter Section */}
            <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4 py-16 text-center">
                <h3 className="text-3xl md:text-4xl mb-4">Join the Sock Club</h3>
                <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
                    Subscribe for exclusive deals, new arrivals, and special promotions delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                    <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <Button size="lg" variant="secondary">
                    Subscribe
                    </Button>
                </div>
                </div>
            </section>
        </>
    );
}
export default NewsletterSection;