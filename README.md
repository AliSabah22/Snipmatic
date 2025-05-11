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
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
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