const PostController = require('./PostController')
const ItemController = require('./ItemController')
const OrderController = require('./OrderController')

// exporting our controllers
module.exports = {
  post: PostController,
  item: ItemController,
  order: OrderController
}
