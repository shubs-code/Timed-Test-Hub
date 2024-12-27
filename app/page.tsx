import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to Timed Test Hub
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Streamline your timed assessments with our PDF-based testing platform.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/test">Take Test</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>Upload your test materials in PDF format.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/test">Upload PDF</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Take Test</CardTitle>
                <CardDescription>Start a timed test session.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" asChild>
                  <Link href="/test">Start Test</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>View Analytics</CardTitle>
                <CardDescription>Review your performance metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                <Link href="/test">View Analytics
                </Link></Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

