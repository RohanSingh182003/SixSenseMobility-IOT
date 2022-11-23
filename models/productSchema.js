const { default: mongoose } = require( "mongoose" );

const productSchema = new mongoose.Schema({
    device_type: String,
    prod_name: String,
    ip_address: String,
    mac_address: String,
    status: String,
    function: String,
    version: Number,
    last_updated: Date,
  });
  
  const prodSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    isAdmin: Boolean,
    devices: [String],
    product: [productSchema],
  });

const Product = new mongoose.model("Product", prodSchema);

module.exports = Product;