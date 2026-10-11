import { Header } from "@/components/global/home/header/header";
import { Footer } from "@/components/global/home/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
