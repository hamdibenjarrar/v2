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
    const university = formData.get('university') as string;
    const fieldOfStudy = formData.get('fieldOfStudy') as string;
    let studyYear = formData.get('studyYear') as string;
    const otherStudyYear = formData.get('otherStudyYear') as string;
    let internshipType = formData.get('internshipType') as string;
    const otherInternshipType = formData.get('otherInternshipType') as string;
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;
    const duration = formData.get('duration') as string;
    const message = formData.get('message') as string;
    const cv = formData.get('cv') as File | null;

    if (!lastName || !firstName || !age || !email || !phone || !university || !fieldOfStudy || !studyYear || !internshipType || !startDate || !endDate || !duration || !message || !cv) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (studyYear === 'other' && otherStudyYear) {
        studyYear = `Other: ${otherStudyYear}`;
    }
    if (internshipType === 'other' && otherInternshipType) {
        internshipType = `Other: ${otherInternshipType}`;
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
      subject: `[Internship Application] - ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #1C345E;">New Internship Application</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd; width: 30%;"><strong>Full Name:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Age:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${age}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Phone:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>University:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${university}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Field of Study:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${fieldOfStudy}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Study Year:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${studyYear}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Internship Type:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${internshipType}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Start Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(startDate).toLocaleDateString()}</td></tr>
            <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>End Date:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(endDate).toLocaleDateString()}</td></tr>
            <tr style="background-color: #f4f4f4;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Duration:</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${duration.replace('_', ' ')}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="color: #1C345E;">Motivation:</h3>
          <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #777;">This email was sent from the Wallah We Can 'Internship' page on ${new Date().toLocaleString()}</p>
        </div>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling 'Internship' form submission:", error);
    if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "An unknown error occurred" }, { status: 500 });
  }
}
