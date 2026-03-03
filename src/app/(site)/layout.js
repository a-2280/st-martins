import LenisProvider from "@/components/LenisProvider";
import "../../styles/site.scss";

export default function SiteLayout({ children }) {
  return (
    <LenisProvider>
      {children}
    </LenisProvider>
  );
}
