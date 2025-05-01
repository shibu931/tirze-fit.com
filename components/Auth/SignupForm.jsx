"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { createUser, verifyInvitationCode } from "@/lib/actions/user.action";

export default function SignupForm({
  className,
  invitationCode,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    invitationCode: invitationCode || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error when user types
    if (error[name]) {
      setError(prev => ({ ...prev, [name]: undefined }));
    }
    // Clear server error
    if (error.server) setError(prev => ({ ...prev, server: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError({}); // Reset errors

    // Client-side validation
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formData.invitationCode && formData.invitationCode.length !== 8) {
      errors.invitationCode = "Invitation code must be 8 characters";
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsLoading(false);
      return;
    }

    if (formData.invitationCode) {
      try {
        const codeResponse = await verifyInvitationCode(formData.invitationCode);
        if (!codeResponse.success) {
          setError({ invitationCode: "Invalid invitation code" });
          setIsLoading(false);
          return;
        }
      } catch (err) {
        setError({ invitationCode: "Error verifying invitation code" });
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await createUser(formData);
      if (!response.success) {
        throw new Error(response.message || "Failed to create account");
      }
      toast.success("Account created successfully!");
      router.push("/verify-email?email=" + formData.email);
    } catch (err) {
      if (err.message.includes("email")) {
        setError({ email: err.message });
      } else if (err.message.includes("invitation")) {
        setError({ invitationCode: err.message });
      } else {
        setError({ server: err.message });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formData.invitationCode.length === 8) {
      verifyInvitationCode(formData.invitationCode)
        .then(response => {
          if (!response.success) {
            setError(prev => ({ ...prev, invitationCode: "Invalid invitation code" }));
          } else {
            setError(prev => ({ ...prev, invitationCode: undefined }));
          }
        })
        .catch(() => setError(prev => ({ ...prev, invitationCode: "Error verifying code" })));
    } else if (formData.invitationCode.length > 0) {
      setError(prev => ({ ...prev, invitationCode: "Must be 8 characters" }));
    } else {
      setError(prev => ({ ...prev, invitationCode: undefined }));
    }
  }, [formData.invitationCode]);

  useEffect(() => {
    setDisabled(
      !formData.name || 
      !formData.email || 
      !formData.password || 
      formData.password.length < 8 ||
      Object.keys(error).some(key => error[key])
    );
  }, [formData, error]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create an Account</CardTitle>
          <CardDescription>
            Enter the details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              
              <div className="grid grid-cols-2 gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password <span className="text-gray-500 text-sm font-light">(Must be 8 char)</span></Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                />
                {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="invitationCode">
                  Invitation Code <span className="text-gray-500 text-sm font-light">(Optional)</span>
                </Label>
                <Input
                  id="invitationCode"
                  name="invitationCode"
                  type="text"
                  value={formData.invitationCode}
                  onChange={handleChange}
                  disabled={!!invitationCode}
                />
                {error.invitationCode && (
                  <p className="text-red-500 text-sm">{error.invitationCode}</p>
                )}
              </div>
              {error.server && (
                <p className="text-red-500 text-sm -mt-4">{error.server}</p>
              )}
              <Button 
                type="submit" 
                className="w-full bg-blue-700 hover:bg-blue-800"
                disabled={disabled || isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth?tab=login" className="underline underline-offset-4">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}