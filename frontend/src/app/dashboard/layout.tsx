export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex justify-between">
        <div className="md:w-60">Dashboard Sidebar</div>
        <div className="flex-1">{children}</div>
    </div>
  );
}
