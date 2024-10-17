import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-secondary">
      <h1 className="text-4xl font-bold mb-6 text-center">Business Model Generator</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Create personalized business models based on your interests, skills, and budget.
      </p>
      <Link href="/generate">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  );
}