"use server";
import { Resend } from "resend";

type Payload = {
  name: string; email: string; business: string;
  industry: string; message: string; interests: string[];
};

export async function sendContact(data: Payload): Promise<{ ok: boolean; error?: string }> {
  // Server-side validation
  if (!data.name?.trim() || !data.email?.trim() || !data.business?.trim() || !data.message?.trim()) {
    return { ok: false, error: "Missing required fields." };
  }
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return { ok: false, error: "Invalid email." };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "spearcrestdigital@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.warn("[contact form] RESEND_API_KEY not set; would have sent:", data);
    return { ok: false, error: "Email service is not configured. Please email us directly." };
  }

  const resend = new Resend(apiKey);
  const interests = data.interests.length ? data.interests.join(", ") : "—";

  try {
    const result = await resend.emails.send({
      from: `SpearCrest Site <${from}>`,
      to: [to],
      replyTo: data.email,
      subject: `New audit request — ${data.business} (${data.industry})`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Business: ${data.business}`,
        `Industry: ${data.industry}`,
        `Interested in: ${interests}`,
        ``,
        `Message:`,
        data.message,
      ].join("\n"),
      html: `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; color: #0a0a23; max-width: 560px;">
          <h2 style="margin:0 0 16px;">New audit request</h2>
          <p style="margin:0 0 8px;"><strong>${data.name}</strong> &middot; ${data.email}</p>
          <p style="margin:0 0 8px;"><strong>${data.business}</strong> &middot; ${data.industry}</p>
          <p style="margin:0 0 16px;"><em>Interested in:</em> ${interests}</p>
          <hr style="border:none; border-top:1px solid #eee; margin:16px 0;" />
          <p style="white-space:pre-wrap; line-height:1.6;">${data.message.replace(/</g,"&lt;")}</p>
        </div>
      `,
    });
    if ((result as any)?.error) {
      console.error("[contact form] Resend error:", (result as any).error);
      return { ok: false, error: "Email failed to send. Please email us directly." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact form] exception:", err);
    return { ok: false, error: "Something went wrong. Please email us directly." };
  }
}
