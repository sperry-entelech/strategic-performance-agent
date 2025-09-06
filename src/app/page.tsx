import Link from 'next/link';
import { Terminal, FileText, TrendingUp, Clock, User, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="border-b border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400">daily-brief</span>
            <span className="text-green-500">$</span>
            <span className="text-orange-400 animate-pulse">_</span>
          </div>
        </div>
      </div>

      {/* Main Hub */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            > DAILY BRIEF SYSTEM
          </h1>
          <p className="text-cyan-300 text-lg">
            // Personal accountability & strategic optimization hub
          </p>
        </div>

        {/* Command Menu */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Evening Journal */}
          <Card className="bg-gray-900/50 border border-green-800/50 hover:border-green-600/70 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-cyan-400" />
                <CardTitle className="text-xl text-green-400">
                  <span className="text-orange-400">01.</span> EVENING JOURNAL
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-cyan-300">
                Log daily performance metrics, challenges, and context data
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">•</span>
                  <span className="text-gray-300">Energy levels & workload assessment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">•</span>
                  <span className="text-gray-300">Team interactions & delegation notes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">•</span>
                  <span className="text-gray-300">Key accomplishments & blockers</span>
                </div>
              </div>
              <Link href="/journal" className="block">
                <Button className="w-full bg-green-800 hover:bg-green-700 text-green-100 border-green-600 mt-4">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span className="text-orange-400">./journal</span> --start
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Morning Brief */}
          <Card className="bg-gray-900/50 border border-blue-800/50 hover:border-blue-600/70 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <CardTitle className="text-xl text-blue-400">
                  <span className="text-orange-400">02.</span> MORNING BRIEF
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-cyan-300">
                AI-generated strategic directives based on journal analysis
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-gray-300">CLEAR framework optimization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-gray-300">Priority-based task sequencing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">•</span>
                  <span className="text-gray-300">Adaptive delegation strategies</span>
                </div>
              </div>
              <Link href="/brief" className="block">
                <Button className="w-full bg-blue-800 hover:bg-blue-700 text-blue-100 border-blue-600 mt-4">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span className="text-orange-400">./brief</span> --generate
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900/30 border border-gray-700 p-4 rounded">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm">UPTIME</span>
            </div>
            <div className="text-green-400 font-bold">24/7</div>
          </div>
          <div className="bg-gray-900/30 border border-gray-700 p-4 rounded">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm">STATUS</span>
            </div>
            <div className="text-green-400 font-bold">ACTIVE</div>
          </div>
          <div className="bg-gray-900/30 border border-gray-700 p-4 rounded">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-400 text-sm">MODE</span>
            </div>
            <div className="text-green-400 font-bold">OPTIMIZE</div>
          </div>
        </div>

        {/* Footer Commands */}
        <div className="text-center space-y-2 text-sm text-gray-500">
          <div>
            <span className="text-green-500">user@system</span>
            <span className="text-gray-600">:</span>
            <span className="text-blue-400">~/daily-brief</span>
            <span className="text-green-500">$</span>
            <span className="text-orange-400 ml-2">Ready for input...</span>
          </div>
        </div>
      </div>
    </main>
  );
}

