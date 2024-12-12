'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PDFViewer from '@/components/pdf-viewer'

export default function TestPage() {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0]);
      setFile(event.target.files[0])
    }
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
            <Button disabled={!file}>
              Start Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>PDF Viewer</CardTitle>
          </CardHeader>
          <CardContent>
            <PDFViewer file={file} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

