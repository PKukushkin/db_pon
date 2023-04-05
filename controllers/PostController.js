import express from 'express';
import {authorize} from '../service/Security.js';
import * as Posts from "../service/Posts.js";
import * as Comments from "../service/Comments.js";

const router = express.Router();

/*** SHOW POSTS(USER) ***/
router.get("/podujatia", async function (req, res) {
    let posts = await Posts.findUpcomingPosts();

    res.render('index/podujatia.twig', {
        posts: posts
    });
});

/*** SHOW POSTS(ADMIN) ***/
router.get("/admin", async function (req, res) {
    let posts = await Posts.findAllPosts();

    res.render('index/admin.twig', {
        posts: posts
    });
});

/*** SORT BY DATE ***/
router.get("/orderbydate", async function (req, res) {
    let posts = await Posts.orderByDate();

    res.render('index/podujatia.twig', {
        posts: posts
    });
});

/*** SORT BY NAME ***/
router.get("/orderbyname", async function (req, res) {
    let posts = await Posts.orderByName();

    res.render('index/podujatia.twig', {
        posts: posts
    });
});

/*** SORT BY REGION ***/
router.get("/orderbyregion", async function (req, res) {
    let posts = await Posts.orderByRegion();

    res.render('index/podujatia.twig', {
        posts: posts
    });
});


/*** SORT BY DATE(ADMIN) ***/
router.get("/orderbydateA", async function (req, res) {

    let posts = await Posts.orderByDateA();

    res.render('index/admin.twig', {
        posts: posts
    });
});

/*** SORT BY NAME(ADMIN) ***/
router.get("/orderbynameA", async function (req, res) {
    let posts = await Posts.orderByNameA();

    res.render('index/admin.twig', {
        posts: posts
    });
});

/*** SORT BY REGION(ADMIN) ***/
router.get("/orderbyregiona", async function (req, res) {
    let posts = await Posts.orderByRegionA();

    res.render('index/admin.twig', {
        posts: posts
    });
});

/*** GO TO UPDATE POSTS ***/
router.get("/updatered/:postId", async function (req, res) {
    let postinfo = await Posts.getPost(req.params.postId);
    let postId = req.params.postId
    res.render('index/update.twig', {
        post: postinfo,
        postId: postId
    });
    
});

/*** GO TO PAGE POSTS AND KOM ***/
router.get("/pod_info/:postId", async function (req, res) {
    let postinfo = await Posts.getPost(req.params.postId);
    let comments = await Comments.findAllComments(req.params.postId);
    let postId = req.params.postId
    res.render('index/pod_info.twig', {
        post: postinfo,
        postId: postId,
        comments: comments
    });
    
});

/*** DELETE POST AND GO TO LIST POSTS (ADMIN) ***/
router.get('/delete/:postId', authorize('admin'), async function(req, res) {

    await Comments.deleteCommentsOfPost(req.params.postId);
    await Posts.deletePost(req.params.postId);
    await req.flash('success', 'Príspevok bol vymazany.')


    res.redirect('/post/admin');
})

/*** UPDAET POST AND GO TO LISTS POSTS (ADMIN) ***/
router.post('/update/:postId', authorize('admin'), async function(req, res) {
    await Posts.updatePost(req.body.nazov, req.body.popis, req.body.typ, req.body.dat_kon, req.body.mie_kon, req.body.region, req.params.postId);
    await req.flash('success', 'Príspevok bol zmeneny.')

    res.redirect('/post/admin');
})

/*** ADD NEW POSTS (USER, ADMIN) ***/
router.post("/new", authorize('user', 'admin'), async function (req, res) {
    await Posts.addPost(req.body.nazov, req.body.popis, req.body.typ, req.body.dat_kon, req.body.mie_kon, req.body.region);
    await req.flash('success', 'Príspevok bol pridaný.')

    res.redirect('/post/admin');
});

export {router as PostController}