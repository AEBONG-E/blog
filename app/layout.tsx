import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_URL, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: siteConfig.motto, template: `%s | ${siteConfig.motto}` },
  description: siteConfig.description,
  alternates: { canonical: "./" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.lang}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <SiteHeader />
        <main className="container page">{children}</main>
        <footer className="site-footer">
          <div className="container">{siteConfig.motto}</div>
        </footer>
      </body>
    </html>
  );
}
