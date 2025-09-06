import Link from 'next/link';
import { ArrowRight, Brain, Calendar, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Strategic Performance Agent
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
              Transform evening reflections into strategic morning directives. 
              Intelligently optimize your goals and priorities while adapting to real-world constraints.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link href="/journal">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold group">
                  Start Evening Journal
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/brief">
                <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                  View Morning Brief
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Intelligent Brief Generation</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI-powered strategic planning that adapts to your energy, schedule, and business priorities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Target className="w-8 h-8" />}
            title="Workload Intelligence"
            description="Automatically adjusts task complexity based on your capacity and commitments - from high-focus days to busy survival mode."
            gradient="from-blue-500 to-cyan-500"
          />
          
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="CLEAR Framework Application"
            description="Structured strategic thinking for maximum goal achievement with context-aware directive generation."
            gradient="from-purple-500 to-pink-500"
          />
          
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Smart Team Coordination"
            description="Intelligent delegation suggestions for busy periods, maintaining momentum through collaboration."
            gradient="from-green-500 to-emerald-500"
          />
          
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Energy Optimization"
            description="Matches task complexity to your predicted energy levels for sustainable high performance."
            gradient="from-yellow-500 to-orange-500"
          />
          
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Performance Tracking"
            description="Monitor completion rates, energy prediction accuracy, and revenue opportunity conversion."
            gradient="from-red-500 to-pink-500"
          />
          
          <FeatureCard
            icon={<Calendar className="w-8 h-8" />}
            title="Market Intelligence"
            description="Capture timing-sensitive opportunities and strategic priorities for maximum business impact."
            gradient="from-indigo-500 to-purple-500"
          />
        </div>
      </div>

      {/* Workflow Section */}
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Your Daily Workflow</h2>
            <p className="text-xl text-gray-400">Simple 2-step process for strategic optimization</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <WorkflowStep
              number="01"
              phase="Evening Reflection"
              title="Capture Tomorrow's Context"
              description="Spend 2-3 minutes capturing your energy forecast, available time, TNT workload, and market opportunities. Auto-save ensures nothing is lost."
              features={[
                "Energy level assessment with qualifiers",
                "TNT workload intensity classification",
                "Market opportunities and timing windows",
                "Partner coordination requirements"
              ]}
            />
            
            <WorkflowStep
              number="02"
              phase="Morning Execution"
              title="Strategic Brief & Action"
              description="Wake up to your AI-generated strategic brief with prioritized directives tailored to your constraints and opportunities."
              features={[
                "Primary strategic directive",
                "Supporting activities breakdown",
                "Partner delegation suggestions",
                "Alternative contingency plans"
              ]}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Optimize Your Strategic Performance?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join strategic professionals who have transformed their daily planning 
            with AI-powered intelligence and context-aware optimization.
          </p>
          
          <Link href="/journal">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-lg font-semibold">
              Begin Your Strategic Journey
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Strategic Performance Agent. Built for strategic revenue optimization.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}

function FeatureCard({ icon, title, description, gradient }: FeatureCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
      <CardHeader>
        <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-400 leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

interface WorkflowStepProps {
  number: string;
  phase: string;
  title: string;
  description: string;
  features: string[];
}

function WorkflowStep({ number, phase, title, description, features }: WorkflowStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {number}
        </div>
        <div>
          <div className="text-purple-400 font-semibold">{phase}</div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
      </div>
      
      <p className="text-gray-300 text-lg leading-relaxed">
        {description}
      </p>
      
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-400">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
