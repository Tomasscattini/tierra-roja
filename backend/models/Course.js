const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: String,
  description: String,
  date: String,
  hour: String,
  classes: [{
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    contentLink: String 
  }],
  streamingId: [{
      type: Schema.Types.ObjectId,
      ref: 'Streaming'
  }],
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;