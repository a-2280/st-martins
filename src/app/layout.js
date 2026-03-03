import { SanityLive } from "@/sanity/lib/live";

export const metadata = {
  title: "St. Martins",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
