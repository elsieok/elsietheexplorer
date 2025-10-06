import mongoose from 'mongoose'
import Post from '../models/post.model.js'
import connectMongoDB from '../db/connectMongoDB.js'
import Comment from '../models/comment.model.js'

async function syncCommentsToPosts() {
  await connectMongoDB()

  const posts = await Post.find({})

  let updatedCount = 0

  for (const post of posts) {
    // Find all comments linked to this post
    const relatedComments = await Comment.find({ postId: post._id })

    // Get just the IDs
    const commentIds = relatedComments.map(comment => comment._id)

    // Only update if the comments field is missing or needs updating
    const shouldUpdate =
      !post.comments ||
      post.comments.length !== commentIds.length ||
      !post.comments.every(id => commentIds.includes(id))

    if (shouldUpdate) {
      post.comments = commentIds
      await post.save()
      updatedCount++
    }
  }

  console.log(`${updatedCount} post(s) updated with comment IDs.`)
  mongoose.connection.close()
}

syncCommentsToPosts().catch(err => {
  console.error('Error syncing comments to posts:', err)
  mongoose.connection.close()
})