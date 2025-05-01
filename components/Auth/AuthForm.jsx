'use client'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthForm() {
  const searchParams = useSearchParams();  
  const router = useRouter();
  const defaultTab = searchParams.get('tab') || 'login';
  const defaultInvitationCode = searchParams.get('invitationCode') || null;
  const [invitationCode, setInvitationCode] = useState(defaultInvitationCode);
  const [tab, setTab] = useState(defaultTab);
  
  useEffect(() => {
    setTab(searchParams.get('tab') || 'login');
  }, [searchParams]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', newTab);
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Log In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm invitationCode={invitationCode}/>
      </TabsContent>
    </Tabs>
  );
}