import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactMessages } from '@/lib/db/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Insert contact message
    const [newMessage] = await db
      .insert(contactMessages)
      .values({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
      data: newMessage,
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}

// GET all messages (admin only - will be protected)
export async function GET() {
  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(contactMessages.createdAt);

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { error: 'Error fetching messages' },
      { status: 500 }
    );
  }
}
