import mongoose from 'mongoose';

mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},
    date: { type: Date, required: true}
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

/**
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @returns
 */
 const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = await new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    return exercise.save();
}

const findExercise = async() => {
    let result = await Exercise.find();
    return result;
}

/**
 * @param {String} _id 
 * @param {String} name 
 * @param {Number} reps 
 * @param {Number} weight
 * @param {String} unit
 * @param {Date} date
 * @returns 
 */
 const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.updateOne({ _id: _id},
        { name: name, reps: reps, weight: weight, unit: unit, date: date });
    return result.modifiedCount;
}

/**
 * @param {String} id
 */

const deleteById = async(id) => {
    const result = await Exercise.deleteOne({ _id: id });
    return result.deletedCount;
}

export { createExercise, findExercise, replaceExercise, deleteById};