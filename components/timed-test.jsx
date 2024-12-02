'use client'

import * as React from 'react'
import { Box, Button, Typography, LinearProgress, Paper } from '@mui/material'

export default function TimedTest() {
  const [timeLeft, setTimeLeft] = React.useState(3600) // 1 hour in seconds
  const [isRunning, setIsRunning] = React.useState(false)

  React.useEffect(() => {
    let timer
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant="h4">Timed Test</Typography>
      <Box sx={{ width: '100%', mb: 2 }}>
        <LinearProgress variant="determinate" value={(3600 - timeLeft) / 36} />
      </Box>
      <Typography variant="h3">{formatTime(timeLeft)}</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={startTest} disabled={isRunning}>
          Start
        </Button>
        <Button variant="contained" color="secondary" onClick={pauseTest} disabled={!isRunning}>
          Pause
        </Button>
        <Button variant="outlined" onClick={resetTest}>
          Reset
        </Button>
      </Box>
    </Paper>
  )
}

