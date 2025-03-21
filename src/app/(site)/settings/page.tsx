'use client'
import React from 'react'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

const Settings = () => {
  const { setTheme, theme } = useTheme()

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="h-full p-4 pt-0">
      <h1 className="text-3xl font-semibold text-purple-600 mb-5">Settings</h1>
      <div className=" shadow-sm  p-5">
        <div className="flex items-center justify-between">
          <h1 className="font-bold">Dark mode</h1>
          <Switch
            checked={theme === 'dark' ? true : false}
            onCheckedChange={(checked) => (checked ? setTheme('dark') : setTheme('light'))}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
