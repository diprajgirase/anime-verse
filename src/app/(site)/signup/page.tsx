'use client'
import { Github, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'

type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
  name: string
  age: number
  image: string
  favoriteAnimeGenre: string
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const number = Math.round(Math.random() * 10)
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      image: `/avatars/${number}.png`,
      name: '',
      age: 0,
      favoriteAnimeGenre: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const response = await signIn('credentials', {
        ...data,
        image: `/avatars/${number}.png`,
        redirect: false,
      })

      if (response?.error) {
        toast.error(`Sign-up failed: ${response.error}`)
      } else if (response?.ok) {
        toast.success('Sign-up successful!')
        redirect('/')
      }
    } catch (error) {
      console.error('Error signing up:', error)
      toast.error('An unexpected error occurred. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-lg border-2 border-primary/20 shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
            Join AnimeVerse
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create your account and start your anime journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="username">Username</Label>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                }}
                render={({ field }) => (
                  <div className="mt-1">
                    <Input
                      id="username"
                      placeholder="Choose a unique username"
                      className="w-full"
                      {...field}
                    />
                    {errors.username && (
                      <span className="text-sm text-destructive mt-1">
                        {errors.username.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: 'Full name is required' }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Input id="name" placeholder="Enter your full name" {...field} />
                      {errors.name && (
                        <span className="text-sm text-destructive mt-1">{errors.name.message}</span>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
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
                      <Input id="email" type="email" placeholder="Enter your email" {...field} />
                      {errors.email && (
                        <span className="text-sm text-destructive mt-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password</Label>
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
                        placeholder="Create a strong password"
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
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: 'Please confirm your password',
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                  }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Repeat your password"
                        {...field}
                      />
                      {errors.confirmPassword && (
                        <span className="text-sm text-destructive mt-1">
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Controller
                  control={control}
                  name="age"
                  rules={{
                    required: 'Age is required',
                    min: {
                      value: 13,
                      message: 'You must be at least 13 years old',
                    },
                    max: {
                      value: 99,
                      message: 'Please enter a valid age',
                    },
                  }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Input id="age" type="number" placeholder="Enter your age" {...field} />
                      {errors.age && (
                        <span className="text-sm text-destructive mt-1">{errors.age.message}</span>
                      )}
                    </div>
                  )}
                />
              </div>

              <div>
                <Label>Favorite Anime Genre</Label>
                <Controller
                  control={control}
                  name="favoriteAnimeGenre"
                  rules={{ required: 'Please select a genre' }}
                  render={({ field }) => (
                    <div className="mt-1">
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your favorite genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="shonen">Shonen</SelectItem>
                          <SelectItem value="slice-of-life">Slice of Life</SelectItem>
                          <SelectItem value="mecha">Mecha</SelectItem>
                          <SelectItem value="romance">Romance</SelectItem>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                          <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.favoriteAnimeGenre && (
                        <span className="text-sm text-destructive mt-1">
                          {errors.favoriteAnimeGenre.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
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
              <Button variant="outline" size="icon" type="button">
                <Github className="size-4" />
              </Button>
              <Button variant="outline" size="icon" type="button">
                <Twitter className="size-4" />
              </Button>
              <Button variant="outline" size="icon" type="button">
                <Mail className="size-4" />
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/signin"
                className="text-primary hover:text-primary/90 hover:underline text-sm"
              >
                Already have an account? Sign In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
