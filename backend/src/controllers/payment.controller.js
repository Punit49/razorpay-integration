import razorpay from "../config/razorpay.js";
import ProductModel from "../models/Product.js";
import PaymentModel from "../models/Payment.js";
import config from "../config/config.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

const createOrder = async (req, res) => {
    try {
        const { productId } = req.params;

        if(!productId){
            return res.status(422).json({
                message: "productId is required"
            })
        }

        const product = await ProductModel.findById(productId);

        if(!product){
            return res.status(404).json({
                message: "Product Not Found"
            })
        }

        const order = await razorpay.orders.create({
            amount: Math.round(product.price * 100),
            currency: "INR", 
            receipt: `rcpt_${Date.now()}`,
            notes: { productId }
        });

        console.log(order);

        const payment = await PaymentModel.create({
            orderId: order.id, 
            amount: order.amount, 
            currency: "INR", 
            product: productId,
            user: "6aeb03d2441c950f3916581d",
            status: "pending"
        });

        return res.status(201).json({
            orderId: order.id, 
            amount: order.amount, 
            currency: "INR", 
            keyId: config.RAZORPAY_KEY, 
            productId
        });

    } catch (error) {
        console.log(`Error in creating order - ${error.message}`);
    }
} 

const verifyHandler = async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;

        const payment = await PaymentModel.findOne({
            orderId: orderId, 
            status: "pending"
        });

        if(!payment){
            return res.status(404).json({
                message: "Payment not found or already verified"
            })
        }

        const isValid = validatePaymentVerification({
            order_id: orderId,
            payment_id: paymentId
        }, signature, config.RAZORPAY_SECRET);

        if(!isValid){
            return res.status(404).json({
                message: "Invalid Payment Verification"
            })
        }

        await PaymentModel.updateOne(
            {orderId: orderId}, 
            {$set: {status: "completed", paymentId: paymentId, signature: signature}}
        );

        return res.status(200).json({
            message: "Payment Verification Successfull"
        })

    } catch (error) {
        console.log(`Error in verify api - ${error.message}`);
    }
} 

export {
    createOrder, verifyHandler
}