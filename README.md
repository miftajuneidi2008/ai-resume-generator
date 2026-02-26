
# 🚀 AI Resume Builder & Career Optimizer

A modern, high-performance Resume Builder built with **Next.js**, powered by **Groq AI** for intelligent content generation, and integrated with **Stripe** for premium subscriptions.

## ✨ Features

*   **📄 Professional Resume Builder:** Create, edit, and export ATS-friendly resumes in real-time.
*   **🤖 AI-Powered Content:**
    *   **Summary Generation:** Automatically craft compelling professional summaries.
    *   **Education Optimization:** Intelligent suggestions for your academic history.
    *   **Resume Recommendations:** Get AI-driven feedback on your current resume to improve its impact.
*   **📤 PDF Analysis:** Upload your existing PDF resume, and let the AI extract and optimize your data.
*   **💳 Subscription Management:** Multi-tier subscription system (Pro & Pro Plus) integrated with **Stripe**.
*   **🔐 Secure Authentication:** Robust auth system using **Better Auth** with Google OAuth support.
*   **⚡ Modern Tech Stack:** Next.js 15 (App Router), Tailwind CSS, Groq SDK, and more.

---

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS / Shadcn UI
- **Database:** (Configurable via `DATABASE_URL`)
- **Authentication:** Better Auth (Google OAuth)
- **AI Engine:** Groq API (LLaMA 3 / Mixtral)
- **Payments:** Stripe
- **Package Manager:** pnpm / npm

---

## 🚀 Getting Started

Follow these steps to get the project running locally on your machine.

### 1. Clone the Project
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies
```bash
pnpm install
# or
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and copy the following variables. You will need to fill in the values from your respective provider consoles.

```env
# App Configuration
NEXT_PUBLIC_NEXTURL=http://localhost:3000

# Database
DATABASE_URL="your_database_connection_string"

# Better Auth Configuration
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL=http://localhost:3000
SECRET_KEY="your_random_secret_key"

# Google OAuth (Google Cloud Console)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# AI Configuration (Groq & Google)
GROQ_API_KEY="your_groq_api_key"
GOOGLE_API_KEY="your_google_api_key"

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY="price_..."
NEXT_PUBLIC_PRICE_ID_PRO_PLUS_MONTHLY="price_..."

# Development Settings
NEXT_TURBOPACK_EXPERIMENTAL_USE_SYSTEM_TLS_CERTS=true
```

---

## 🔑 Setup Guides

### Google Credentials
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project and navigate to **APIs & Services > Credentials**.
3. Create an **OAuth 2.0 Client ID**.
4. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`

### Groq AI API
1. Visit the [Groq Console](https://console.groq.com/).
2. Generate an API Key to enable the AI resume generation features.

### Stripe Integration
1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Create two **Products** (e.g., "Pro Plan" and "Pro Plus Plan").
3. Create a **Recurring Price** (Monthly) for each.
4. Copy the **Price IDs** (starting with `price_...`) and paste them into your `.env.local`.

---

## 🏃 Running the Project

Once your environment variables are set, start the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure
- `/app` - Next.js App Router (Pages and API routes).
- `/components` - Reusable UI components.
- `/lib` - Logic for Stripe, AI configurations, and Database clients.
- `/public` - Static assets and icons.

---
*Created with ❤️ by [Mifta Juneidi]*