import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Simple in-memory IP rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(
    (time) => now - time < RATE_LIMIT_WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

// HTML escape helper to prevent HTML Injection / XSS in email clients
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip CR/LF to prevent email header injection
function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // 2. Honeypot check (silently drop bot submissions)
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // 3. Presence validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // 4. Type & length validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      (subject && typeof subject !== "string")
    ) {
      return NextResponse.json(
        { error: "Invalid field format." },
        { status: 400 }
      );
    }

    if (name.length > 100 || email.length > 200 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input exceeds allowed character limits." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 5. Sanitization
    const safeName = sanitizeHeader(name);
    const safeEmail = sanitizeHeader(email);
    const rawSubject =
      subject?.trim() || `New Message from ${safeName} via Portfolio`;
    const safeSubject = sanitizeHeader(rawSubject);

    const escapedName = escapeHtml(safeName);
    const escapedEmail = escapeHtml(safeEmail);
    const escapedSubject = escapeHtml(safeSubject);
    const escapedMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    // 6. Transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipientEmail = process.env.CONTACT_EMAIL || "ptaguss2@gmail.com";
    const senderEmail = process.env.SMTP_USER || "portfolio@localhost";

    await transporter.sendMail({
      from: `"${safeName} via Portfolio" <${senderEmail}>`,
      replyTo: `"${safeName}" <${safeEmail}>`,
      to: recipientEmail,
      subject: `[Contact Form] ${safeSubject}`,
      html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: #ffffff; padding: 40px 24px 24px 24px; text-align: center; border-bottom: 1px solid #e2e8f0;">
          <h1 style="color: #1e293b; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">
            New Contact Message
          </h1>
          <p style="color: #64748b; margin: 8px 0 0 0; font-size: 14px;">
            From your portfolio website
          </p>
        </div>

        <!-- Content -->
        <div style="padding: 32px 24px;">
          
          <!-- From -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">From</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
              <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">${escapedName}</div>
              <div style="font-size: 14px; color: #0ea5e9;">
                <a href="mailto:${escapedEmail}" style="color: #0ea5e9; text-decoration: none;">${escapedEmail}</a>
              </div>
            </div>
          </div>

          <!-- Subject -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Subject</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
              <div style="font-size: 16px; font-weight: 500; color: #1e293b;">${escapedSubject}</div>
            </div>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 32px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; line-height: 1.6; color: #374151; font-size: 15px;">
              ${escapedMessage}
            </div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="mailto:${escapedEmail}?subject=Re: ${encodeURIComponent(safeSubject)}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.4); transition: all 0.2s ease;">
              Reply to ${escapedName}
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: #ffffff; padding: 20px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
          <div style="color: #64748b; font-size: 12px; margin-bottom: 4px;">
            ${new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div style="color: #94a3b8; font-size: 11px;">
            Portfolio Contact Form
          </div>
        </div>

      </div>
    </body>
    </html>
  `,
      text: `
New Contact Message

From: ${safeName} (${safeEmail})
Subject: ${safeSubject}

Message:
${message}

---
Sent on ${new Date().toLocaleString()}
Portfolio Contact Form
  `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 500 }
    );
  }
}

