"use client"; // makes it a client compoenent

import { MDXRemote } from "next-mdx-remote";

export default function ContentClient({ source }) {
  return (
    <div className="prose prose-sm max-w-none text-gray-800">
      <MDXRemote {...source} />
    </div>
  );
}