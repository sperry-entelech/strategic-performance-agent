'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { 
  Terminal, FileText, TrendingUp, Download, Settings, 
  Bot, Share2, Calendar, Zap, Activity, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of numbers, letters, and symbols
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store the y position of each column
    const drops: number[] = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Black background with slight transparency for trailing effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF00';
      ctx.font = `${fontSize}px monospace`;

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character
        ctx.fillStyle = i % 3 === 0 ? '#00FF00' : '#008F00'; // Vary the green intensity
        ctx.fillText(char, i * fontSize, drops[i]);

        // Reset drop to top randomly
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i] += fontSize;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix Digital Rain Background */}
      <MatrixRain />

      {/* Main Interface */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center mb-4 px-4 py-2 border border-green-800/50 rounded-lg bg-black/50">
            <Terminal className="w-5 h-5 text-cyan-400 mr-2" />
            <span className="text-cyan-400">[AI]</span>
            <span className="text-green-400 ml-2">daily-brief.exe</span>
          </div>
          <h1 className="text-3xl font-bold text-green-400 mb-2 tracking-wider">
            STRATEGIC BRIEFING MATRIX
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            :: neural_network.accountability_protocol.active ::
          </p>
        </div>

        {/* Core Functions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Input Node */}
          <Card className="bg-black/70 border border-green-800/50 hover:border-green-500/70 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-800/50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-green-400">
                    INPUT.NODE
                  </CardTitle>
                </div>
                <span className="text-xs text-orange-400 px-2 py-1 bg-orange-900/20 rounded">
                  EVENING
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-cyan-300 text-sm">
                Data collection & context logging protocol
              </p>
              <Link href="/journal" className="block">
                <Button className="w-full bg-gradient-to-r from-green-900 to-green-800 hover:from-green-800 hover:to-green-700 text-green-100 border-green-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Execute Input Sequence
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Output Node */}
          <Card className="bg-black/70 border border-cyan-800/50 hover:border-cyan-500/70 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-800/50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                  </div>
                  <CardTitle className="text-lg text-cyan-400">
                    OUTPUT.NODE
                  </CardTitle>
                </div>
                <span className="text-xs text-orange-400 px-2 py-1 bg-orange-900/20 rounded">
                  MORNING
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-cyan-300 text-sm">
                Strategic directive generation & optimization
              </p>
              <Link href="/brief" className="block">
                <Button className="w-full bg-gradient-to-r from-cyan-900 to-cyan-800 hover:from-cyan-800 hover:to-cyan-700 text-cyan-100 border-cyan-600">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Generate Brief Matrix
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Function Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/50 border border-purple-800/50 hover:border-purple-500/70 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Bot className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xs text-purple-300 font-medium">AUTOMATE</div>
              <div className="text-xs text-gray-400">Schedule & Sync</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-yellow-800/50 hover:border-yellow-500/70 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Download className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xs text-yellow-300 font-medium">EXPORT</div>
              <div className="text-xs text-gray-400">Data & Reports</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-orange-800/50 hover:border-orange-500/70 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Share2 className="w-6 h-6 text-orange-400 mx-auto mb-2" />
              <div className="text-xs text-orange-300 font-medium">SHARE</div>
              <div className="text-xs text-gray-400">Distribute Brief</div>
            </CardContent>
          </Card>

          <Card className="bg-black/50 border border-red-800/50 hover:border-red-500/70 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-xs text-red-300 font-medium">CONFIG</div>
              <div className="text-xs text-gray-400">System Params</div>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Console */}
        <div className="bg-black/80 border border-green-800/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs">NEURAL_LINK.ACTIVE</span>
          </div>
          <div className="text-xs text-cyan-300 opacity-70">
            {'>'} Awaiting directive input...
          </div>
        </div>
      </div>
    </main>
  );
}

