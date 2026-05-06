# SpearCrest Digital — Production Website

Next.js 14 + TypeScript + Resend (for the contact form), deployed on Vercel.

---

## 🚀 Deploy in 5 steps (no coding required)

### 1. Get a free Resend account (for the contact form)

1. Go to **https://resend.com** → Sign up (free — 100 emails/day).
2. Click **API Keys** → **Create API Key** → copy the key (starts with `re_…`).
3. Click **Domains** → **Add Domain** → enter `spearcrestdigital.com` → follow the DNS steps in your domain registrar. *(Optional for launch — you can use the default `onboarding@resend.dev` from-address until DNS is verified.)*

### 2. Push this folder to GitHub

In VS Code:

```bash
cd spearcrest-nextjs
git init
git add .
git commit -m "Initial site"
gh repo create spearcrest-website --public --source=. --push
```

(Or use the GitHub Desktop app if you prefer clicking.)

### 3. Deploy on Vercel

1. Go to **https://vercel.com/new** → **Import** your `spearcrest-website` repo.
2. Framework preset auto-detects as **Next.js** — leave defaults.
3. Open **Environment Variables** and add:
   - `RESEND_API_KEY` = `re_…` (your key from step 1)
   - `CONTACT_TO_EMAIL` = `spearcrestdigital@gmail.com`
   - `CONTACT_FROM_EMAIL` = `onboarding@resend.dev` *(or `hello@spearcrestdigital.com` once your domain is verified in Resend)*
4. Click **Deploy**. ~90 seconds later you have a live URL like `spearcrest-website.vercel.app`.

### 4. Connect your domain

1. In Vercel: **Project** → **Settings** → **Domains** → add `spearcrestdigital.com` and `www.spearcrestdigital.com`.
2. Vercel shows you DNS records to add in your registrar. Add them.
3. SSL/HTTPS auto-provisions in ~5 minutes.

### 5. Done. 🎉

Push any changes to `main` in GitHub and Vercel auto-redeploys in ~30 seconds.

---

## 🛠 Local development (optional)

```bash
cd spearcrest-nextjs
npm install
cp .env.example .env.local   # fill in your real Resend key
npm run dev
```

Open http://localhost:3000

---

## 📁 What's where

```
spearcrest-nextjs/
├── app/
│   ├── layout.tsx            ← fonts, metadata, <html> wrapper
│   ├── page.tsx              ← home page (renders all sections)
│   ├── globals.css           ← all styles
│   ├── actions.ts            ← contact form server action (sends email via Resend)
│   ├── sitemap.ts            ← /sitemap.xml
│   ├── robots.ts             ← /robots.txt
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx          ← astronauts, planet, headline, CTAs
│       ├── Stats.tsx         ← animated counters
│       ├── Services.tsx      ← 6 service cards w/ pricing
│       ├── Industries.tsx    ← 6-vertical interactive tabs
│       ├── Process.tsx       ← 4-step on dark
│       ├── Team.tsx          ← 6 team members w/ astronaut helmet avatars
│       ├── Audit.tsx         ← gradient CTA card
│       ├── Contact.tsx       ← form (wired to Resend)
│       ├── Footer.tsx
│       ├── HelmetAvatar.tsx  ← reusable astronaut helmet SVG (6 color variants)
│       ├── SpaceArt.tsx      ← Astronaut + Satellite SVGs for hero
│       └── icons.tsx         ← all UI icons
└── public/
    └── spearcrest-logo.png
```

---

## ✏️ Common edits

**Change a phone number / email / Calendly link** → `app/components/Contact.tsx` and `app/components/Footer.tsx`

**Edit a team member's bio** → `app/components/Team.tsx`

**Edit service prices/descriptions** → `app/components/Services.tsx`

**Edit industry case-study numbers** → `app/components/Industries.tsx`

**Replace the "Trusted by" wordmarks with real logos** → `app/components/Hero.tsx` (find `.trusted-row`)

**Change SEO title/description** → `app/layout.tsx`

After saving, push to GitHub → Vercel auto-redeploys.

---

## 📧 Contact form notes

- Submissions go to whatever email you set as `CONTACT_TO_EMAIL` in Vercel.
- Until you verify `spearcrestdigital.com` in Resend, the "from" address is `onboarding@resend.dev` (Resend's shared dev sender). It still works, but emails might land in spam. Verify your domain in Resend → change `CONTACT_FROM_EMAIL` to `hello@spearcrestdigital.com` to fix that.
- Replies in your inbox automatically go back to the prospect's email (we set `Reply-To`).

---

## Need help?

Re-open the chat. Tell me what you want to change and I&rsquo;ll edit the files for you, then you push to GitHub.
