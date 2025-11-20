import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, User, Phone, ShieldCheck, Building, Briefcase, CheckCircle2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { Alert, AlertDescription } from "../../ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Link, useNavigate } from "react-router-dom";
import Spinner from '../../ui/Spinner';

function AdminSignUpPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    employeeId: "",
    requestReason: "",
    password: "",
    confirmPassword: "",
    referenceCode: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    }
    if (!formData.role) {
      newErrors.role = "Role is required";
    }
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }
    if (!formData.requestReason.trim()) {
      newErrors.requestReason = "Please explain why you need admin access";
    }
    if (!formData.referenceCode.trim()) {
      newErrors.referenceCode = "Reference code is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            alert("Admin access request submitted successfully!");
            navigate("/admin/login");
        }, 2000);

    //   onSignup();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          {/* <button
            onClick={() => navigate("/admin")}
            className="inline-block"
          >
            <h1 className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-2">
              SockShop Admin
            </h1>
          </button> */}
          <div className="flex align-middle justify-center">
            <img src="/logo2.png" alt="company logo" className="w-32 mx-auto" />
          </div>
          <div className="mt-4">
            <p className="text-gray-600 flex items-center justify-center gap-2">
                <ShieldCheck className="h-5 w-5 text-orange-600" />
                Request Administrative Access
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <ShieldCheck className="h-8 w-8  text-orange-600" />
              <h4 className="text-3xl font-medium"> Admin SignUp</h4>
            </CardTitle>
            {/* <CardDescription className="text-orange-600">
              Fill out this form to request admin access. Your request will be reviewed by IT administration.
            </CardDescription> */}
          </CardHeader>
          <CardContent>
            {/* <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-900">
                Admin access requires approval from IT management. False or unauthorized requests may result in disciplinary action.
              </AlertDescription>
            </Alert> */}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="mb-4 flex items-center gap-2 text-gray-900">
                  <User className="h-5 w-5 text-orange-600" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName">First Name</label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.firstName ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 mt-1">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.lastName ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 mt-1">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email">Company Email</label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="john.doe@sockshop.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone">Phone Number</label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.phone ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Employment Information */}
              <div className="border-t pt-6">
                <h3 className="mb-4 flex items-center gap-2 text-gray-900">
                  <Briefcase className="h-5 w-5 text-orange-600" />
                  Employment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="department">Department</label>
                    <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                      <SelectTrigger className={`mt-1.5 ${errors.department ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT & Technology</SelectItem>
                        <SelectItem value="sales">Sales & Marketing</SelectItem>
                        <SelectItem value="operations">Operations</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.department && (
                      <p className="text-red-500 mt-1">{errors.department}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="role">Requested Admin Role</label>
                    <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                      <SelectTrigger className={`mt-1.5 ${errors.role ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="productadmin">Product Manager</SelectItem>
                        <SelectItem value="orderadmin">Order Manager</SelectItem>
                        <SelectItem value="customeradmin">Customer Support Admin</SelectItem>
                        <SelectItem value="contentadmin">Content Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && (
                      <p className="text-red-500 mt-1">{errors.role}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="employeeId">Employee ID</label>
                    <div className="relative mt-1.5">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="employeeId"
                        type="text"
                        placeholder="EMP-12345"
                        value={formData.employeeId}
                        onChange={(e) => handleChange("employeeId", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.employeeId ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.employeeId && (
                      <p className="text-red-500 mt-1">{errors.employeeId}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="referenceCode">Manager Reference Code</label>
                    <div className="relative mt-1.5">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="referenceCode"
                        type="text"
                        placeholder="REF-XXXXXX"
                        value={formData.referenceCode}
                        onChange={(e) => handleChange("referenceCode", e.target.value)}
                        className={`pl-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.referenceCode ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.referenceCode && (
                      <p className="text-red-500 mt-1">{errors.referenceCode}</p>
                    )}
                    <p className="text-gray-500 mt-1">
                      Provided by your direct manager
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Justification */}
              <div className="border-t pt-6">
                <h3 className="mb-4 flex items-center gap-2 text-gray-900">
                  <CheckCircle2 className="h-5 w-5 text-orange-600" />
                  Access Justification
                </h3>
                <div>
                  <label htmlFor="requestReason">Why do you need admin access?</label>
                  <textarea
                    id="requestReason"
                    placeholder="Please provide a detailed explanation of why you require administrative access..."
                    value={formData.requestReason}
                    onChange={(e) => handleChange("requestReason", e.target.value)}
                    className={`mt-1.5 min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.requestReason ? "border-red-500" : ""}`}
                  />
                  {errors.requestReason && (
                    <p className="text-red-500 mt-1">{errors.requestReason}</p>
                  )}
                </div>
              </div>

              {/* Password Section */}
              <div className="border-t pt-6">
                <h3 className="mb-4 flex items-center gap-2 text-gray-900">
                  <Lock className="h-5 w-5 text-orange-600" />
                  Create Password
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password">Password</label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
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

                  <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        className={`pl-10 pr-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                  <p className="text-blue-900 mb-2">Password must contain:</p>
                  <ul className="text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className={formData.password.length >= 8 ? "text-green-600" : ""}>
                        {formData.password.length >= 8 ? "✓" : "○"}
                      </span>
                      At least 8 characters
                    </li>
                  </ul>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2 border-t pt-6">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => {
                    setAgreeToTerms(checked as boolean);
                    if (checked) {
                      setErrors({ ...errors, terms: "" });
                    }
                  }}
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-gray-600 cursor-pointer"
                >
                  I agree to the{" "}
                  <Link to="#" className="text-orange-600 hover:text-orange-700">
                    Admin Terms and Conditions
                  </Link>{" "}
                  and acknowledge that admin activities are monitored and logged. I understand that misuse of admin privileges may result in immediate termination.
                </label>
              </div>
              {errors.terms && (
                <p className="text-red-500">{errors.terms}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                {loading ? (
                    <Spinner size={20} color="white" />
                    ) : (
                    <>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Submit Access Request
                    </>
                    )}
              </Button>

              {/* Info Notice */}
              <Alert className="border-blue-200 bg-blue-50">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  Your request will be reviewed within 24-48 hours. You will receive an email notification once approved or if additional information is needed.
                </AlertDescription>
              </Alert>

              {/* Login Link */}
              <div className="text-center pt-4 border-t">
                <p className="text-gray-600">
                  Already have admin access?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/admin/login")}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    Sign in
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
export default AdminSignUpPage;