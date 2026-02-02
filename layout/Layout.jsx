import Footer from "./Footer";
import { Header } from "./Header";

export function Layout({ children, hideFooter = false }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
