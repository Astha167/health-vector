const BlogPost = require('../models/BlogPost');

// @route GET /api/blog
const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const filter = { published: true };
    if (category && category !== 'All') filter.category = category;
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];

    const total = await BlogPost.countDocuments(filter);
    const posts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .select('-content');

    res.json({ posts, total, pages: Math.ceil(total / parseInt(limit)), page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// @route GET /api/blog/:slug
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const related = await BlogPost.find({
      category: post.category,
      published: true,
      _id: { $ne: post._id },
    }).limit(3).select('-content');

    res.json({ post, related });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// @route POST /api/blog (admin)
const createPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};

// @route PUT /api/blog/:id (admin)
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// @route DELETE /api/blog/:id (admin)
const deletePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost };
