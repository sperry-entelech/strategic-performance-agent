'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Moon, Clock, Target, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export default function JournalPage() {
  const [energyLevel, setEnergyLevel] = useState([7]);
  const [tntWorkload, setTntWorkload] = useState('');
  const [completionStatus, setCompletionStatus] = useState(false);
  const [partnerCoordination, setPartnerCoordination] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getEnergyLabel = (value: number) => {
    if (value <= 2) return 'Exhausted';
    if (value <= 4) return 'Low Energy';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'Good Energy';
    return 'High Energy';
  };

  const getEnergyColor = (value: number) => {
    if (value <= 3) return 'text-red-400';
    if (value <= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTntAdvice = (workload: string) => {
    const advice = {
      'Light': {
        text: '🟢 Optimal Focus Day',
        details: 'Plan longer strategic sessions, complex projects, and important calls. Maximum productivity window available.',
        color: 'border-green-500 bg-green-500/10'
      },
      'Moderate': {
        text: '🟡 Balanced Approach',
        details: 'Focus on quick wins and efficient task completion. Balance commitments with consistent progress.',
        color: 'border-yellow-500 bg-yellow-500/10'
      },
      'Heavy': {
        text: '🟠 Micro-Task Mode',
        details: 'Limit to 15-minute focused windows. Prioritize delegation and relationship maintenance.',
        color: 'border-orange-500 bg-orange-500/10'
      },
      'Critical': {
        text: '🔴 Survival Mode',
        details: 'Maintenance only. Delegate everything possible. Focus on next-day recovery preparation.',
        color: 'border-red-500 bg-red-500/10'
      }
    };
    return advice[workload as keyof typeof advice];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to brief page
    window.location.href = '/brief';
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Moon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Evening Journal
            </h1>
            
            <p className="text-xl text-gray-300">
              Planning for: {tomorrowStr}
            </p>
            
            <p className="text-gray-400 max-w-2xl mx-auto">
              Capture tomorrow's context in 2-3 minutes to generate your strategic brief
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Energy Assessment */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Energy Assessment
              </CardTitle>
              <CardDescription>How will you feel tomorrow morning?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white mb-4 block">Energy Level (1-10)</Label>
                <div className="space-y-4">
                  <Slider
                    value={energyLevel}
                    onValueChange={setEnergyLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">{energyLevel[0]}</span>
                    <Badge className={`${getEnergyColor(energyLevel[0])}`}>
                      {getEnergyLabel(energyLevel[0])}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="energy-qualifier" className="text-white">Energy Context</Label>
                <Input
                  id="energy-qualifier"
                  placeholder="e.g., Well-rested, post-workout, had good sleep..."
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Time Allocation */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Time Allocation
              </CardTitle>
              <CardDescription>Tomorrow's Entelech capacity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="available-hours" className="text-white">Available Hours</Label>
                <Input
                  id="available-hours"
                  type="number"
                  min="0"
                  max="16"
                  step="0.5"
                  defaultValue="4"
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <Label htmlFor="time-constraints" className="text-white">Time Constraints & Schedule Notes</Label>
                <Textarea
                  id="time-constraints"
                  placeholder="Meetings, deadlines, travel, appointments..."
                  rows={3}
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Primary Workload */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Target className="w-5 h-5 mr-2 text-orange-400" />
                Primary Workload
              </CardTitle>
              <CardDescription>Main commitment intensity tomorrow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-white">Workload Intensity Level</Label>
                <Select value={tntWorkload} onValueChange={setTntWorkload}>
                  <SelectTrigger className="mt-2 bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select intensity..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-600">
                    <SelectItem value="Light">Light - Minimal commitments</SelectItem>
                    <SelectItem value="Moderate">Moderate - Normal schedule</SelectItem>
                    <SelectItem value="Heavy">Heavy - High pressure/busy</SelectItem>
                    <SelectItem value="Critical">Critical - Emergency/crisis mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tntWorkload && (
                <div className={`border-l-4 p-4 rounded-r-lg ${getTntAdvice(tntWorkload)?.color}`}>
                  <div className="font-semibold text-white mb-2">
                    {getTntAdvice(tntWorkload)?.text}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {getTntAdvice(tntWorkload)?.details}
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="tnt-description" className="text-white">Workload Context & Description</Label>
                <Textarea
                  id="tnt-description"
                  placeholder="Key meetings, projects, deadlines, travel, or special circumstances..."
                  rows={3}
                  className="mt-2 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Market Intelligence */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Goals & Opportunities
              </CardTitle>
              <CardDescription>Key opportunities and timing-sensitive goals</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="market-opportunities" className="text-white">Priority Opportunities</Label>
              <Textarea
                id="market-opportunities"
                placeholder="Important goals, deadlines, networking events, key meetings, strategic initiatives..."
                rows={4}
                className="mt-2 bg-gray-800 border-gray-600 text-white"
              />
            </CardContent>
          </Card>

          {/* Today's Completion */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Badge className="w-5 h-5 mr-2 text-purple-400" />
                Today's Completion
              </CardTitle>
              <CardDescription>Did you complete today's primary objectives?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="completion-status"
                  checked={completionStatus}
                  onCheckedChange={(checked) => setCompletionStatus(!!checked)}
                />
                <Label htmlFor="completion-status" className="text-white">
                  Today's key objectives completed successfully
                </Label>
              </div>
              
              {!completionStatus && (
                <div>
                  <Label htmlFor="blocker-description" className="text-white">What blocked completion?</Label>
                  <Textarea
                    id="blocker-description"
                    placeholder="Specific obstacles, dependencies, or issues that prevented completion..."
                    rows={3}
                    className="mt-2 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Strategic Priorities */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Sparkles className="w-5 h-5 mr-2 text-pink-400" />
                Strategic Priorities
              </CardTitle>
              <CardDescription>Biggest opportunities and concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <Label htmlFor="priority-concerns" className="text-white">Key Focus Areas</Label>
              <Textarea
                id="priority-concerns"
                placeholder="Most important opportunities, concerns, or strategic initiatives requiring attention..."
                rows={4}
                className="mt-2 bg-gray-800 border-gray-600 text-white"
              />
            </CardContent>
          </Card>

          {/* Team Coordination */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Team Coordination
              </CardTitle>
              <CardDescription>Collaboration and delegation needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="partner-coordination"
                  checked={partnerCoordination}
                  onCheckedChange={(checked) => setPartnerCoordination(!!checked)}
                />
                <Label htmlFor="partner-coordination" className="text-white">
                  Need team support tomorrow
                </Label>
              </div>
              
              {partnerCoordination && (
                <div>
                  <Label htmlFor="coordination-requests" className="text-white">Specific Team Requests</Label>
                  <Textarea
                    id="coordination-requests"
                    placeholder="Research tasks, communication, meeting preparation, administrative support, project coordination..."
                    rows={3}
                    className="mt-2 bg-gray-800 border-gray-600 text-white"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <Card className="bg-gradient-to-r from-purple-800/30 to-pink-800/30 border-purple-700">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Generating Brief...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Tomorrow's Brief
                      </>
                    )}
                  </Button>
                </div>
                
                <p className="text-gray-400 text-sm">
                  Auto-save enabled • Press Ctrl+S to save draft
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}