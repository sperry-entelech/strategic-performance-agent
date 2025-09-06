'use client';

import { ReactNode } from 'react';
import { Loader2, Brain, Sparkles } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  );
}

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

export function Skeleton({ className = '', children }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}>
      {children}
    </div>
  );
}

export function BriefSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto" />
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto" />
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Context Card */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mb-4" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Cards */}
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface GeneratingBriefProps {
  message?: string;
}

export function GeneratingBrief({ message = "Generating your strategic brief..." }: GeneratingBriefProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">
      <div className="relative">
        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Brain className="w-10 h-10 text-white animate-pulse" />
        </div>
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-30 animate-ping" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          {message}
        </h3>
        <p className="text-gray-400">
          Analyzing your context and generating personalized recommendations...
        </p>
      </div>

      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We encountered an error. Please try again.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 space-y-6">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
        <div className="w-8 h-8 text-red-600 dark:text-red-400">⚠️</div>
      </div>
      
      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}