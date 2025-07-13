import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), './content/blog');
const projectsDirectory = path.join(process.cwd(), './content/projects');

export function getAllPosts() {
    // This function reads all markdown files from the 'content/blog' directory,
    // extracts metadata using gray-matter, and returns an array of post objects
    // sorted by date in descending order.
    // Each post object contains the metadata and a slug derived from the file name.
    // The slug is the file name without the .md or .mdx extension.

    const fileNames = fs.readdirSync(postsDirectory);

    // Filter for only .mdx files
    const markdownFiles = fileNames.filter(name => name.endsWith('.mdx'))

    if (markdownFiles.length === 0) {
        console.log('No markdown files found in:', postsDirectory)
        return []
    }

    const allPostsData = markdownFiles.map((fileName) => {
        // Remove .md extension from the file name to create a slug
        const slug = fileName.replace(/\.mdx?$/, '');

        // Read markdown file content
        const filePath = path.join(postsDirectory, fileName);
        try{
            const fileContents = fs.readFileSync(filePath, 'utf8');

            // Use gray-matter to parse the metadata section of the markdown file
            // and return an object containing the metadata and slug
            // The metadata includes fields like title, date, and description.
            const matterResult = matter(fileContents);

            // Check if matter parsing worked
            if (!matterResult || !matterResult.data) {
                console.error(`Failed to parse frontmatter in ${fileName}`)
                return null
            }

            return {
                slug,
                ...matterResult.data, // Spread the metadata into the object
                content: matterResult.content, // Include the content of the post
            };
        } catch (error) {
            console.error(`Error reading file ${fileName}:`, error);
            return null; // Return null if there's an error reading the file
        }
    });

    // Sort the posts by date (newest first)
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1; // b is newer
        } else {
            return -1; // a is newer or they are the same
        }
    }

    );
}

export async function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const mdxSource = await serialize(matterResult.content);
  
    return {
        slug,
        ...matterResult.data,
        content: mdxSource, // Include the serialized content
    }
}

export async function getAllProjects() {
    // This function reads all markdown files from the 'content/blog' directory,
    // extracts metadata using gray-matter, and returns an array of post objects
    // sorted by date in descending order.
    // Each post object contains the metadata and a slug derived from the file name.
    // The slug is the file name without the .md or .mdx extension.

    const fileNames = fs.readdirSync(projectsDirectory);

    // Filter for only .mdx files
    const markdownFiles = fileNames.filter(name => name.endsWith('.mdx'))

    if (markdownFiles.length === 0) {
        console.log('No markdown files found in:', projectsDirectory)
        return []
    }

    const allProjectsData = await Promise.all(markdownFiles.map(async (fileName) => {
        // Remove .md extension from the file name to create a slug
        const slug = fileName.replace(/\.mdx?$/, '');

        // Read markdown file content
        const filePath = path.join(projectsDirectory, fileName);

        try{
            const fileContents = fs.readFileSync(filePath, 'utf8');

            // Use gray-matter to parse the metadata section of the markdown file
            // and return an object containing the metadata and slug
            // The metadata includes fields like title, date, and description.
            const matterResult = matter(fileContents);

            // Check if matter parsing worked
            if (!matterResult || !matterResult.data) {
                console.error(`Failed to parse frontmatter in ${fileName}`)
                return null
            }

            // Serialize the content like you do in getPostBySlug
            const mdxSource = await serialize(matterResult.content);

            return {
                slug,
                ...matterResult.data, // Spread the metadata into the object
                content: mdxSource, // Include the content of the post
            };
        } catch (error) {
            console.error(`Error reading file ${fileName}:`, error);
            return null; // Return null if there's an error reading the file
        }


    }));

    return allProjectsData;
    
}
