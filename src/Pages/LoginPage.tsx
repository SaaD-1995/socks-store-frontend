import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom";


export function LoginPage() {
  const navigate = useNavigate();
  const isAdminLogin = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const onLogin = (role: "admin" | "user") => {
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/";
    }
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation - in production, validate with backend
    if (email && password) {
      if (isAdminLogin) {
        onLogin("admin");
      } else {
        onLogin("user");
      }
    }
   console.log("Login attempted with:", { email, password, rememberMe });
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.location.href = "/"}
            className="inline-block"
          >
            <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              SockShop
            </h1>
          </button>
          <p className="text-gray-600">Welcome back! Please login to your account.</p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-medium">{isAdminLogin ? "Admin Login" : "Login"}</CardTitle>
            {/* <CardDescription>
              {isAdminLogin 
                ? "Admin access only - Authorized personnel" 
                : "Enter your credentials to continue"}
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {isAdminLogin && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                  <p className="text-orange-800">
                    This area is restricted to authorized administrators only.
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="email">Email Address</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder={isAdminLogin ? "admin@sockshop.com" : "you@example.com"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-gray-600 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-700"
                >
                  {isAdminLogin ? "Contact Support" : "Forgot password?"}
                </button>
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  isAdminLogin
                    ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                }`}
              >
                {isAdminLogin ? "Admin Sign In" : "Sign In"}
              </Button>

              {!isAdminLogin && (
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={()=> navigate("/signup")}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Back to home link */}
        {/* <div className="text-center mt-6">
          <button
            onClick={onNavigateHome}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Home
          </button>
        </div> */}
      </motion.div>
    </div>
  );
}
export default LoginPage;