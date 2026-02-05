import { Post, User, Comment } from '../../DB/Models/Models.js';
// create post
export const createPost = async (req, res) => {
    try {
        const { title, content, userId } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const post = new Post({
            title,
            content,
            userId
        });
        await post.save();
        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating post',
            error: error.message
        });
    }
};
// delete post
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findByPk(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        if (post.userId !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this post' });
        }
        await post.destroy();
        res.status(200).json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting post',
            error: error.message
        });
    }
};
// get post details
export const getPostDetails = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ["id", "title"],
            include: [{
                model: User,
                attributes: ["id", "name"],
            },
            {
                model: Comment,
                attributes: ["id", "content"],
            }]
        });
        res.status(200).json({
            message: 'Post details fetched successfully',
            posts
        });
    }
    catch (error) {
        res.status(400).json({
            message: 'Error fetching post details',
            error: error.message
        });
    }
}
// get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: [
                "id", "title",
                [Post.sequelize.fn("COUNT", Post.sequelize.col("Comments.id")), "commentCount"]

            ],
            include: [{
                model: Comment,
                attributes: []
            }],
            group: ["posts.id", "posts.title"]
        });
        res.status(200).json({
            message: 'All posts fetched successfully',
            posts
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching all posts',
            error: error.message
        })

    }
}


