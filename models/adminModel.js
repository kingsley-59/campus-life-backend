const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.Mixed,
  },
  userId: { type: String },
  adminRole: {
    type: String,
    default: "admin",
    enum: ["reviewer","admin", "superadmin"],
  },
}, {
    timestamps: true,
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
