import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestOptions() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Test Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div>
            <Label htmlFor="question-number">Go to Question</Label>
            <div className="flex space-x-2">
              <Input id="question-number" type="number" min={1} />
              <Button>Go</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">Mark for Review</Button>
          <Button variant="outline" className="w-full">Show Summary</Button>
          <Button variant="outline" className="w-full">Calculator</Button>
          <Button variant="outline" className="w-full">Notes</Button>
        </div>
      </CardContent>
    </Card>
  )
}

