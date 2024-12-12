import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Button } from "@/components/ui/button"
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

// Configure pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PDFViewerProps {
  file: File
}

export default function PDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages)
  }

  return (
    <div className="flex flex-col items-center">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page pageNumber={pageNumber} className="max-w-full" />
      </Document>
      <div className="flex items-center space-x-2 mt-4">
        <Button
          onClick={() => setPageNumber(page => Math.max(page - 1, 1))}
          disabled={pageNumber <= 1}
        >
          Previous
        </Button>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <Button
          onClick={() => setPageNumber(page => Math.min(page + 1, numPages || 1))}
          disabled={pageNumber >= (numPages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

