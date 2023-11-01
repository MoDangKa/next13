import LocaleSwitcher from "@/components/locale-switcher";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="container top-2 left-1/2 -translate-x-1/2 absolute pointer-events-none flex justify-end">
        <LocaleSwitcher />
      </nav>
      <main className="flex min-h-screen max-w-md items-center justify-center m-auto">
        {children}
      </main>
    </>
  );
}
