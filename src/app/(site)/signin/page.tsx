'use client'
import { Github, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

type FormData = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      })
      if (response?.error) {
        alert(`Sign-in failed: ${response.error}`)
      } else if (response?.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('Error signing in:', error)
      alert('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to continue your anime adventure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[\w.%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full"
                        {...field}
                      />
                      {errors.email && (
                        <span className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full"
                        {...field}
                      />
                      {errors.password && (
                        <span className="text-sm text-destructive mt-1">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" size="icon">
                <Github className="size-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="size-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="size-4" />
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/signup"
                className="text-primary hover:text-primary/90 hover:underline text-sm"
              >
                Don&apos;t have an account? Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
