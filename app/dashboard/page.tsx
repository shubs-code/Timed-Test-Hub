"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, FileText } from 'lucide-react'
import { useEffect, useState } from "react";

interface Test {
    id: string;
    authorId: string;
    name: string;
    description: string;
    createdAt: string;
    verified: boolean;
    skipped_questions: number;
    total_questions: number;
    correct_answers: number;
    test_data: Array<{ time: number; option: string; isCorrect: boolean }>;
    options: string[];
    timeTaken: number;
  }
  


function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

export default function DashboardPage() {
    
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await fetch('/api/tests',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${""}`
                },
                credentials:"include"
            }
        );
        if (!response.ok) throw new Error('Failed to fetch tests');
        
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Test Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tests.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">{item.total_questions} Questions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-sm font-medium">{formatTime(item.timeTaken)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

