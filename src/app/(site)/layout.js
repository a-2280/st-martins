import Header from "@/components/header";
import LenisProvider from "@/components/LenisProvider";
import "../../styles/site.scss";

export default function SiteLayout({ children }) {
  return (
    <LenisProvider>
      <Header />
      {children}
    </LenisProvider>
  );
}
