import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('Products', ProductSchema);

class ProductModel {

  async findByTitle(title) {
  const Product = await Product.findOne({ title });
  return Product;
  }

  async findById(productId) {
    const Product = await Product.findOne({ _id:productId });
    return Product;
    }

  async create(product) {
    const newProduct = await Product.create(product);
    return newProduct;
  }

  async update(productId, update) {
    const filter = { _id: productId };
    const option = { returnOriginal: false };

    const updatedProduct = await Product.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProduct;
  }

  async delete(productId) {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct;
  }
}

const ProductModel = new ProductModel();
export { ProductModel };