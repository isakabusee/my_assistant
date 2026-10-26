// app/page.tsx
import PortfolioChat from '@/components/ui/PortfolioChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-24">
      <div className="w-full max-w-2xl mb-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Welcome to My Portfolio
        </h1>
        <p className="text-muted-foreground">
          Have questions about my work experience? Ask my AI agent below.
        </p>
      </div>
      <PortfolioChat />
    </main>
  );
}
