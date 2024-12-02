import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"

export default function PDFUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    // Simulating upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    setUploading(false)
    setFile(null)
    setProgress(0)
    // Here you would typically send the file to your server
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {file && (
        <p className="text-sm text-gray-500">
          Selected file: {file.name}
        </p>
      )}
      {uploading && (
        <Progress value={progress} className="w-full" />
      )}
      <Button
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </Button>
    </div>
  )
}

