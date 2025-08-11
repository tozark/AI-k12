import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const body = await req.json();
  const meta = {
    request: body,
    version: process.env.TEMPLATES_VERSION || '2025.08.0',
    notes: 'Stub generation. Replace with real LLM + storage logic.',
  };
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const files = [
    { name: 'Staff_AI_Policy.md', url: baseUrl + '/sample/Staff_AI_Policy.md' },
    { name: 'Student_AI_Use_Agreement.md', url: baseUrl + '/sample/Student_AI_Use_Agreement.md' },
    { name: 'Parent_Letter.md', url: baseUrl + '/sample/Parent_Letter.md' },
    { name: 'Training_Slides_Outline.md', url: baseUrl + '/sample/Training_Slides_Outline.md' },
  ];
  return NextResponse.json({ files, meta });
}