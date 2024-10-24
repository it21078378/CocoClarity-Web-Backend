import mongoose from 'mongoose';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

groupSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Group = mongoose.model('Group', groupSchema);
export default Group;
