import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

interface SitePageLayoutProps {
  children: React.ReactNode;
}

export function SitePageLayout({ children }: SitePageLayoutProps) {
  return (
    <>
      <Navbar />
      <main id="main" className="page-content pt-[var(--nav-height)]">
        {children}
      </main>
      <Footer />
    </>
  );
}
