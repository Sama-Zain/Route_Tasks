import { Comment, Post , User } from '../../DB/Models/Models.js';
import { Op } from 'sequelize';
// Create bulk comments
export const createBulkComments = async (req, res) => {
  try {
    const { comments } = req.body;

    if (!Array.isArray(comments) || comments.length === 0) {
      return res.status(400).json({
        message: "Comments must be a non-empty array"
      });
    }

    const createdComments = await Comment.bulkCreate(comments, {
      validate: true
    });

    return res.status(201).json({
      message: "Comments created successfully",
      comments: createdComments
    });

  } catch (error) {
    return res.status(400).json({
      message: "Error creating comment",
      error: error.message,
      details: error.errors
    });
  }
};
// update comment
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (comment.userId !== req.body.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this comment' });
    }
    await comment.update({ content });
    res.status(200).json({
      message: 'comment updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error deleting comment',
      error: error.message
    });
  }
};
// upsert comment
export const upsertComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    const comment = await Comment.findOne({
      where: {
        userId,
        postId
      }
    });
    if (comment) {
      await comment.update({ content });
      res.status(200).json({
        message: 'Comment updated successfully',
        comment,
        created: false
      });
    } else {
      const newComment = new Comment({
        content,
        userId,
        postId
      });
      await newComment.save();
      res.status(201).json({
        message: 'Comment created successfully',
        comment: newComment,
        created: true
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Error creating comment',
      error: error.message
    });
  }
};
// search comments
export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;
    if (!word) {
      return res.status(400).json({
        message: 'Please provide a word to search for'
      });
    }
    const comments = await Comment.findAll({
      where: {
        content: {
          [Op.like]: `%${word}%`
        }
      }
    });

    if (comments.length === 0) {
      return res.status(404).json({
        message: 'No comment found'
      });
    }
    res.status(200).json({
      message: 'Comments fetched successfully',
      count: comments.length,
      comments
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching comments',
      error: error.message
    });
  }
}
// get recent comments for a post
export const getRecentComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { postId },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: 3
    });
    if (comments.length === 0) {
      return res.status(404).json({
        message: 'No comments found'
      });
    }
    res.status(200).json({
      message: 'Recent comments fetched successfully',
      comments
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching recent comments',
      error: error.message
    });
  }
}
// get specific comment
export const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id,{
      attributes: ["id", "content"],
      include: [{
        model: User,
        attributes: ["id", "name", "email"],
      },
      {
        model: Post,
        attributes: ["id", "title", "content"],
      }
      ]
  });
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.status(200).json({
      message: 'Comment fetched successfully',
      comment
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error fetching comment',
      error: error.message
    });
  }
};

