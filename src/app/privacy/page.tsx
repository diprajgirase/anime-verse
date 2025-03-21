import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Database, UserCheck, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AnimeVerse - Privacy Policy',
  description: 'Our commitment to protecting your privacy and data',
  openGraph: {
    title: 'AnimeVerse Privacy Policy',
    description: 'Comprehensive privacy guidelines for our anime community platform',
  },
}

export default function PrivacyPolicy() {
  const privacyHighlights = [
    {
      icon: Shield,
      title: 'Data Protection',
      description: 'We prioritize the security and confidentiality of your personal information.',
    },
    {
      icon: Lock,
      title: 'Minimal Data Collection',
      description: 'We collect only essential information necessary for platform functionality.',
    },
    {
      icon: Database,
      title: 'Transparent Practices',
      description: 'Clear and honest communication about how we handle and use your data.',
    },
    {
      icon: UserCheck,
      title: 'User Control',
      description:
        'Empowering you with choices about your personal information and privacy settings.',
    },
  ]

  const privacySections = [
    {
      title: 'Information We Collect',
      content:
        'AnimeVerse collects minimal user data to provide and improve our service. This may include email address, username, and viewing preferences. We do not collect sensitive personal information beyond what is necessary for account management and personalization.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your data is used solely to enhance your AnimeVerse experience. This includes personalizing recommendations, improving site functionality, and communicating important platform updates. We never sell or share your personal information with third parties without explicit consent.',
    },
    {
      title: 'Data Security',
      content:
        'We implement industry-standard security measures to protect your personal information. This includes encrypted connections, secure data storage, and regular security audits to prevent unauthorized access or data breaches.',
    },
    {
      title: 'Third-Party Links',
      content:
        'Our platform may contain links to external anime streaming services. We are not responsible for the privacy practices of these third-party sites. We recommend reviewing their privacy policies when accessing external content.',
    },
    {
      title: 'Cookies and Tracking',
      content:
        'AnimeVerse uses minimal cookies to improve user experience and site functionality. You can manage cookie preferences through your browser settings. We do not use invasive tracking technologies.',
    },
  ]

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300 p-10">
      <Card className="w-full max-w-8xl border-2 border-pink-300 shadow-2xl bg-pink-50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-pink-600">Privacy Policy</CardTitle>
          <CardDescription className="text-purple-800">
            Your data privacy and security are our top priorities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Privacy Highlights */}
          <div className="grid md:grid-cols-2 gap-6">
            {privacyHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md border border-pink-400"
              >
                <highlight.icon className="h-10 w-10 text-pink-600" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">{highlight.title}</h3>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Privacy Sections */}
          <div className="space-y-6">
            {privacySections.map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-pink-200">
                <h2 className="text-2xl font-semibold text-purple-800 mb-4">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </div>
            ))}
          </div>

          {/* User Rights and Contact */}
          <div className="text-center space-y-6 bg-white p-6 rounded-lg shadow-md border border-pink-200">
            <h2 className="text-2xl font-semibold text-purple-800">Your Privacy Rights</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              You have the right to access, correct, or delete your personal information. If you
              have any privacy-related questions or concerns, please contact us at
              privacy@animeverse.com.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact">
                <Button className="bg-pink-600 hover:bg-pink-700">Contact Support</Button>
              </Link>
              <Link href="/account/settings">
                <Button
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-100"
                >
                  Manage Privacy Settings
                </Button>
              </Link>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-gray-600">
            <p>Last Updated: December 1, 2024</p>
            <p className="mt-2 text-sm text-gray-500">© 2024 AnimeVerse. All rights reserved.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
