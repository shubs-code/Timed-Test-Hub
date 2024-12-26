'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TestSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (setup: TestSetup) => void;
}

interface TestSetup {
  name: string;
  description: string;
  questionCount: number;
}

export default function TestSetupModal({ isOpen, onClose, onSubmit }: TestSetupModalProps) {
  const [testSetup, setTestSetup] = useState<TestSetup>({
    name: '',
    description: '',
    questionCount: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTestSetup(prev => ({
      ...prev,
      [name]: name === 'questionCount' || name === 'optionsPerQuestion' ? parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(testSetup)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Setup</DialogTitle>
          <DialogDescription>
            Enter the details for your test. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Test Name
              </Label>
              <Input
                id="name"
                name="name"
                value={testSetup.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={testSetup.description}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="questionCount" className="text-right">
                Questions
              </Label>
              <Input
                id="questionCount"
                name="questionCount"
                type="number"
                value={testSetup.questionCount}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

