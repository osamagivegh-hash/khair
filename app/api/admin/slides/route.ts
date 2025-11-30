import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Get all slides
export async function GET() {
  try {
    const slides = await prisma.slide.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(slides);
  } catch (error) {
    console.error('Error fetching slides:', error);
    // Return empty array instead of error object so frontend doesn't break
    return NextResponse.json([], { status: 200 });
  }
}

// Create a new slide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, subtitle, imageUrl, order } = body;

    if (!title || !subtitle || !imageUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const slide = await prisma.slide.create({
      data: {
        title,
        subtitle,
        imageUrl,
        order: order ? parseInt(String(order)) : 0,
      },
    });

    return NextResponse.json(slide);
  } catch (error: any) {
    console.error('Error creating slide:', error);
    return NextResponse.json(
      {
        error: 'Failed to create slide',
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}

