'use client'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin, Send, MessageCircle, UserRound } from 'lucide-react'

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    alert('Form submission coming soon!')
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300 p-10">
      <Card className="w-full max-w-xl border-2 border-pink-300 shadow-2xl bg-pink-50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-pink-600">Contact AnimeVerse</CardTitle>
          <CardDescription className="text-purple-800">
            We&apos;re here to help and listen to our community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md border border-pink-200">
            <h2 className="text-2xl font-semibold text-purple-800 text-center mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <UserRound className="mr-2 h-4 w-4 text-pink-600" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 flex items-center"
                  >
                    <Mail className="mr-2 h-4 w-4 text-pink-600" />
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 flex items-center"
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-pink-600" />
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 flex items-center justify-center mx-auto"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Additional Support Options */}
          <div className="text-center space-y-4 bg-white p-6 rounded-lg shadow-md border border-pink-200">
            <h2 className="text-2xl font-semibold text-purple-800">Need More Help?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Check out our Help Center or Community Forums for quick answers to common questions.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/help">
                <Button className="bg-pink-600 hover:bg-pink-700">Help Center</Button>
              </Link>
              <Link href="/community">
                <Button
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-100"
                >
                  Community Forums
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
