import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://war-cost-visualizer.vercel.app"
  ),
  title: "What If War Money Was Spent On Life?",
  description:
    "Interactive visualization comparing global military budgets to schools, hospitals & development they could fund. Based on SIPRI 2024 data.",
  openGraph: {
    title: "What If War Money Was Spent On Life?",
    description:
      "Interactive visualization comparing global military budgets to schools, hospitals & development they could fund. Based on SIPRI 2024 data.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "What If War Money Was Spent On Life?",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "What If War Money Was Spent On Life?",
    description:
      "Interactive visualization comparing global military budgets to schools, hospitals & development they could fund. Based on SIPRI 2024 data.",
    creator: "@itsabader",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
