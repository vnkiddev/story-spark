import BookGrid from '@/components/BookGrid'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl animate-bounce opacity-20">🌟</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse opacity-30">🦄</div>
        <div className="absolute bottom-10 left-20 text-5xl animate-bounce-slow opacity-25">🌈</div>
        <div className="absolute bottom-20 right-10 text-3xl animate-pulse opacity-20">✨</div>
        
        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-sm shadow-xl border-b-4 border-pink-300">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="text-6xl animate-bounce-slow">📚</div>
                  <div className="absolute -top-2 -right-2 text-2xl animate-spin">✨</div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                    Hyan's Stories Collection
                  </h1>
                  <p className="text-pink-600 text-lg mt-2 font-medium">
                    Magical stories for little dreamers ✨
                  </p>
                </div>
              </div>
              <Link 
                href="/admin" 
                className="bg-pink-100 hover:bg-pink-200 text-pink-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 shadow-md"
              >
                👑 Admin
              </Link>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border-2 border-pink-200 mb-6">
              <span className="text-3xl animate-bounce">🎭</span>
              <h2 className="text-2xl md:text-3xl font-bold text-pink-700">
                Welcome to Story Time!
              </h2>
              <span className="text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🎪</span>
            </div>
            <p className="text-lg text-pink-600 max-w-2xl mx-auto leading-relaxed">
              Dive into a world of wonder and imagination! Choose your favorite story and let the adventure begin. 
              Each book is a doorway to magical places and exciting characters! 🌟
            </p>
          </div>

          {/* Fun Stats or Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="font-bold text-pink-700 text-lg mb-2">Interactive Reading</h3>
              <p className="text-pink-600 text-sm">Zoom, navigate, and explore every page!</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="font-bold text-pink-700 text-lg mb-2">Beautiful Stories</h3>
              <p className="text-pink-600 text-sm">Colorful illustrations and engaging tales!</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 text-center shadow-lg border-2 border-pink-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-4xl mb-3">🌟</div>
              <h3 className="font-bold text-pink-700 text-lg mb-2">Kid-Friendly</h3>
              <p className="text-pink-600 text-sm">Safe, fun, and easy to use interface!</p>
            </div>
          </div>

          {/* Stories Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full px-8 py-4 shadow-lg mb-4">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl md:text-2xl font-bold">
                Choose Your Adventure
              </h2>
              <span className="text-2xl">🚀</span>
            </div>
            <p className="text-pink-600 text-lg">
              Click on any story to start reading! 
            </p>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto px-4 pb-12">
        <BookGrid />
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t-4 border-pink-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">💖</span>
            <p className="text-pink-600 font-medium">Made with love for little readers</p>
            <span className="text-2xl">💖</span>
          </div>
          <p className="text-pink-500 text-sm">
            Happy reading! Remember, every book is a new adventure waiting to be discovered! 🌈
          </p>
        </div>
      </footer>
    </main>
  )
}