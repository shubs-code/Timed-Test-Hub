'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Implement Google OAuth login logic here
    signIn();
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulating API call
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

