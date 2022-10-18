const mongoose = require("mongoose")

const BillSchema = mongoose.Schema({
    powerUsed: {
        type: Number,
        required: true,
        min: 0
    },
    powerFromTicket: {
        type: Number,
        min: 0
    },
    powerGenerated: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    contract: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Contract"
    },
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
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