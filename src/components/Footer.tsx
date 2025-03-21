import Link from 'next/link'
import { Button } from './ui/button'
import { Star, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-4 sm:p-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className=" items-center">
              <img src="./logo.png" alt="Logo" className="w-8 sm:w-10 rounded-full mb-2" />
              <h3 className="text-xl font-bold text-primary">AnimeVerse</h3>
            </div>
            <p className="text-muted-foreground">
              Your ultimate destination for anime discoveries and recommendations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Connect */}
          <div className="space-y-3">
            <h4 className="font-semibold text-primary">Connect</h4>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="icon"
                className="group hover:text-primary hover:border-primary"
                asChild
              >
                <Link href="https://github.com/VedantBhawsar/anime-streaming/">
                  <Star className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="hover:text-primary hover:border-primary"
                asChild
              >
                <Link href="https://github.com/VedantBhawsar/anime-streaming/">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="group hover:text-primary hover:border-primary"
                asChild
              >
                <Link href="https://x.com/vedantBhavsar8/">
                  <Twitter className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t bg-muted/50">
        <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AnimeVerse. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
