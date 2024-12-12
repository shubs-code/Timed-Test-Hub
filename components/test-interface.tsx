import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TestInterfaceProps {
  pdfFile: File | null
}

export default function TestInterface({ pdfFile }: TestInterfaceProps) {
  const [timeLeft, setTimeLeft] = useState(3600) // 1 hour in seconds
  const [isRunning, setIsRunning] = useState(true)

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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test in Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-bold text-center">
            Time Remaining: {formatTime(timeLeft)}
          </div>
          <div className="border rounded p-4 h-96 overflow-auto">
            {/* This is where you would render the PDF content */}
            <p>PDF Content for {pdfFile?.name} would be displayed here.</p>
            <p>You would need to use a PDF rendering library like react-pdf to display the actual PDF content.</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? 'Pause' : 'Resume'}
            </Button>
            <Button variant="destructive">End Test</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

