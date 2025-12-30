import { NextResponse } from "next/server"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const projectsDirectory = path.join(process.cwd(), './content/projects')

export async function GET() {
    try {
        const fileNames = fs.readdirSync(projectsDirectory)
        const markdownFiles = fileNames.filter(name => name.endsWith('.mdx'))

        if (markdownFiles.length === 0) {
            return NextResponse.json([])
        }

        const projects = markdownFiles.map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '')
            const filePath = path.join(projectsDirectory, fileName)
            const fileContents = fs.readFileSync(filePath, 'utf8')
            const matterResult = matter(fileContents)

            // Extract first paragraph as excerpt if not provided
            const excerpt = matterResult.data.excerpt || 
                matterResult.content.split('\n\n')[0].replace(/[#*]/g, '').trim()

            return {
                slug,
                ...matterResult.data,
                content: matterResult.content,
                excerpt
            }
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Failed to fetch projects:', error)
        return NextResponse.json([])
    }
}