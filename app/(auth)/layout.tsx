import { PageGradient } from "./_components/PageGradient";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <PageGradient />
      <div className="container flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}
