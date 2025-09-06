'use client';

import Link from 'next/link';
import { ArrowLeft, Sun, Target, Zap, Users, RotateCw, CheckCircle, Download, Printer, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

export default function BriefPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [rating, setRating] = useState(0);

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    if (checked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter(id => id !== itemId));
    }
  };

  // Mock data - in real app, this would come from API
  const briefData = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    generatedAt: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    context: {
      energy: { level: 7, label: 'Good Energy', color: 'text-green-400' },
      hours: 4,
      workload: { level: 'Moderate', color: 'bg-yellow-500' },
      complexity: 'Moderate'
    },
    primaryDirective: "Execute strategic goal achievement - prioritize high-impact initiatives requiring focused attention",
    supportingActivities: [
      "Conduct comprehensive research and competitive analysis",
      "Prepare detailed project framework with success metrics",
      "Schedule strategic collaboration discussions"
    ],
    teamDelegations: [
      "Delegate research tasks to team for next-day briefing",
      "Request team support for communication drafting"
    ],
    alternatives: [
      "Switch to administrative and planning tasks if creative energy is low",
      "Use energy dips for research and data organization activities"
    ],
    estimatedDuration: 4.0
  };

  const actionItems = [
    { id: 'primary', text: briefData.primaryDirective, priority: 'high' },
    ...briefData.supportingActivities.map((activity, index) => ({
      id: `activity-${index}`,
      text: activity,
      priority: 'medium' as const
    })),
    ...briefData.teamDelegations.map((delegation, index) => ({
      id: `delegation-${index}`,
      text: `Delegate: ${delegation}`,
      priority: 'low' as const
    }))
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const completionPercentage = Math.round((checkedItems.length / actionItems.length) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                <Sun className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Strategic Morning Brief
            </h1>
            
            <p className="text-xl text-gray-300">
              {briefData.date}
            </p>
            
            <p className="text-gray-400">
              Generated: {briefData.generatedAt}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Brief Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Context Summary */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Today's Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{briefData.context.energy.level}/10</div>
                    <div className={`text-sm ${briefData.context.energy.color}`}>{briefData.context.energy.label}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{briefData.context.hours}h</div>
                    <div className="text-sm text-gray-400">Available</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`${briefData.context.workload.color} text-white`}>
                      {briefData.context.workload.level}
                    </Badge>
                    <div className="text-sm text-gray-400 mt-1">Workload</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{briefData.estimatedDuration}h</div>
                    <div className="text-sm text-gray-400">Estimated</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Primary Directive */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  Primary Strategic Directive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white leading-relaxed">
                  {briefData.primaryDirective}
                </p>
              </CardContent>
            </Card>

            {/* Supporting Activities */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  Supporting Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {briefData.supportingActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed">{activity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Partner Delegations */}
            {briefData.teamDelegations.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-cyan-400" />
                    Team Coordination
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {briefData.teamDelegations.map((delegation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <Users className="w-5 h-5 text-cyan-400 mt-1" />
                        <p className="text-gray-300 leading-relaxed">{delegation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Alternatives */}
            {briefData.alternatives.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <RotateCw className="w-5 h-5 mr-2 text-orange-400" />
                    Alternatives & Contingencies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {briefData.alternatives.map((alternative, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <RotateCw className="w-5 h-5 text-orange-400 mt-1" />
                        <p className="text-gray-300 leading-relaxed">{alternative}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Progress
                  </span>
                  <Badge className="bg-green-500 text-white">
                    {completionPercentage}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400">
                  {checkedItems.length} of {actionItems.length} tasks completed
                </p>
              </CardContent>
            </Card>

            {/* Action Checklist */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Today's Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionItems.map((item) => (
                    <div key={item.id} className={`border-l-4 ${getPriorityColor(item.priority)} pl-3`}>
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked)}
                          className="mt-1"
                        />
                        <label 
                          htmlFor={item.id} 
                          className={`text-sm cursor-pointer ${
                            checkedItems.includes(item.id) 
                              ? 'text-gray-500 line-through' 
                              : 'text-gray-300'
                          }`}
                        >
                          {item.text}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" onClick={() => window.print()}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print Brief
                  </Button>
                  
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                  
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={() => setCheckedItems(actionItems.map(item => item.id))}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark All Complete
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Brief Quality</CardTitle>
                <CardDescription>Help improve future briefs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white text-sm">How useful was this brief?</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-600'
                          } hover:text-yellow-300 transition-colors`}
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-12 text-center">
          <Link href="/journal">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
              Complete Tomorrow's Journal
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function Label({ children, className, ...props }: any) {
  return <label className={className} {...props}>{children}</label>;
}