'use client'

import { useParams } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState, useEffect } from 'react'

interface TestData {
  id: string
  name: string
  description: string
  createdAt: string
  verified: boolean
  skipped_questions: number
  total_questions: number
  correct_answers: number
  test_data: Array<{
    time: number
    option: string
    isCorrect: boolean
  }>
  options: string[]
  timeTaken: number
}

async function fetchTestData(testId: string): Promise<TestData> {
  const response = await fetch(`/api/test/${testId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch test data')
  }
  return response.json()
}

export default function AnalyticsPage() {
  const params = useParams()
  const testId = params.testId as string

  const [data, setData] = useState<TestData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await fetchTestData(testId)
        setData(fetchedData)
      } catch (err:any) {
        setError(err?.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [testId])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load test data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return null
  }

  const chartData = data.test_data.map((item, index) => ({
    question: `Q${index + 1}`,
    time: item.time,
  }))

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Test Analytics: {data.name}</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard title="Total Questions" value={data.total_questions} />
        <StatCard title="Correct Answers" value={data.correct_answers} />
        <StatCard title="Skipped Questions" value={data.skipped_questions} />
        <StatCard title="Time Taken" value={`${data.timeTaken} seconds`} />
        <StatCard title="Verified" value={data.verified ? 'Yes' : 'No'} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Taken Per Question</CardTitle>
          <CardDescription>Bar chart showing time spent on each question</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              time: {
                label: "Time (seconds)",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="question" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="time" fill="var(--color-time)" name="Time (seconds)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-12 w-2/3 mb-6" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

