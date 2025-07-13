'use client'; // makes it a client component

import { MDXRemote } from "next-mdx-remote";
import { components } from "@/mdx-components";

export default function ContentClient({ source }) {
  return (
    <div className="prose prose-sm max-w-none text-gray-800">
      <MDXRemote {...source} components={components}/>
    </div>
  );
}