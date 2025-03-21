import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Book, Heart, Users, Rocket } from 'lucide-react'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About AnimeVerse',
  description: 'Discover the passion behind our anime community platform',
  openGraph: {
    title: 'AnimeVerse - Connecting Anime Fans',
    description:
      'A global platform for anime enthusiasts to connect, explore, and celebrate anime culture',
  },
}

export default function About() {
  const communityFeatures = [
    {
      icon: Users,
      title: 'Global Community',
      description:
        'Connect with anime fans from around the world, share recommendations, and make lasting friendships.',
    },
    {
      icon: Book,
      title: 'Comprehensive Database',
      description:
        'Explore an extensive library of anime series, movies, and manga with detailed information and reviews.',
    },
    {
      icon: Heart,
      title: 'Personalized Recommendations',
      description: 'Get tailored anime suggestions based on your watching history and preferences.',
    },
    {
      icon: Rocket,
      title: 'Latest Updates',
      description: 'Stay informed about new releases, upcoming series, and trending anime content.',
    },
  ]

  const frequentlyAskedQuestions = [
    {
      question: 'What is Animeverse?',
      answer:
        'Animeverse is a free anime streaming website that provides links to anime content hosted on third-party services. It allows fans to watch their favorite anime online without any cost.',
    },
    {
      question: 'Does Animeverse host any anime files?',
      answer:
        'No, Animeverse does not host or store any anime files on its servers. All media is streamed through links from third-party hosting services.',
    },
    {
      question: 'Is Animeverse an official or licensed anime streaming platform?',
      answer:
        'No, Animeverse is not an official or licensed anime streaming platform. It is an independent site offering links to external sources for anime content.',
    },
    {
      question: 'How does Animeverse work?',
      answer:
        'Animeverse aggregates links to anime content hosted on various third-party platforms. When you select an anime, it streams directly from those external sources.',
    },
    {
      question: 'Is using Animeverse free?',
      answer:
        'Yes, Animeverse is completely free to use. You don’t need to pay any subscription fees to watch anime on our website.',
    },
    {
      question: 'Is Animeverse legal to use?',
      answer:
        'Animeverse links to publicly available resources on third-party services. However, the legality of streaming content through such links may vary by region. Users are encouraged to check local laws regarding streaming.',
    },
    {
      question: 'Can I download anime from Animeverse?',
      answer:
        'No, Animeverse does not provide download options. The platform is exclusively for streaming content linked from third-party hosts.',
    },
    {
      question: 'What should I do if a link is broken or not working?',
      answer:
        'If you encounter broken links, you can report them through the provided feature on the site. We will work to update or replace the links as quickly as possible.',
    },
    {
      question: 'Is my data safe while using Animeverse?',
      answer:
        'Animeverse does not collect sensitive user data. However, since the content is streamed from third-party services, users are advised to use appropriate privacy tools like a VPN for additional safety.',
    },
    {
      question: 'Why doesn’t Animeverse host its own files?',
      answer:
        'To focus on providing access to content and reduce server demands, Animeverse only links to external sources rather than hosting files directly.',
    },
  ]

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-300 p-10">
      <Card className="w-full max-w-8xl border-2 border-pink-300 shadow-2xl bg-pink-50">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-pink-600">Welcome to AnimeVerse</CardTitle>
          <CardDescription className="text-purple-800">
            Your ultimate destination for anime passion and community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Mission Statement */}
          <div className="text-center space-y-4">
            <img
              src={'/logo.png'}
              alt="logo"
              width={140}
              height={140}
              className="mx-auto text-pink-600"
            />
            <h2 className="text-2xl font-semibold text-purple-800">Our Mission</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              AnimeVerse is more than just a platform—it&apos;s a global community dedicated to
              celebrating the rich, diverse world of anime. We aim to connect fans, provide
              comprehensive resources, and create a welcoming space for anime enthusiasts of all
              levels.
            </p>
          </div>

          {/* Community Features */}
          <div className="grid md:grid-cols-2 gap-6">
            {communityFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md border border-pink-400"
              >
                <feature.icon className="h-10 w-10 text-pink-600" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Frequently Asked Questions */}
          <div>
            <h2 className="text-2xl font-semibold text-purple-800 text-center mb-6">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {frequentlyAskedQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-pink-600 hover:text-pink-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-4">
            <p className="text-xl text-purple-800 font-semibold">Ready to Join the AnimeVerse?</p>
            <div className="flex justify-center space-x-4">
              <Link href="/signup">
                <Button className="bg-pink-600 hover:bg-pink-700">Create Account</Button>
              </Link>
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-pink-600 text-pink-600 hover:bg-pink-100"
                >
                  Explore Anime
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
