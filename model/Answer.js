import mongoose, { Schema, model } from "mongoose";

//create the answer schema
let answerSchema = new Schema({
    id: {
        type: mongoose.ObjectId
    },
    questionNumber: {
        type: Number,
        required: true
    },
    answer: {
        type: String,
        required: [true, "Il faut entrer une réponse"],
        maxLength: 100
    },
    comment: {
        type: String,
        maxLength: 500
    },
    image: {
        type: Object
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

//create model and export it
export const Answer = model('Answer', answerSchema)