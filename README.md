# Snipmatic.AI

Transform long-form videos into viral short-form clips with AI.

## Project Structure

```
src/
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/         # Main dashboard
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── api/               # API routes
│   │   ├── auth/
│   │   ├── video/
│   │   └── clips/
│   └── layout.tsx
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── video/            # Video-related components
│   └── shared/           # Shared components
├── lib/                  # Utility functions and configurations
│   ├── supabase/        # Supabase client and utilities
│   ├── ai/              # AI processing utilities
│   └── video/           # Video processing utilities
├── types/               # TypeScript type definitions
└── styles/             # Global styles
```

## Tech Stack

- **Frontend:** Next.js 13+ (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI/ML:** OpenAI Whisper, GPT-4 Vision
- **Video Processing:** ffmpeg.wasm
- **Storage:** Supabase Storage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://oqkhxwpkrxecidrfmoyb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xa2h4d3BrcnhlY2lkcmZtb3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5ODkyMzksImV4cCI6MjA2MjU2NTIzOX0.Hek_meFa2_d0ftx3mT2dUihHu4Mi3vYutTB6YdG_i7w
OPENAI_API_KEY=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
```

## Features

- [ ] Video upload and processing
- [ ] AI-powered clip detection
- [ ] Clip preview and selection
- [ ] Export to short-form format
- [ ] User authentication
- [ ] Project management
- [ ] Auto-captions (MVP+)
- [ ] Custom branding (MVP+) 