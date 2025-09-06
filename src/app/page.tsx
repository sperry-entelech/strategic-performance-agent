'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { 
  Terminal, FileText, TrendingUp, Download, Settings, 
  Bot, Share2, Calendar, Zap, Activity, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TreyarchKnot = () => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 120 120"
      className="text-green-400"
    >
      <defs>
        <filter id="matrixGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
      
      {/* Treyarch-style trinity knot - three interlocked curved triangles */}
      <g filter="url(#matrixGlow)" className="animate-pulse">
        {/* First curve - top */}
        <path
          d="M60,20 Q80,40 60,60 Q40,40 60,20 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Second curve - bottom left */}
        <path
          d="M35,75 Q55,95 75,75 Q55,55 35,75 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Third curve - bottom right */}
        <path
          d="M85,75 Q65,55 45,75 Q65,95 85,75 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Center interlocking ring */}
        <circle
          cx="60"
          cy="60"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.8"
        />
      </g>
      
      {/* Digital accent dots at key points */}
      <circle cx="60" cy="30" r="1" fill="currentColor" className="animate-ping" />
      <circle cx="45" cy="80" r="1" fill="currentColor" className="animate-ping" style={{animationDelay: '0.7s'}} />
      <circle cx="75" cy="80" r="1" fill="currentColor" className="animate-ping" style={{animationDelay: '1.4s'}} />
    </svg>
  );
};

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
          <div className="mb-6">
            <TreyarchKnot />
          </div>
          <div className="mb-4">
            <div className="text-green-400 text-xs mb-1 tracking-widest font-mono">
              01001001 01001110 01001001 01010100 01001001 01000001 01001100 01001001 01011010 01001001 01001110 01000111
            </div>
            <h1 className="text-2xl font-bold text-green-400 mb-2 tracking-[0.3em] font-mono">
              STRATEGIC_BRIEFING_MATRIX
            </h1>
            <div className="text-green-400 text-xs mb-4 tracking-widest font-mono">
              01010010 01010101 01001110 01001110 01001001 01001110 01000111
            </div>
          </div>
          <div className="text-green-300 text-sm opacity-90 font-mono tracking-wider">
            {'>'} NEURAL_NETWORK.ACCOUNTABILITY_PROTOCOL.ACTIVE
          </div>
          <div className="text-green-400 text-xs mt-2 font-mono opacity-70">
            {'>'} AWAITING_USER_INPUT...
          </div>
        </div>

        {/* Core Functions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Input Node */}
          <Card className="bg-black/80 border border-green-500/50 hover:border-green-400/80 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-900/70 border border-green-500/50 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-green-400 font-mono tracking-wider">
                    INPUT_NODE
                  </CardTitle>
                </div>
                <div className="text-xs text-green-300 px-3 py-1 bg-green-900/30 border border-green-600/50 font-mono">
                  EVENING_LOG
                </div>
              </div>
              <div className="text-green-400 text-xs font-mono mt-2 opacity-70">
                01001001 01001110 01010000 01010101 01010100
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-green-300 text-sm font-mono">
                {'>'} DATA_COLLECTION_PROTOCOL_ACTIVE
              </div>
              <div className="text-green-400 text-xs font-mono opacity-80 space-y-1">
                <div>{'>'} CONTEXT_LOGGING.enabled</div>
                <div>{'>'} PERFORMANCE_METRICS.tracking</div>
                <div>{'>'} WORKLOAD_ASSESSMENT.running</div>
              </div>
              <Link href="/journal" className="block">
                <Button className="w-full bg-green-900/50 hover:bg-green-800/70 text-green-300 border border-green-500/50 hover:border-green-400/70 font-mono text-sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  EXECUTE_INPUT_SEQUENCE
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Output Node */}
          <Card className="bg-black/80 border border-green-500/50 hover:border-green-400/80 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-900/70 border border-green-500/50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-green-400 font-mono tracking-wider">
                    OUTPUT_NODE
                  </CardTitle>
                </div>
                <div className="text-xs text-green-300 px-3 py-1 bg-green-900/30 border border-green-600/50 font-mono">
                  MORNING_BRIEF
                </div>
              </div>
              <div className="text-green-400 text-xs font-mono mt-2 opacity-70">
                01001111 01010101 01010100 01010000 01010101 01010100
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-green-300 text-sm font-mono">
                {'>'} STRATEGIC_DIRECTIVE_GENERATION_ACTIVE
              </div>
              <div className="text-green-400 text-xs font-mono opacity-80 space-y-1">
                <div>{'>'} AI_OPTIMIZATION.running</div>
                <div>{'>'} CLEAR_FRAMEWORK.processing</div>
                <div>{'>'} PRIORITY_SEQUENCING.enabled</div>
              </div>
              <Link href="/brief" className="block">
                <Button className="w-full bg-green-900/50 hover:bg-green-800/70 text-green-300 border border-green-500/50 hover:border-green-400/70 font-mono text-sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  GENERATE_BRIEF_MATRIX
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Function Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-black/70 border border-green-600/50 hover:border-green-400/80 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Bot className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xs text-green-300 font-mono font-medium">AUTOMATE</div>
              <div className="text-xs text-green-500 font-mono opacity-70">SCHEDULE.sync</div>
            </CardContent>
          </Card>

          <Card className="bg-black/70 border border-green-600/50 hover:border-green-400/80 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Download className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xs text-green-300 font-mono font-medium">EXPORT</div>
              <div className="text-xs text-green-500 font-mono opacity-70">DATA.reports</div>
            </CardContent>
          </Card>

          <Card className="bg-black/70 border border-green-600/50 hover:border-green-400/80 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Share2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xs text-green-300 font-mono font-medium">SHARE</div>
              <div className="text-xs text-green-500 font-mono opacity-70">DISTRIBUTE.brief</div>
            </CardContent>
          </Card>

          <Card className="bg-black/70 border border-green-600/50 hover:border-green-400/80 transition-all group cursor-pointer">
            <CardContent className="p-4 text-center">
              <Settings className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xs text-green-300 font-mono font-medium">CONFIG</div>
              <div className="text-xs text-green-500 font-mono opacity-70">SYSTEM.params</div>
            </CardContent>
          </Card>
        </div>

        {/* Matrix Console */}
        <div className="bg-black/90 border border-green-500/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-400 animate-pulse"></div>
            <span className="text-green-400 text-sm font-mono tracking-wider">NEURAL_LINK.ACTIVE</span>
            <div className="flex-1 h-px bg-green-500/30"></div>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="text-green-400">
              {'>'} SYSTEM_STATUS: OPERATIONAL
            </div>
            <div className="text-green-300 opacity-80">
              {'>'} BRIEFING_MATRIX: INITIALIZED  
            </div>
            <div className="text-green-400 opacity-60">
              {'>'} AWAITING_USER_DIRECTIVE...
            </div>
            <div className="flex items-center mt-4">
              <span className="text-green-400">{'>'}</span>
              <span className="text-green-300 ml-2 animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

