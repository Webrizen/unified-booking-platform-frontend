'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, User, Lock, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Account created successfully! Redirecting to login...');
      
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length;
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-indigo-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              UnifyBook
            </span>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Join thousands of users booking amazing experiences
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center text-zinc-900 dark:text-white">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
              Enter your details to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Alerts */}
            {error && (
              <Alert variant="destructive" className="border-red-200 dark:border-red-800">
                <AlertDescription className="text-red-800 dark:text-red-200">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="pl-10 bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email"
                    className="pl-10 bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 bg-white dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 focus:border-indigo-500 dark:focus:border-indigo-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-zinc-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-zinc-400" />
                    )}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex gap-1 h-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-full transition-all ${
                            index < strengthScore 
                              ? strengthColors[strengthScore - 1] 
                              : 'bg-zinc-200 dark:bg-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-3 h-3 ${
                          passwordStrength.length ? 'text-green-500' : 'text-zinc-300'
                        }`} />
                        <span>8+ characters</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-3 h-3 ${
                          passwordStrength.uppercase ? 'text-green-500' : 'text-zinc-300'
                        }`} />
                        <span>Uppercase</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-3 h-3 ${
                          passwordStrength.number ? 'text-green-500' : 'text-zinc-300'
                        }`} />
                        <span>Number</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-3 h-3 ${
                          passwordStrength.special ? 'text-green-500' : 'text-zinc-300'
                        }`} />
                        <span>Special char</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="text-center space-y-4 pt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Already have an account?{' '}
                <Button
                  variant="link"
                  className="p-0 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  onClick={() => router.push('/auth/sign-in')}
                >
                  Sign in here
                </Button>
              </p>
              
              <div className="text-xs text-zinc-500 dark:text-zinc-500 space-y-1">
                <p>By signing up, you agree to our Terms of Service</p>
                <p>and Privacy Policy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Secure</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Easy</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">Fast</p>
          </div>
        </div>
      </div>
    </div>
  );
}