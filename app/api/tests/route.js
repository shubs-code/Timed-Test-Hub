import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { name, authorEmail, description, test_data, options, timeTaken } = await request.json();
  
    try {
      const author = await db.user.findUnique({
        where: {
          email: authorEmail,
        },
      });

      const test = await db.test.create({
        data: {
          name:name??"",
          description:description??"", 
          authorId: author?.id ?? undefined,
          skipped_questions: 0,
          total_questions: options.length,
          correct_answers: 0, 
          
          test_data, 
          options, 
          timeTaken,
        },
      })

      console.log(test)
  
      return NextResponse.json(test, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
    }
  }