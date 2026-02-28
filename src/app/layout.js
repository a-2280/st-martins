import Header from "@/components/header";
import "../styles/site.scss";

export const metadata = {
  title: "St. Martins",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
