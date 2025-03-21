'use client'

import { Controller, useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Info } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useSession } from 'next-auth/react'

type FormData = {
  username: string
  email: string
  name: string
  age: number
  favoriteAnimeGenre: string
}

export function PersonalInfoSection() {
  const { data } = useSession()
  const user = data?.user

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      username: 'Vedant',
      email: user?.email || '',
      name: user?.name || '',
      age: 0,
      favoriteAnimeGenre: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log('submit')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Username Field */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="username" className="text-foreground">
            Username
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Username can&apos;t be changed</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <Input
              id="username"
              defaultValue={field.value}
              disabled
              placeholder="Enter your username"
              {...field}
              required
              className="w-full"
            />
          )}
        />
      </div>

      {/* Name and Email Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground">
            Full Name
          </Label>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                id="name"
                placeholder="Enter your full name"
                {...field}
                required
                className="w-full"
              />
            )}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...field}
                required
                className="w-full"
              />
            )}
          />
        </div>
      </div>

      {/* Age and Anime Genre Fields */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-foreground">
            Age
          </Label>
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                min={13}
                max={99}
                {...field}
                required
                className="w-full"
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">Favorite Anime Genre</Label>
          <Controller
            control={control}
            name="favoriteAnimeGenre"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => setValue('favoriteAnimeGenre', value)}
              >
                <SelectTrigger className="w-full">
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
            )}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="w-fit">
          Save
        </Button>
      </div>
    </form>
  )
}
