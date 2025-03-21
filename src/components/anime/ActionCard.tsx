'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Share2, Clock } from 'lucide-react'
import React from 'react'

export function ActionCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="lg:col-span-1 col-span-3"
    >
      <Card className="border-2 border-pink-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-pink-600">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full bg-pink-600 hover:bg-pink-700">
            <Heart className="mr-2 h-4 w-4" /> Add to Favorites
          </Button>
          <Button variant="outline" className="w-full">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
          <Button variant="outline" className="w-full">
            <Clock className="mr-2 h-4 w-4" /> Add to Watch Later
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// TODO : write a code for todo list
