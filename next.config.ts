import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Short links for print and social bios. They forward to the real page with tracking tags,
   * so the visible link stays clean. Temporary (307) so they can be changed later.
   * Never remove a short link once it is printed or shared.
   */
  async redirects() {
    return [
      {
        source: "/ig",
        destination: "/welcome?utm_source=instagram&utm_medium=social&utm_campaign=bio",
        permanent: false,
      },
      {
        source: "/qr",
        destination: "/welcome?utm_source=qr&utm_medium=print&utm_campaign=catalogue",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
