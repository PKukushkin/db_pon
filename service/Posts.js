import * as Db from "./MariaClient.js";

/*** ADD NEW POST ***/
async function addPost(nazov, popis, typ, dat_kon, mie_kon, region) {
    await Db.query(
        'INSERT INTO posts (nazov, popis, typ, datum_konania, miesto_konania, region) VALUES (:nazov, :popis, :typ, :datum_konania, :miesto_konania, :region)',
        {nazov: nazov, popis: popis, typ: typ, datum_konania: dat_kon, miesto_konania: mie_kon, region: region}
    );
}

/*** EDITE POST ***/

async function updatePost(nazov, popis, typ, dat_kon, mie_kon, region, postId) {
    await Db.query(
        'UPDATE posts SET nazov = :nazov, popis = :popis, typ = :typ, datum_konania = :datum_konania, miesto_konania = :miesto_konania, region = :region WHERE id = :postId',
        {nazov: nazov, popis: popis, typ: typ, datum_konania: dat_kon, miesto_konania: mie_kon, region: region, postId: postId}
    );
}

/*** GET POST ***/

async function getPost(postId) {
    return Db.query(
        'SELECT * FROM posts WHERE id = :postId',
        {postId: postId}
    )
}

/*** DELETE POST ***/
async function deletePost(postId) {
    await Db.query(
        'DELETE FROM posts WHERE id = :postId',
        {postId: postId}
    );
}

/*** SHOW ALL POST ***/
async function findAllPosts() {
    return Db.query('SELECT * FROM posts');
}

/*** RETURN UPCOMING POSTS ***/
async function findUpcomingPosts() {
    return Db.query('SELECT * FROM posts WHERE datum_konania > CURDATE()');
}

/*** ORDER BY DATE ***/
async function orderByDate() {
    return Db.query('SELECT * FROM posts ORDER BY datum_konania ASC');
}

/*** ORDER BY NAME ***/
async function orderByName() {
    return Db.query('SELECT * FROM posts ORDER BY nazov ASC');
}

/*** ORDER BY REGION ***/
async function orderByRegion() {
    return Db.query('SELECT * FROM posts ORDER BY region ASC');
}


/*** ORDER BY DATE(ADMIN) ***/
async function orderByDateA() {
    return Db.query('SELECT * FROM posts ORDER BY datum_konania ASC');
}

/*** ORDER BY NAME(ADMIN) ***/
async function orderByNameA() {
    return Db.query('SELECT * FROM posts ORDER BY nazov ASC');
}

/*** ORDER BY REGION(ADMIN) ***/
async function orderByRegionA() {
    return Db.query('SELECT * FROM posts ORDER BY region ASC');
}


export {addPost, findAllPosts, deletePost, getPost, updatePost, findUpcomingPosts, orderByDate, orderByRegion, orderByName, orderByDateA, orderByNameA}