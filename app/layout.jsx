import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://war-costs-visualizer.vercel.app"),
  title: "What If War Money Was Spent On Life? | Global Military Spending vs Development",
  description:
    "Interactive visualization: $1.56 trillion in military spending could build 88,600 schools and 17,700 hospitals yearly. Explore the data from SIPRI 2024.",
  openGraph: {
    title: "What If War Money Was Spent On Life? | Military Spending vs Development",
    description:
      "Interactive visualization: $1.56 trillion in military spending could build 88,600 schools yearly. Based on SIPRI 2024 data.",
    url: "https://war-costs-visualizer.vercel.app",
    siteName: "War Costs Visualizer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "What If War Money Was Spent On Life?",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What If War Money Was Spent On Life?",
    description: "$1.56T in military spending could build 88,600 schools yearly. See the data.",
    creator: "@itsabader",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
