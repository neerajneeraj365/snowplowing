"use server";

import { EmailTemplate } from "@/app/book/payment-success/email-template";
import { Resend } from "resend";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingData {
  payment_intent?: string;
  amount?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  date?: string;
  notes?: string;
  serviceLabel?: string;
}

export async function sendBookingConfirmationEmail(data: BookingData) {
  try {
    if (!data.email) {
      throw new Error("Email is required");
    }

    if (!resend) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const emailReact = EmailTemplate({
      payment_intent: data.payment_intent,
      amount: data.amount,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      service: data.serviceLabel || data.service,
      date: data.date,
      notes: data.notes,
    });

    // Render React component to HTML string
    const html = await render(emailReact);

    // Get admin email from environment variable or use default
    const adminEmail = process.env.ADMIN_EMAIL || "neerajbhardwaj5609@gmail.com";

    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "FrostGreenPro <onboarding@resend.dev>",
      to: [data.email],
      subject: "FrostGreenPro - Booking Confirmation",
      html: html,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

