import OrderShema from "../model/orderModel.js";

const order ={
    getorder: async (req, res) => {
        try {
            const allOrders = await OrderShema.find();
            // const customers = await Lightweightpattu.find();
            res.status(200).json(allOrders);
        
            // Format the date field to "yyyy-MM-dd"
            // const formattedOrders = allOrders.map(order => ({
            //   ...order.toObject(),
            //   date: new Date(order.date).toLocaleDateString('en-GB'), // Adjust the locale as needed
            
        
            res.status(200).json(formattedOrders);
          } catch (error) {
            console.error('Error getting all orders:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        },
      

      createOrder:[async(req,res)=>{
        try{
            const {
                name,
                items,
                orderId,
                orderDate,
                status,
                address,
                totalprice
            } = req.body;
            const newOrder=await OrderShema.create({
                name,
                items,
                orderId,
                orderDate,
                status,
                address,
                totalprice
            })
            const saved=await newOrder.save()
            res.status(201).json(saved);
        }
        catch{
            console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
        }
      }],

      deleteOrder: async (req, res) => {
        try {
          const { orderId } = req.params; 
      
          if (!orderId) {
            return res.status(400).json({ error: 'delete orderId is required' });
          }
      
          const deleteOrder = await Orders.findByIdAndDelete(orderId);
      
          if (!deleteOrder) {
            return res.status(404).json({ error: 'Order not found' });
          }
      
          res.status(200).json(deleteOrder);
        } catch (error) {
          console.error('Error deleting order:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
}

export default order