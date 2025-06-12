import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from 'lucide-react';

const loginFormSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log('LoginPage loaded');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userId: "", // Default TSB User ID for quick testing: "user123"
      password: "", // Default TSB Password for quick testing: "password123"
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log('Login attempt:', data);
    // Simulate API call
    if (data.userId === "user123" && data.password === "password123") {
      setLoginError(null);
      console.log("Login successful, navigating to dashboard...");
      // Redirect to accounts dashboard on successful login
      navigate('/accounts-dashboard');
    } else {
      setLoginError("Invalid User ID or Password. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-blue-600" />
          <CardTitle className="text-2xl font-bold mt-2">TSB Customer Login</CardTitle>
          <CardDescription>Access your accounts securely.</CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your User ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2 text-sm">
          <a href="#" className="text-blue-600 hover:underline">Forgot User ID or Password?</a>
          <a href="#" className="text-blue-600 hover:underline">Not a TSB customer? Register here.</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;