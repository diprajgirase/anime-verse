'use client'

import React from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { PersonalInfoSection } from '@/components/account/PersonalInfoSection'
import { ResetPasswordSection } from '@/components/account/ResetPasswordSection'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useSession } from 'next-auth/react'

export default function AccountPage() {
  const { data } = useSession()
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-primary mb-6">Account</h1>
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
        {/* Profile Image Card */}
        <Card className="lg:col-span-1 md:col-span-1 sm:col-span-full">
          <CardContent className="flex justify-center p-6">
            <div className="relative w-full aspect-square rounded-full flex justify-center items-center bg-muted">
              <div className="flex flex-col items-center gap-2">
                <img src={data?.user.image as string} alt="image " />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="lg:col-span-3 md:col-span-1 sm:col-span-full">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Personal Information</CardTitle>
            <CardDescription>This is my personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <PersonalInfoSection />
          </CardContent>
        </Card>

        {/* Reset Password Card */}
        <Card className="lg:col-start-2 lg:col-span-3 md:col-span-2 sm:col-span-full">
          <CardHeader>
            <CardTitle className="text-xl text-primary">Reset Password</CardTitle>
            <CardDescription>Reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordSection />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
