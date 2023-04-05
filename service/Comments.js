import * as Db from "./MariaClient.js";

/*** ADD COMMENT ***/
async function addComment(postId, autor, message) {
    await Db.query(
        'INSERT INTO comments (post_id, autor, message, created_at) VALUES (:post_id, :autor, :message, now())',
        {post_id: postId, autor: autor, message: message}
    );
}

/*** DELETE COMMENT ***/

async function deleteComment(commId) {
    await Db.query(
        'DELETE FROM comments WHERE id = :commId',
        {commId: commId}
    );
}

/*** DELETE ALL COMMENTS ***/
async function deleteCommentsOfPost(postId) {
    await Db.query(
        'DELETE FROM comments WHERE post_id = :postId',
        {postId: postId}
    );
}

/*** FIND ALL COMMENTS ***/
async function findAllComments(postId) {
    return Db.query('SELECT * FROM comments WHERE post_id = :postId ORDER BY created_at ASC',
        {postId: postId}
    );
}

export {addComment, deleteComment, findAllComments, deleteCommentsOfPost}