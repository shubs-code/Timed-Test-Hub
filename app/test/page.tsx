'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PDFViewer from '@/components/pdf-viewer'
import TestSetupModal from '@/components/test-setup-modal'
import TestOverlay from '@/components/test-overlay'

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
  const [isTestStarted, setIsTestStarted] = useState(false)

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
    setIsTestStarted(true)
  }

  return (
    <div className="relative">
      {!isTestStarted && (
        <Card className="mb-4">
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
      )}

      <TestSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTestSetup}
      />

      {file && (
        <div className="w-full">
          <PDFViewer file={file} />
        </div>
      )}

      {isTestStarted && testSetup && (
        <TestOverlay testSetup={testSetup} />
      )}
    </div>
  )
}

