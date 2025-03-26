import express from "express";
import { Answer } from "../model/Answer.js"
const router = express.Router();

router.get("/", function (req, res, next) {
    Answer.find().exec(function (err, answers) {
        if (err) {
            return next(err)
        }
        res.status(200).send(answers)
    })
});

router.get("/:questionNumber", function (req, res, next) {
    Answer.find({ questionNumber: req.params.questionNumber }).exec(function (err, answers) {
        if (err) {
            return next(err)
        }
        res.status(200).send(answers)
    })
});

router.post("/", function (req, res, next) {
    const newAnswer = new Answer(req.body)
    //save new answer created
    newAnswer.save(function (err, savedAnswer) {
        if (err) {
            return next(err)
        }
        res.status(201).send(savedAnswer)
    })
})

export default router;