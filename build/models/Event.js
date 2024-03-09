"use strict";
const eventSchema = new Schema({
    _ID: Schema.Types.ObjectId,
    CourseCode: { type: String, required: true },
    CourseName: { type: String, required: true },
    Description: String,
    StartDate: Date,
    EndDate: Date,
    StartTime: Date,
    EndTime: Date,
    Type: String
});
module.exports = mongoose.model('Event', eventSchema);
