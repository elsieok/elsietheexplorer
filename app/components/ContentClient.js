'use client'; // makes it a client component

import { MDXRemote } from "next-mdx-remote";
import { components } from "@/mdx-components";

export default function ContentClient({ source }) {
  return (
    <div className="bg-[#E2B9B8] rounded-xl p-6 shadow-md border prose prose-sm max-w-none text-gray-800">
      
      <MDXRemote {...source} components={components}/>
    </div>
  );
}