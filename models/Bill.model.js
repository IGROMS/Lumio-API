const mongoose = require("mongoose")

const BillSchema = mongoose.Schema({
    powerUsed: {
        type: Number,
        required: true,
    },
    powerGenerated: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    contract: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Contract"
    }
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret._id;

      return ret
    }
}
})

const Bill = mongoose.model("Bill", BillSchema)

module.exports = Bill