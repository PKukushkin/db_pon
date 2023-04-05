import express from 'express';

const router = express.Router();

/*** ROUT MAIN PAGE ***/
router.get("/", function (req, res) {
    res.render('index/index.twig', {
        message: 'Vitajte na webe PodujatiaSK !'
    });
});

/*** EVENTS PAGE ***/
router.get("/podujatia", function (req, res) {
    res.render('index/podujatia.twig', {
        message: 'Podujatia'
    });
});

export {router as IndexController}