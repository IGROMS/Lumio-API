const mongoose = require("mongoose")

const BillSchema = mongoose.Schema({

    // GENERAL 
    powerUsed: {
        type: Number,
        required: true,
        min: 0
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
    ticket: { // Para comprador/vendedor
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket"
    },
       
    // VENDEDOR
    powerGenerated: { // Para productor
        type: Number,
    },
    powerSold: { // Para vendedor
        type: Number,
    },
    
    // COMPRADOR
    powerPeerToPeer: { // Para comprador
        type: Number,
        min: 0
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