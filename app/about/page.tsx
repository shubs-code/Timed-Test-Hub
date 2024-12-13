import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, FileText, BarChart3, Lock } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Timed Test Hub</h1>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Timed Test Hub is a modern platform designed to streamline the process of conducting timed assessments using PDF materials. Our goal is to enhance the testing experience for both test-takers and administrators.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              PDF Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Easily upload and manage PDF documents for your tests. Our platform supports a wide range of test materials, ensuring flexibility in assessment creation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2" />
              Timed Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Conduct timed tests with precision. Our system provides accurate timing and automatic submission, allowing test-takers to focus on their performance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Gain valuable insights with our comprehensive analytics. Track progress, identify areas for improvement, and make data-driven decisions to enhance learning outcomes.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="mr-2" />
              Secure and Private
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We prioritize the security and privacy of your data. With Google OAuth integration, we ensure a safe and seamless authentication process for all users.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">Why Choose Timed Test Hub?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
          <li>Seamless integration with your existing PDF test materials</li>
          <li>User-friendly interface for both test-takers and administrators</li>
          <li>Detailed performance analytics to track progress and identify areas for improvement</li>
          <li>Secure and private testing environment</li>
          <li>Flexible and adaptable for various testing scenarios</li>
        </ul>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Join Timed Test Hub today and revolutionize your testing process.
        </p>
        <Button asChild size="lg">
          <Link href="/test">Take a Test Now</Link>
        </Button>
      </div>
    </div>
  )
}

