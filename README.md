# Barebat CMS

A headless CMS platform for creating and managing bar and bat mitzvah event websites. Built with Next.js, Supabase, Builder.io, and Stripe.

## Features

- Create personalized event websites with custom subdomains
- Manage RSVPs and guest lists
- Integrated gift registry system
- Real-time updates and notifications
- Customizable templates using Builder.io
- Secure payment processing with Stripe

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database & Auth:** Supabase
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Visual Editor:** Builder.io
- **Payments:** Stripe
- **Forms:** React Hook Form + Zod
- **State Management:** React Context + Hooks

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/barebat-cms.git
   cd barebat-cms
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your:
   - Supabase project credentials
   - Builder.io API key
   - Stripe API keys

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/        # Authentication routes
│   ├── (dashboard)/   # Dashboard routes
│   └── (marketing)/   # Public marketing routes
├── components/        # React components
│   ├── ui/           # UI components
│   ├── forms/        # Form components
│   ├── layouts/      # Layout components
│   └── shared/       # Shared components
├── lib/              # Third-party library configurations
│   ├── supabase/     # Supabase client & utilities
│   ├── stripe/       # Stripe configurations
│   └── builder/      # Builder.io configurations
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
└── config/           # Application configuration
```

## Contributing

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Commit your changes:
   ```bash
   git commit -m "feat: add your feature"
   ```

3. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
