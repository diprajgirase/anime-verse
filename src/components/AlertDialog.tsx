import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Info, AlertTriangle, CheckCircle2 } from 'lucide-react'

// Enum for alert types
const AlertType = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
}

// Component to render different icons based on alert type
const AlertIcon = ({ type, className }: { type: string; className: string }) => {
  switch (type) {
    case AlertType.INFO:
      return <Info className={`text-blue-500 ${className}`} />
    case AlertType.WARNING:
      return <AlertTriangle className={`text-yellow-500 ${className}`} />
    case AlertType.SUCCESS:
      return <CheckCircle2 className={`text-green-500 ${className}`} />
    case AlertType.ERROR:
      return <AlertTriangle className={`text-red-500 ${className}`} />
    default:
      return null
  }
}
export enum EAlertType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
}

interface AnimeAlertDialogProps {
  trigger: boolean
  title: string
  description?: string
  type?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export default function AnimeAlertDialog({
  trigger,
  title,
  description,
  type = AlertType.INFO,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: AnimeAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant="outline">Open Alert</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent className="border-2 border-pink-300 rounded-xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <AlertIcon type={type} className="w-12 h-12" />
            <AlertDialogTitle className="text-2xl text-purple-700">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-gray-600">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} className="hover:bg-gray-100">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`
              ${
                type === AlertType.ERROR
                  ? 'bg-red-500 hover:bg-red-600'
                  : type === AlertType.SUCCESS
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-pink-600 hover:bg-pink-700'
              }
              text-white
            `}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { AlertType }
