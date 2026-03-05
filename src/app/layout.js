import { SanityLive } from "@/sanity/lib/live";

export const metadata = {
  title: "St. Martins",
  description: "",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
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
