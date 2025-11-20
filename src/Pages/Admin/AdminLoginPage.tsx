import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
// import { Alert, AlertDescription } from "../../ui/alert";
import { useNavigate } from "react-router-dom";
import Loading from '../../ui/Spinner';

// interface AdminLoginPageProps {
//   onLogin: () => void;
//   onNavigateToAdminSignup: () => void;
//   onNavigateHome: () => void;
// }

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
    // adminCode: "",
  });
  // const { email, password, adminCode } = form;
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.email.trim()) {
      newErrors.email = "Admin email is required";
    } else if (!form.email.includes("@")) {
      newErrors.email = "Invalid email format";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
     if (!form.rememberMe) {
      newErrors.rememberMe = "Please check remember me";
    }
    // if (!adminCode.trim()) {
    //   newErrors.adminCode = "Admin code is required";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  if (validateForm()) {
    console.log("Admin Login Data:", form);
    setTimeout(() => {
      navigate("/admin");
      setLoading(false);
    }, 3000);
    } else {
        setLoading(false);
    }
    };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          {/* <button
            onClick={() =>navigate("/")}
            className="inline-block"
          >
            <h1 className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              SockShop Admin
            </h1>
          </button> */}
          <div className="flex align-middle justify-center">
            <img src="/logo2.png" alt="company logo" className="w-32" />
          </div>
          <div className="mt-4">
            <p className="text-gray-600 flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" />
                Authorized Personnel Only
            </p>
          </div>
        </div>
        <Card className="border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-orange-600" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Access the SockShop administration panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-900">
                This area is restricted to authorized administrators only. Unauthorized access attempts will be logged and reported.
              </AlertDescription>
            </Alert> */}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Admin Email */}
              <div>
                <label htmlFor="email">Admin Email</label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@sockshop.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.email ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* Admin Code */}
              {/* <div>
                <label htmlFor="adminCode">Admin Code</label>
                <div className="relative mt-1.5">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="adminCode"
                    type="text"
                    placeholder="Enter your admin code"
                    value={adminCode}
                    onChange={(e) => {
                      setAdminCode(e.target.value);
                      setErrors({ ...errors, adminCode: "" });
                    }}
                    className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.adminCode ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.adminCode && (
                  <p className="text-red-500 mt-1">{errors.adminCode}</p>
                )}
                <p className="text-gray-500 mt-1">
                  Contact IT support if you don't have an admin code
                </p>
              </div> */}

              {/* Password */}
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => {
                      setForm({ ...form, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                    className={`pl-10 pr-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.password ? "border-red-500" : ""}`}
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
                {errors.password && (
                  <p className="text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={form.rememberMe}
                    onCheckedChange={(checked) => {
                        setForm({ ...form, rememberMe: checked as boolean });
                        setErrors({ ...errors, rememberMe: "" });
                    }}
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
                  className="text-orange-600 hover:text-orange-700"
                >
                  Forgort password?
                </button>
              </div>
                {errors.rememberMe && (
                    <p className="text-red-500" style={{marginTop: "0.25rem"}}>{errors.rememberMe}</p>
                )}
              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                {loading ? (
                    <Loading size={20} color="white" />
                    ) : (
                    <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Admin Sign In
                    </>
                    )}
              </Button>

              {/* Security Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mt-4">
                <p className="text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  All admin activities are logged and monitored
                </p>
              </div>

              {/* Signup Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  Need admin access?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/admin/register")}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Request Admin Account
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
export default AdminLoginPage;