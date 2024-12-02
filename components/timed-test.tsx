'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TimedTest() {
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(timer)
  }, [isRunning, timeLeft])

  const startTest = () => setIsRunning(true)
  const pauseTest = () => setIsRunning(false)
  const resetTest = () => {
    setIsRunning(false)
    setTimeLeft(3600)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timed Test</CardTitle>
        <CardDescription>Complete the test within the given time.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={(3600 - timeLeft) / 36} className="w-full" />
        <div className="text-4xl font-bold text-center">{formatTime(timeLeft)}</div>
        <div className="flex justify-center space-x-2">
          <Button onClick={startTest} disabled={isRunning}>
            Start
          </Button>
          <Button onClick={pauseTest} disabled={!isRunning}>
            Pause
          </Button>
          <Button onClick={resetTest} variant="outline">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

