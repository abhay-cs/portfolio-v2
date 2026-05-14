import createMDX from "@next/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Cloudflare Workers Static Assets serves a fully prerendered `out/`.
  output: "export",
  // No image optimizer at runtime when statically exporting.
  images: { unoptimized: true },
  // `/work/crane` -> `out/work/crane/index.html`; matches CF asset routing.
  trailingSlash: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, { strict: false }]],
  },
});

export default withMDX(nextConfig);
