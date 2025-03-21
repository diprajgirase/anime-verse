'use client'

import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type FormData = {
  confirmPassword: string
  oldpassword: string
  newPassword: string
}

export function ResetPasswordSection() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      confirmPassword: '',
      newPassword: '',
      oldpassword: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log('submit')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Old Password Field */}
        <div className="space-y-2">
          <Label htmlFor="oldpassword" className="text-foreground">
            Old Password
          </Label>
          <Controller
            control={control}
            name="oldpassword"
            render={({ field }) => (
              <Input
                type="password"
                id="oldpassword"
                placeholder="Enter your old password"
                {...field}
                required
                className="w-full"
              />
            )}
          />
        </div>

        {/* New Password Field */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-foreground">
            New Password
          </Label>
          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                {...field}
                required
                className="w-full"
              />
            )}
          />
        </div>
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-foreground">
          Confirm New Password
        </Label>
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              id="confirmPassword"
              placeholder="Confirm your new password"
              type="password"
              {...field}
              required
              className="w-full sm:w-1/2"
            />
          )}
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" variant="destructive" className="w-full sm:w-auto">
          Change Password
        </Button>
      </div>
    </form>
  )
}
