import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.CONTACT_TO || '';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const lastName = formData.get('lastName') as string;
    const firstName = formData.get('firstName') as string;
    const age = formData.get('age') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    let status = formData.get('status') as string;
    const otherStatus = formData.get('otherStatus') as string;
    const fieldOfStudy = formData.get('fieldOfStudy') as string;
    let skills = JSON.parse(formData.get('skills') as string || '[]');
    const otherSkill = formData.get('otherSkill') as string;
    const message = formData.get('message') as string;
    const cv = formData.get('cv') as File | null;
    const availability = formData.get('availability') as string;

    if (!lastName || !firstName || !age || !email || !phone || !status || !message || !cv || !availability) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (status === 'other' && otherStatus) {
        status = `Other: ${otherStatus}`;
    }

    if (skills.includes('other') && otherSkill) {
        skills = skills.filter((s: string) => s !== 'other');
        skills.push(`Other: ${otherSkill}`);
    }


    const attachments = [];
    if (cv) {
        const buffer = Buffer.from(await cv.arrayBuffer());
        attachments.push({
            filename: cv.name,
            content: buffer,
        });
    }

    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Wallah We Can <no-reply@wallahwecan.org>',
      to: toEmail,
      reply_to: email,
      subject: `[Join Us Application] - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1C345E;">New "Join Us" Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Full Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Age:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${age}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Status:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${status}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Field of Study/Specialty:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fieldOfStudy || 'N/A'}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Skills:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${skills.join(', ') || 'N/A'}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Availability:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${availability}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #1C345E;">Message:</h3>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">This email was sent from the Wallah We Can 'Join Us' page on ${new Date().toLocaleString()}</p>
        </div>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling 'Join Us' form submission:", error);
    return NextResponse.json({ success: false, error: "Failed to process application" }, { status: 500 });
  }
}
