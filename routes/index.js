const express = require('express');
const router = express.Router();

const Blog = require('./../models/blog');

router.get('/', (req, res)=>{
    // res.send('hello..');
    res.render('index',{
    	title: 'Home',
    	page_name: 'home'
    });
});

router.get('/about', (req, res)=>{
    res.render('about',{
    	title: 'About',
    	page_name: 'about'
    });
});

router.get('/about/*', (req, res)=>{
	res.redirect('/about');
});

router.get('/post', (req, res)=>{
	
    Blog.find().sort({ createdAt: -1})
        .then((result)=>{
            res.render('post',{
                title: 'Post',
                page_name: 'post',
                posts: result
            });
        })
        .catch((err)=>{
            res.render('post',{
                title: 'Post',
                page_name: 'post',
                posts: []
            });
        })
	
});

router.get('/post/:id', (req, res)=>{
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
    
});

router.delete('/delete_post/:id', (req, res)=>{
    var id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/post'});
        })
        .catch((err)=>{
            console.log(err);
        })
    
});

router.post('/add-post', (req, res)=>{
	
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

});

router.get('/post/create', (req, res)=>{
    
    res.render('add_post',{
        title: 'Add new post',
        page_name: 'add_post'
    });
});

router.use((req, res)=>{
 	res.status(404).render('404',{
    	title: 'Page note found',
    	page_name: '404'
    });
});

module.exports = router;