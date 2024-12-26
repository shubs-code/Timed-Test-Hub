'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface TestSetup {
  name: string;
  description: string;
  questionCount: number;
}

interface TestOverlayProps {
  testSetup: TestSetup;
}

export default function TestOverlay({ testSetup }: TestOverlayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [timeSpent, setTimeSpent] = useState<number[]>(new Array(testSetup.questionCount).fill(0))
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(testSetup.questionCount).fill(''))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const newTimes = [...prev]
        newTimes[currentQuestion - 1]++
        return newTimes
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentQuestion])

  const handleOptionSelect = (option: string) => {
    setSelectedAnswers(prev => {
      const newAnswers = [...prev]
      newAnswers[currentQuestion - 1] = option
      return newAnswers
    })
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1)
    } else if (direction === 'next' && currentQuestion < testSetup.questionCount) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium text-cyan-500">
            Q.No: {currentQuestion} Time: {formatTime(timeSpent[currentQuestion - 1])}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Test Menu</SheetTitle>
                <SheetDescription>
                  Access test options and navigation
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Button variant="outline" className="w-full">
                  Question Palette
                </Button>
                <Button variant="outline" className="w-full">
                  Mark for Review
                </Button>
                <Button variant="outline" className="w-full">
                  Clear Response
                </Button>
                <Button variant="outline" className="w-full">
                  Instructions
                </Button>
                <Button variant="outline" className="w-full">
                  Submit Test
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {['A', 'B', 'C', 'D'].map((option) => (
            <Button
              key={option}
              variant="outline"
              className={`h-12 text-lg ${
                selectedAnswers[currentQuestion - 1] === option
                  ? 'border-cyan-500 border-2'
                  : 'border-gray-200'
              }`}
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('prev')}
            disabled={currentQuestion === 1}
            className="text-cyan-500"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            PREV
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation('next')}
            disabled={currentQuestion === testSetup.questionCount}
            className="text-cyan-500"
          >
            NEXT
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}

