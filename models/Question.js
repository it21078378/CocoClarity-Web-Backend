import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionaire: { type: Number, required: true },
    questionText: { type: String, required: true },
    answers: {
        type: [
            {
                text: { type: String, required: true }
            }
        ],
        validate: [arrayLimit, '{PATH} must have exactly 4 answers']
    },
});

function arrayLimit(val) {
    return val.length === 4;
}


const Question = mongoose.model("Question", questionSchema);
export default Question;
