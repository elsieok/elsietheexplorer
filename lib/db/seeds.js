import connectMongoDB from "./connectMongoDB.js";
import Post from "../models/post.model.js";
import fs from 'fs';
import path from "path";
import matter from "gray-matter";


const postsDir = path.join(process.cwd(), 'content/blog')

async function seedPosts() {
    await connectMongoDB()

    try {
        const fileNames = fs.readdirSync(postsDir)

        for (const fileName of fileNames) {
            if (/\.mdx$/.test(fileName)) {
                const slug = fileName.replace(/\.mdx$/, '')
                const fullPath = path.join(postsDir, fileName)
                const fileContents = fs.readFileSync(fullPath, 'utf8')
                const matterResult = matter(fileContents)

                const postData = {
                    title: matterResult.data.title,
                    slug,
                    content: matterResult.content,
                    excerpt: matterResult.data.excerpt,
                    author: matterResult.data.author,
                    tags: matterResult.data.tags || [],
                    published: true,
                    publishedAt: new Date(matterResult.data.date),
                    likes: 0,
                    views: 0,
                    createdAt: new Date(matterResult.data.date),
                    updatedAt: new Date(matterResult.data.date)
                }

                const existingPost = await Post.findOne({ slug })
                if (!existingPost) {
                    await Post.create(postData)
                    console.log(`Created post: ${postData.title}`)
                } else {
                    console.log(`Post already exists: ${postData.title}`)
                }
            }
        }

        console.log('Seeding completed!')
        process.exit(0)
    } catch (error) {
        console.error('Seeding failed:', error)
        process.exit(1)
    }
}

seedPosts()
