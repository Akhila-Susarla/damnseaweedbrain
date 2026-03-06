import FallbackProvider from '@/components/three/FallbackProvider';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-midnight">
      <main className="mx-auto max-w-[1440px] px-4 tablet:pl-20 tablet:pr-8 desktop:pl-24 desktop:pr-16">
        <FallbackProvider>
          {children}
        </FallbackProvider>
      </main>
    </div>
  );
}
