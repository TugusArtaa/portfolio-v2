import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Konfigurasi transporter (gunakan env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "ptaguss2@gmail.com",
      subject: `[Contact Form] ${subject}`,
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
              <div style="font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 4px;">${name}</div>
              <div style="font-size: 14px; color: #0ea5e9;">
                <a href="mailto:${email}" style="color: #0ea5e9; text-decoration: none;">${email}</a>
              </div>
            </div>
          </div>

          <!-- Subject -->
          <div style="margin-bottom: 24px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Subject</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
              <div style="font-size: 16px; font-weight: 500; color: #1e293b;">${subject}</div>
            </div>
          </div>

          <!-- Message -->
          <div style="margin-bottom: 32px;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <span style="font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em;">Message</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; line-height: 1.6; color: #374151; font-size: 15px;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-bottom: 24px;">
            <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(14, 165, 233, 0.4); transition: all 0.2s ease;">
              Reply to ${name}
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

From: ${name} (${email})
Subject: ${subject}

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
