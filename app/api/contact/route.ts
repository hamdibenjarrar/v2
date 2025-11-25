
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_TO || '';

export async function POST(req: Request) {
  try {
    const { name, email, subject, reason, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Wallah We Can <no-reply@wallahwecan.org>',
      to: toEmail,
      reply_to: email,
      subject: `[WWC Contact Form] ${subject || 'Nouveau message'}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1C345E;">Nouveau message depuis le formulaire de contact Wallah We Can</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Sujet:</strong> ${subject || 'Non spécifié'}</p>
          <p><strong>Raison du contact:</strong> ${reason || 'Non spécifiée'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #1C345E;">Message:</h3>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">Cet email a été envoyé le ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
