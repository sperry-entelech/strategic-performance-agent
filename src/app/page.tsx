import Link from 'next/link';
import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Daily Brief
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-300">
              Evening journal → Morning brief. Simple accountability system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/journal">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-3 text-lg font-medium">
                  Evening Journal
                </Button>
              </Link>
              
              <Link href="/brief">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg">
                  Morning Brief
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

