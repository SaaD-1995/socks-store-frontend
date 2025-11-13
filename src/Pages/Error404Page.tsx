import { motion } from "motion/react";
import { Home, Frown } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom"

function Error404Page() {
    const navigate = useNavigate();
    const onNavigateHome = () => {
        navigate("/");
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            {/* Animated 404 Number */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="relative mb-8"
            >
              <h1 className="text-9xl md:text-[12rem] bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent leading-none">
                404
              </h1>
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -top-4 right-1/4 md:right-1/3"
              >
                <span className="text-6xl md:text-8xl">🧦</span>
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="mb-4">Oops! This Sock Lost Its Pair</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Just like that mysterious missing sock from the dryer, this page seems to have vanished. 
                But don't worry – we have plenty of other amazing socks to discover!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 justify-center mb-16"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={onNavigateHome}
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </motion.div>
          </motion.div>

          {/* Fun Fact Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Card className="border-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white">
              <CardContent className="p-8 text-center">
                <Frown className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <h3 className="mb-3 text-white">Did You Know?</h3>
                <p className="text-white/90 max-w-2xl mx-auto">
                  The average person loses approximately 1.3 socks per month. That's 15 socks per year! 
                  Don't let this page be like those missing socks – find what you're looking for at SockShop!
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-10 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            🧦
          </div>
          <div className="absolute top-1/3 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }}>
            🧦
          </div>
          <div className="absolute bottom-1/4 left-1/4 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4s' }}>
            🧦
          </div>
          <div className="absolute bottom-1/3 right-1/3 text-4xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.2s' }}>
            🧦
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404Page;