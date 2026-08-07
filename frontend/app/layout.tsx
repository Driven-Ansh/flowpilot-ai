import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'FlowPilot AI – AI Workflow Automation Advisor',
  description:
    'Identify repetitive business processes, estimate ROI from AI automation, and get an actionable implementation roadmap for your startup.',
  keywords: ['AI automation', 'workflow optimization', 'ROI calculator', 'startup automation', 'process automation'],
  openGraph: {
    title: 'FlowPilot AI',
    description: 'Your AI Automation Advisor for Startups',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
