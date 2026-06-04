'use client';

import { MDXRemote } from "next-mdx-remote";
import { components } from "@/mdx-components";

export default function ContentClient({ source }) {
  return (
    <div
      className="prose"
      style={{
        maxWidth: "none",
        fontFamily: "var(--font-sans)",
      }}
    >
      <MDXRemote {...source} components={components} />
    </div>
  );
}