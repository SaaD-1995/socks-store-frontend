import { useState } from "react";
import { motion } from "motion/react";
import { 
  Save, 
  Store, 
  Mail, 
  CreditCard, 
  Truck, 
  Globe, 
  Bell,
  Search as SearchIcon,
  Lock,
  Palette
} from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../ui/card";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Separator } from "../../ui/separator";
import { toast } from "sonner";

function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "SockShop",
    storeEmail: "support@sockshop.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Sock Street, New York, NY 10001",
    currency: "USD",
    timezone: "America/New_York",
    language: "en"
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "noreply@sockshop.com",
    smtpPassword: "••••••••",
    senderName: "SockShop",
    senderEmail: "noreply@sockshop.com"
  });

  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: true,
    codEnabled: false,
    stripePublicKey: "pk_test_••••••••",
    stripeSecretKey: "sk_test_••••••••",
    paypalClientId: "••••••••"
  });

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: "50",
    standardShippingCost: "5.99",
    expressShippingCost: "12.99",
    internationalShippingCost: "19.99",
    processingTime: "1-2"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    customerNotifications: true,
    inventoryNotifications: true,
    marketingEmails: false,
    lowStockThreshold: "10"
  });

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "SockShop - Premium Socks for Every Occasion",
    metaDescription: "Discover our collection of premium socks. Quality, comfort, and style in every step.",
    metaKeywords: "socks, athletic socks, dress socks, cozy socks",
    googleAnalytics: "UA-••••••••",
    facebookPixel: "••••••••"
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: "#9333ea",
    secondaryColor: "#ec4899",
    accentColor: "#f59e0b",
    logoUrl: "",
    faviconUrl: ""
  });

  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully!");
  };

  const handleSaveEmail = () => {
    toast.success("Email settings saved successfully!");
  };

  const handleSavePayment = () => {
    toast.success("Payment settings saved successfully!");
  };

  const handleSaveShipping = () => {
    toast.success("Shipping settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully!");
  };

  const handleSaveSEO = () => {
    toast.success("SEO settings saved successfully!");
  };

  const handleSaveAppearance = () => {
    toast.success("Appearance settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settings</h1>
        <p className="text-gray-600">Manage your store configuration and preferences</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-7 h-auto gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Store className="h-4 w-4" />
            <span className="inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="shipping" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span className="inline">Shipping</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4" />
            <span className="inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your store's basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="storeName">Store Name</label>
                    <input
                      id="storeName"
                      value={generalSettings.storeName}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, storeName: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="storeEmail">Store Email</label>
                    <input
                      id="storeEmail"
                      type="email"
                      value={generalSettings.storeEmail}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, storeEmail: e.target.value })}
                       className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="storePhone">Store Phone</label>
                    <input
                      id="storePhone"
                      value={generalSettings.storePhone}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, storePhone: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="currency">Currency</label>
                    <Select value={generalSettings.currency} onValueChange={(value) => setGeneralSettings({ ...generalSettings, currency: value })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="timezone">Timezone</label>
                    <Select value={generalSettings.timezone} onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="language">Language</label>
                    <Select value={generalSettings.language} onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="storeAddress">Store Address</label>
                    <textarea
                      id="storeAddress"
                      value={generalSettings.storeAddress}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, storeAddress: e.target.value })}
                      rows={2}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveGeneral}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Configure SMTP settings for sending emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="smtpHost">SMTP Host</label>
                    <input
                      id="smtpHost"
                      value={emailSettings.smtpHost}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                      placeholder="smtp.example.com"
                       className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="smtpPort">SMTP Port</label>
                    <input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                      placeholder="587"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="smtpUsername">SMTP Username</label>
                    <input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="smtpPassword">SMTP Password</label>
                    <input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="senderName">Sender Name</label>
                    <input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="senderEmail">Sender Email</label>
                    <input
                      id="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveEmail}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and gateways</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div className="space-y-4">
                  <h3>Payment Methods</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-gray-900">Stripe</p>
                        <p className="text-gray-500">Credit/Debit Card Payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.stripeEnabled}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, stripeEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-gray-900">PayPal</p>
                        <p className="text-gray-500">PayPal Payments</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.paypalEnabled}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, paypalEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-gray-900">Cash on Delivery</p>
                        <p className="text-gray-500">Pay when you receive</p>
                      </div>
                    </div>
                    <Switch
                      checked={paymentSettings.codEnabled}
                      onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, codEnabled: checked })}
                    />
                  </div>
                </div>

                <Separator />

                {/* API Keys */}
                {paymentSettings.stripeEnabled && (
                  <div className="space-y-4">
                    <h3>Stripe Configuration</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="stripePublicKey">Publishable Key</label>
                        <input
                          id="stripePublicKey"
                          value={paymentSettings.stripePublicKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                          placeholder="pk_test_..."
                          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label htmlFor="stripeSecretKey">Secret Key</label>
                        <input
                          id="stripeSecretKey"
                          type="password"
                          value={paymentSettings.stripeSecretKey}
                          onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                          placeholder="sk_test_..."
                          className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentSettings.paypalEnabled && (
                  <div className="space-y-4">
                    <h3>PayPal Configuration</h3>
                    <div>
                      <label htmlFor="paypalClientId">Client ID</label>
                      <input
                        id="paypalClientId"
                        value={paymentSettings.paypalClientId}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalClientId: e.target.value })}
                        placeholder="Enter PayPal Client ID"
                        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSavePayment}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Shipping Settings */}
        <TabsContent value="shipping">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure shipping rates and delivery options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</label>
                    <input
                      id="freeShippingThreshold"
                      type="number"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, freeShippingThreshold: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-gray-500 mt-1">Orders above this amount get free shipping</p>
                  </div>

                  <div>
                    <label htmlFor="processingTime">Processing Time (days)</label>
                    <input
                      id="processingTime"
                      value={shippingSettings.processingTime}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, processingTime: e.target.value })}
                      placeholder="1-2"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="standardShipping">Standard Shipping Cost ($)</label>
                    <input
                      id="standardShipping"
                      type="number"
                      step="0.01"
                      value={shippingSettings.standardShippingCost}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, standardShippingCost: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-gray-500 mt-1">Delivery in 5-7 business days</p>
                  </div>

                  <div>
                    <label htmlFor="expressShipping">Express Shipping Cost ($)</label>
                    <input
                      id="expressShipping"
                      type="number"
                      step="0.01"
                      value={shippingSettings.expressShippingCost}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, expressShippingCost: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  "
                    />
                    <p className="text-gray-500 mt-1">Delivery in 2-3 business days</p>
                  </div>

                  <div>
                    <label htmlFor="internationalShipping">International Shipping Cost ($)</label>
                    <input
                      id="internationalShipping"
                      type="number"
                      step="0.01"
                      value={shippingSettings.internationalShippingCost}
                      onChange={(e) => setShippingSettings({ ...shippingSettings, internationalShippingCost: e.target.value })}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-gray-500 mt-1">Delivery in 10-15 business days</p>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveShipping}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure email and system notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Order Notifications</p>
                      <p className="text-gray-500">Receive notifications for new orders</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, orderNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Customer Notifications</p>
                      <p className="text-gray-500">Notifications for new customer registrations</p>
                    </div>
                    <Switch
                      checked={notificationSettings.customerNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, customerNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Inventory Notifications</p>
                      <p className="text-gray-500">Alerts for low stock levels</p>
                    </div>
                    <Switch
                      checked={notificationSettings.inventoryNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, inventoryNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-gray-900">Marketing Emails</p>
                      <p className="text-gray-500">Receive marketing and promotional emails</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketingEmails: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <label htmlFor="lowStockThreshold">Low Stock Alert Threshold</label>
                  <input
                    id="lowStockThreshold"
                    type="number"
                    value={notificationSettings.lowStockThreshold}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockThreshold: e.target.value })}
                    placeholder="10"
                    className="mt-1.5 max-w-xs"
                  />
                  <p className="text-gray-500 mt-1">Get notified when stock falls below this number</p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveNotifications}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your store for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="metaTitle">Meta Title</label>
                    <input
                      id="metaTitle"
                      value={seoSettings.metaTitle}
                      onChange={(e) => setSeoSettings({ ...seoSettings, metaTitle: e.target.value })}
                      placeholder="Your store's meta title"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      maxLength={60}
                    />
                    <p className="text-gray-500 mt-1">{seoSettings.metaTitle.length}/60 characters</p>
                  </div>

                  <div>
                    <label htmlFor="metaDescription">Meta Description</label>
                    <textarea
                      id="metaDescription"
                      value={seoSettings.metaDescription}
                      onChange={(e) => setSeoSettings({ ...seoSettings, metaDescription: e.target.value })}
                      placeholder="A brief description of your store"
                      rows={3}
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      maxLength={160}
                    />
                    <p className="text-gray-500 mt-1">{seoSettings.metaDescription.length}/160 characters</p>
                  </div>

                  <div>
                    <label htmlFor="metaKeywords">Meta Keywords</label>
                    <input
                      id="metaKeywords"
                      value={seoSettings.metaKeywords}
                      onChange={(e) => setSeoSettings({ ...seoSettings, metaKeywords: e.target.value })}
                      placeholder="keyword1, keyword2, keyword3"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3>Analytics & Tracking</h3>
                  
                  <div>
                    <label htmlFor="googleAnalytics">Google Analytics ID</label>
                    <input
                      id="googleAnalytics"
                      value={seoSettings.googleAnalytics}
                      onChange={(e) => setSeoSettings({ ...seoSettings, googleAnalytics: e.target.value })}
                      placeholder="UA-XXXXXXXXX-X"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="facebookPixel">Facebook Pixel ID</label>
                    <input
                      id="facebookPixel"
                      value={seoSettings.facebookPixel}
                      onChange={(e) => setSeoSettings({ ...seoSettings, facebookPixel: e.target.value })}
                      placeholder="XXXXXXXXXXXXXXXX"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveSEO}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize your store's look and feel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3>Brand Colors</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="primaryColor">Primary Color</label>
                      <div className="flex gap-2 mt-1.5">
                        <input
                          id="primaryColor"
                          type="color"
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                          className="w-16 h-10 p-1"
                        />
                        <input
                          value={appearanceSettings.primaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="secondaryColor">Secondary Color</label>
                      <div className="flex gap-2 mt-1.5">
                        <input
                          id="secondaryColor"
                          type="color"
                          value={appearanceSettings.secondaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                          className="w-16 h-10 p-1"
                        />
                        <input
                          value={appearanceSettings.secondaryColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="accentColor">Accent Color</label>
                      <div className="flex gap-2 mt-1.5">
                        <input
                          id="accentColor"
                          type="color"
                          value={appearanceSettings.accentColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                          className="w-16 h-10 p-1"
                        />
                        <input
                          value={appearanceSettings.accentColor}
                          onChange={(e) => setAppearanceSettings({ ...appearanceSettings, accentColor: e.target.value })}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Color Preview */}
                  <div className="p-6 rounded-lg" style={{ background: `linear-gradient(to right, ${appearanceSettings.primaryColor}, ${appearanceSettings.secondaryColor}, ${appearanceSettings.accentColor})` }}>
                    <p className="text-white text-center">Color Preview</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3>Brand Assets</h3>
                  
                  <div>
                    <label htmlFor="logoUrl">Logo URL</label>
                    <input
                      id="logoUrl"
                      value={appearanceSettings.logoUrl}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, logoUrl: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label htmlFor="faviconUrl">Favicon URL</label>
                    <input
                      id="faviconUrl"
                      value={appearanceSettings.faviconUrl}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, faviconUrl: e.target.value })}
                      placeholder="https://example.com/favicon.ico"
                      className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={handleSaveAppearance}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AdminSettings;