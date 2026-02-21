'use client'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onDismiss: () => void
}

export default function Toast({ message, type, onDismiss }: ToastProps) {
  return (
    <div
      onClick={onDismiss}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 toast-in cursor-pointer"
    >
      <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-body shadow-2xl ${
        type === 'success'
          ? 'text-black'
          : 'text-white'
      }`}
        style={type === 'success'
          ? { background: '#00f5d4', boxShadow: '0 0 30px rgba(0,245,212,0.4)' }
          : { background: '#ff2d78', boxShadow: '0 0 30px rgba(255,45,120,0.4)' }
        }>
        <span>
          {type === 'success' ? '🎵' : '❌'}
        </span>
        <span className="font-medium max-w-xs truncate">{message}</span>
      </div>
    </div>
  )
}
