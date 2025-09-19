import express from 'express'

import {
  createBlogValidation,
  getBlogValidation,
  updateBlogValidation,
  deleteBlogValidation
} from '../validations/blog.validation.js'

import {
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller.js'

const router = express.Router()

router.post('/', createBlogValidation, createBlog)
router.get('/:id', getBlogValidation, getBlog)
router.put('/:id', updateBlogValidation, updateBlog)
router.delete('/:id', deleteBlogValidation, deleteBlog)

export default app => {
  app.use('/api/blogs', router)
}