'use client'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IComment } from './AnimeBottomSection'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ICommentsListProps {
  comments: IComment[]
  className?: string
}

export function CommentsList({ comments, className }: ICommentsListProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {[...comments]
        ?.reverse()
        .map((comment) => <CommentCard comment={comment} key={comment.id} />)}
    </div>
  )
}

function CommentCard({ comment }: { comment: IComment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
    >
      <Card className="border border-primary/20">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row gap-4">
            <Avatar>
              <AvatarImage
                src={comment?.user?.image || ''}
                alt={`${comment?.name}'s avatar`}
                className="object-cover"
              />
              <AvatarFallback>{comment?.user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="font-semibold text-foreground">
                  {comment?.user.name || comment?.user?.email}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(comment?.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
