const Blog = require('./../models/blog');
const moment = require('moment');

const blog_index = (req, res) => {
	// res.send('hello..');
    res.render('index',{
    	title: 'Home',
    	page_name: 'home'
    });
}
const blog_about = (req, res) => {
	res.render('about',{
    	title: 'About',
    	page_name: 'about'
    });
}
const blog_post = (req, res) => {
	
    Blog.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('post',{
                title: 'Post',
                page_name: 'post',
                posts: result,
                moment: moment
            });
        })
        .catch((err)=>{
            res.render('post',{
                title: 'Post',
                page_name: 'post',
                posts: []
            });
        })
	
}
const blog_post_detail = (req, res) => {
	
    var params = req.params;
    Blog.findById(params.id)
        .then((result)=>{
            res.render('post_detail',{
                title: 'Post',
                page_name: 'post',
                post: result
            });
        })
        .catch((err)=>{
            res.render('post_detail',{
                title: 'Post',
                page_name: 'post',
                post: []
            });
        })
    
}
const blog_post_create_form = (req, res) => {
	
    res.render('add_post',{
        title: 'Add new post',
        page_name: 'add_post'
    });
}
const blog_post_create = (req, res) => {
	 
    const blogs = new Blog({
         title: req.body.title,
         snippet: req.body.snippet,
         description: req.body.description
    });

     blogs.save()
         .then((result) =>{
             res.redirect('/post');
         })
         .catch((err) =>{
             console.log(err);
         });

}
const blog_post_edit_form = (req, res) => {
	 
    var params = req.params;
    Blog.findById(params.id)
        .then((result)=>{
            res.render('edit_post',{
                title: 'Edit Post',
                page_name: 'edit_post',
                post: result
            });
        })
        .catch((err)=>{
            res.render('post_detail',{
                title: 'Post',
                page_name: 'post',
                post: []
            });
        })
}
const blog_post_edit = (req, res) => {
	     
    var id = req.params.id;
    const data = {
         title: req.body.title,
         snippet: req.body.snippet,
         description: req.body.description
    };

     Blog.updateOne({ _id: id }, data)
         .then((result) =>{
             res.redirect('/post/'+id);
         })
         .catch((err) =>{
             console.log(err);
         });
}
const blog_post_delete = (req, res) => {
	     
    var id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/post'});
        })
        .catch((err)=>{
            console.log(err);
        })
}

module.exports = {
	blog_index,
	blog_about,
	blog_post,
	blog_post_detail,
	blog_post_create_form,
	blog_post_create,
	blog_post_edit_form,
	blog_post_edit,
	blog_post_delete,
}; 