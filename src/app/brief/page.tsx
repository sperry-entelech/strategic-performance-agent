'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Sun, Target, Zap, Users, RotateCw, CheckCircle, Download, 
  Printer, Star, Share2, BookOpen, Clock, TrendingUp, AlertCircle, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout } from '@/components/layout/layout';
import { LoadingSpinner, GeneratingBrief, ErrorState } from '@/components/ui/loading';
import { useToast, useToastHelpers } from '@/components/ui/toast';

interface BriefData {
  date: string;
  generatedAt: string;
  context: {
    energy: { level: number; label: string; color: string };
    hours: number;
    workload: { level: string; color: string };
    complexity: string;
  };
  primaryDirective: string;
  supportingActivities: string[];
  teamDelegations: string[];
  alternatives: string[];
  estimatedDuration: number;
}

export default function EnhancedBriefPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { success, error: showError, taskCompleted } = useToastHelpers();

  // Load data on component mount
  useEffect(() => {
    loadBriefData();
  }, []);

  // Load saved checklist state
  useEffect(() => {
    const savedItems = localStorage.getItem('checkedItems');
    if (savedItems) {
      setCheckedItems(JSON.parse(savedItems));
    }
  }, []);

  // Save checklist state
  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const loadBriefData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData: BriefData = {
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

      setBriefData(mockData);
    } catch (err) {
      setError('Failed to load your strategic brief. Please try again.');
      showError('Loading Error', 'Failed to load your strategic brief.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (itemId: string, checked: boolean, taskName: string) => {
    if (checked) {
      setCheckedItems([...checkedItems, itemId]);
      taskCompleted(taskName);
    } else {
      setCheckedItems(checkedItems.filter(id => id !== itemId));
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      success('PDF Exported', 'Your strategic brief has been downloaded.');
    } catch (err) {
      showError('Export Failed', 'Unable to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Strategic Performance Agent - Morning Brief',
          text: 'Check out my strategic morning brief!',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        success('Link Copied', 'Share link copied to clipboard');
      }
    } catch (err) {
      showError('Share Failed', 'Unable to share. Please try again.');
    }
  };

  const submitFeedback = async () => {
    if (rating === 0) {
      showError('Rating Required', 'Please rate the brief quality before submitting.');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      success('Feedback Submitted', 'Thank you for helping us improve!');
      setRating(0);
    } catch (err) {
      showError('Submission Failed', 'Unable to submit feedback. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Layout showBackButton title="Strategic Brief" description="Your AI-generated morning briefing">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <GeneratingBrief message="Loading your strategic brief..." />
        </div>
      </Layout>
    );
  }

  if (error || !briefData) {
    return (
      <Layout showBackButton title="Strategic Brief">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState 
            title="Brief Unavailable"
            message={error || "Unable to load your strategic brief"}
            onRetry={loadBriefData}
          />
        </div>
      </Layout>
    );
  }

  const actionItems = [
    { id: 'primary', text: briefData.primaryDirective, priority: 'high' as const },
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

  const completionPercentage = Math.round((checkedItems.length / actionItems.length) * 100);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <Layout showBackButton title="Strategic Brief" description={briefData.date}>
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Enhanced Header with Actions */}
        <div className="mb-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sun className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Strategic Morning Brief
            </h1>
            
            <div className="flex items-center justify-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{briefData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Generated: {briefData.generatedAt}</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportPDF}
                disabled={isExporting}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                {isExporting ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Context Summary with Better Visual Hierarchy */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Today's Context & Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">
                      {briefData.context.energy.level}/10
                    </div>
                    <div className={`text-sm font-medium ${briefData.context.energy.color}`}>
                      {briefData.context.energy.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Energy Level</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">{briefData.context.hours}h</div>
                    <div className="text-sm text-blue-400 font-medium">Available</div>
                    <div className="text-xs text-gray-400 mt-1">Focus Time</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <Badge className={`${briefData.context.workload.color} text-white mb-1`}>
                      {briefData.context.workload.level}
                    </Badge>
                    <div className="text-xs text-gray-400 mt-1">Workload</div>
                  </div>
                  
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">
                      {briefData.estimatedDuration}h
                    </div>
                    <div className="text-sm text-purple-400 font-medium">Estimated</div>
                    <div className="text-xs text-gray-400 mt-1">Duration</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Primary Directive */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" />
                  🎯 Primary Strategic Directive
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Your most important focus for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-white leading-relaxed font-medium">
                  {briefData.primaryDirective}
                </p>
              </CardContent>
            </Card>

            {/* Enhanced Supporting Activities */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                  ⚡ Supporting Activities
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Key tasks that advance your strategic objectives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {briefData.supportingActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 leading-relaxed">{activity}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Team Coordination */}
            {briefData.teamDelegations.length > 0 && (
              <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-cyan-400" />
                    👥 Team Coordination
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Delegation opportunities to maximize your impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {briefData.teamDelegations.map((delegation, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors">
                        <Users className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-300 leading-relaxed">{delegation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Alternatives */}
            {briefData.alternatives.length > 0 && (
              <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <RotateCw className="w-5 h-5 mr-2 text-orange-400" />
                    🔄 Alternatives & Contingencies
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Backup plans for when circumstances change
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {briefData.alternatives.map((alternative, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors border-l-4 border-l-orange-400">
                        <AlertCircle className="w-5 h-5 text-orange-400 mt-1 flex-shrink-0" />
                        <p className="text-gray-300 leading-relaxed">{alternative}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Progress Tracker */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Progress
                  </span>
                  <Badge className="bg-green-500 text-white font-bold">
                    {completionPercentage}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 text-center">
                  {checkedItems.length} of {actionItems.length} tasks completed
                </p>
                {completionPercentage === 100 && (
                  <div className="mt-3 p-3 bg-green-900/30 rounded-lg border border-green-700">
                    <p className="text-green-400 text-sm font-medium text-center">
                      🎉 Excellent work! All tasks completed.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Action Checklist */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                  Today's Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {actionItems.map((item) => (
                    <div key={item.id} className={`border-l-4 ${getPriorityColor(item.priority)} pl-3 p-2 bg-gray-800/30 rounded-r-lg hover:bg-gray-800/50 transition-colors`}>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={item.id}
                          checked={checkedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleCheckboxChange(item.id, !!checked, item.text.substring(0, 30) + '...')}
                          className="mt-1"
                        />
                        <label 
                          htmlFor={item.id} 
                          className={`text-sm cursor-pointer leading-relaxed transition-all ${
                            checkedItems.includes(item.id) 
                              ? 'text-gray-500 line-through opacity-75' 
                              : 'text-gray-300 hover:text-white'
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

            {/* Enhanced Quick Actions */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={() => setCheckedItems(actionItems.map(item => item.id))}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark All Complete
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setCheckedItems([])}
                  >
                    <RotateCw className="w-4 h-4 mr-2" />
                    Reset Progress
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Feedback */}
            <Card className="bg-gray-900/90 border-gray-600 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Brief Quality</CardTitle>
                <CardDescription>Help us improve future briefs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm font-medium block mb-2">
                      How useful was this brief?
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-all hover:scale-110 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
                          }`}
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : ''}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={submitFeedback}
                    disabled={rating === 0}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Bottom Navigation */}
        <div className="mt-12 text-center">
          <Link href="/journal">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Complete Tomorrow's Journal
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}