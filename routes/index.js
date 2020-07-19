const express = require('express');
const blogController = require('./../controllers/blogController');

const router = express.Router();


router.get('/', blogController.blog_index);
router.get('/about', blogController.blog_about);
router.get('/post', blogController.blog_post);
router.get('/post/:id', blogController.blog_post_detail);
router.get('/posts/create', blogController.blog_post_create_form);
router.post('/add-post', blogController.blog_post_create);
router.get('/posts/edit/:id', blogController.blog_post_edit_form);
router.post('/edit-post/:id', blogController.blog_post_edit);
router.delete('/delete_post/:id', blogController.blog_post_delete);


router.use((req, res)=>{
 	res.status(404).render('404',{
    	title: 'Page note found',
    	page_name: '404'
    });
});

module.exports = router;