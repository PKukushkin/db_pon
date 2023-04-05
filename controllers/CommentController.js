import express from 'express';
import {authorize} from '../service/Security.js';
import * as Comments from "../service/Comments.js";

const router = express.Router();

/*** ADD POST ***/
router.post("/add/:postId", async function (req, res) {
    // pockat na dokoncenie funkcie pre pridanie komentaru
    await Comments.addComment(req.params.postId, req.body.autor, req.body.message);
    await req.flash('success', 'Príspevok bol pridaný.');

    // presmerovat na konkretny prispevok
    let postId = req.params.postId;
    res.redirect('/post/pod_info/' + postId);
});

/*** DELETE POST ***/
router.get('/delete/:id/:postId', authorize('admin'), async function(req, res) {
    await Comments.deleteComment(req.params.id);
    await req.flash('success', 'Príspevok bol vymazany.')

    let postId = req.params.postId;
    res.redirect('/post/pod_info/' + postId);
})

export {router as CommentController}