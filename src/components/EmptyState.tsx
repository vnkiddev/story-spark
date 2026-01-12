export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-8">
        <div className="text-8xl mb-4 animate-bounce-slow">📚</div>
        <div className="absolute -top-2 -right-2 text-3xl animate-spin">✨</div>
        <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🌟</div>
      </div>
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-pink-200 text-center max-w-md">
        <h2 className="text-3xl font-bold text-pink-600 mb-4">No Stories Yet!</h2>
        <p className="text-pink-500 text-lg leading-relaxed mb-4">
          The magical library is waiting for its first story! 
        </p>
        <p className="text-pink-400 text-sm">
          Ask an admin to add some wonderful books for you to read! 🌈📖
        </p>
      </div>
      <div className="mt-6 flex gap-4 text-4xl">
        <span className="animate-bounce" style={{animationDelay: '0s'}}>🦄</span>
        <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🌈</span>
        <span className="animate-bounce" style={{animationDelay: '0.4s'}}>⭐</span>
        <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🎭</span>
        <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🎪</span>
      </div>
    </div>
  )
}