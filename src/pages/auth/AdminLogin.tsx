
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";

export default function AdminLogin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Link to="/" className="flex items-center gap-2 text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        
        <Card className="border-border shadow-glass-sm bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
            </div>
            <CardDescription>
              Login to access the admin control panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="auth-code">Authentication Code</Label>
                <Input id="auth-code" type="text" placeholder="2FA Code" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full mb-4" onClick={() => window.location.href = "/admin/dashboard"}>
              Sign In
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Access restricted to system administrators
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
