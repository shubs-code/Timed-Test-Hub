'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PDFViewer from '@/components/pdf-viewer'
import TestSetupModal from '@/components/test-setup-modal'

interface TestSetup {
  name: string;
  description: string;
  questionCount: number;
  optionsPerQuestion: number;
}

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testSetup, setTestSetup] = useState<TestSetup | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleStartTest = () => {
    if (file) {
      setIsModalOpen(true)
    }
  }

  const handleTestSetup = (setup: TestSetup) => {
    setTestSetup(setup)
    setIsModalOpen(false)
  }

  return (
    <div className="flex flex-col space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload PDF and Start Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            <Button onClick={handleStartTest} disabled={!file}>
              Start Test
            </Button>
          </div>
        </CardContent>
      </Card>

      <TestSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTestSetup}
      />

      {file && testSetup && (
        <Card>
          <CardHeader>
            <CardTitle>{testSetup.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{testSetup.description}</p>
            <p className="mb-4">Number of questions: {testSetup.questionCount}</p>
            <p className="mb-4">Options per question: {testSetup.optionsPerQuestion}</p>
            <PDFViewer file={file} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

