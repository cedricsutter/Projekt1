import express from 'express'
import Datastore from 'nedb-promises'

const router = express.Router();
const ndb = new Datastore({filename: '../data/data.db', autoload: true});

router.get('/', async (req, res) => {
    try {
        let all = getAll();
        res.json(all);
    } catch (error) {
        res.json({message: "error"});
    }
})


router.post('/', async (req, res) => {
    try {
        ndb.remove();
    } catch (error) {
        res.json({message: "error"});

    }
});


export const noteRoutes = router;

