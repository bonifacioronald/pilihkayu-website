import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [65, 75] },
  /**
   * Short links for print (e.g. the catalogue QR code). They forward to the real page with tracking tags,
   * so the visible link stays clean. Temporary (307) so they can be changed later.
   * Never remove a short link once it is printed or shared.
   */
  async redirects() {
    return [
      { source: "/about", destination: "/factory", permanent: true },
      {
        source: "/qr",
        destination: "/welcome?utm_source=qr&utm_medium=print&utm_campaign=catalogue",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
