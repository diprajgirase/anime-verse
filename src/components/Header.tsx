'use client'

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { Home, TvIcon, ListTodo, Lightbulb, Menu, X } from 'lucide-react'
import { protestRevolution } from '@/fonts'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SearchBar from './SearchBar'
import Image from 'next/image'

export default function Header() {
  const pathName = usePathname()
  const { data } = useSession()
  const user = data?.user
  const [isOpen, setIsOpen] = useState(false)

  const navigationMenu = [
    {
      href: '/',
      icon: <Home className="h-4 w-4" />,
      label: 'Home',
      hoverClass: 'group/home',
    },
    {
      href: '/explore',
      icon: <TvIcon className="h-4 w-4" />,
      label: 'Explore',
      hoverClass: 'group/anime',
    },
    {
      href: '/recommendations',
      icon: <Lightbulb className="h-4 w-4" />,
      label: 'Recommendations',
      hoverClass: 'group/recommendations',
    },
    {
      href: '/watchlist',
      icon: <ListTodo className="h-4 w-4" />,
      label: 'Watchlist',
      hoverClass: 'group/watchlist',
    },
  ]

  const NavItems = () => (
    <>
      {navigationMenu.map((item) => (
        <NavigationMenuItem key={item.href}>
          <NavigationMenuLink asChild>
            <Link
              href={item.href}
              className={cn(
                'relative flex items-center gap-2 transition-colors rounded-md p-2 text-sm',
                'hover:bg-accent hover:text-accent-foreground',
                item.href.split('/')[1] === pathName.split('/')[1]
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground',
                isOpen ? 'w-full' : '',
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </>
  )
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span
            className={`text-xl sm:text-2xl font-bold text-primary ${protestRevolution.className}`}
          >
            AnimeVerse
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="mr-auto ml-5 hidden md:block">
          <NavigationMenuList className="flex gap-1">
            <NavItems />
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto pr-10">
            <Button variant="ghost" size="icon">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 flex justify-start items-center flex-col">
            <NavigationMenu className="mt-8 ">
              <NavigationMenuList className="flex flex-col gap-2">
                <NavItems />
                <div className=" w-3/4 flex justify-center items-center">
                  <SearchBar />
                </div>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetContent>
        </Sheet>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.image || 'https://github.com/shadcn.png'} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="default" size={'sm'} asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
