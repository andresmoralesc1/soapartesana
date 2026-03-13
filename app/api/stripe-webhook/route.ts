import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { db } from '@/lib/db';
import { orders } from '@/lib/db/schema';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-01-27.acacia',
    } as any)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  // Return error if Stripe is not configured
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create order in database
      const metadata = session.metadata;
      const items = metadata?.items ? JSON.parse(metadata.items) : [];

      await db.insert(orders).values({
        stripeCheckoutId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        customerName: metadata?.customerName || '',
        customerEmail: session.customer_email || session.customer_details?.email || '',
        total: (session.amount_total ?? 0).toString(),
        currency: session.currency?.toUpperCase() || 'USD',
        status: 'paid',
        paymentStatus: 'succeeded',
        items: items,
      });

      console.log('Order created:', session.id);
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session expired:', session.id);
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
