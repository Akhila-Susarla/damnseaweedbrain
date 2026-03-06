interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-midnight">
      <main className="mx-auto max-w-[1440px] px-4 tablet:px-8 desktop:px-16">
        {children}
      </main>
    </div>
  );
}
