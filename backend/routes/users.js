import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    res.sendStatus(200)
})



router.post('/', async (req, res) => {
    res.sendStatus(200)
})



router.patch('/', async (req, res) => {
    res.sendStatus(200)
})

router.delete('/', async (req, res) => {
    res.sendStatus(200)
})

export default router;