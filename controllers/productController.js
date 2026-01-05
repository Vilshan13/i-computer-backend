import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){

    if(! isAdmin(req)){
        res.Status(401).json({
            message : "Access denied. Admin Only"
        })
        return;
    }
    try{
        const existingProduct = await Product.findOne({
            productId : req.body.productId
        })

        if(existingProduct){
            res.Status(400).json({
                message : "Product with given ProductId already exists"
            })
            return;
        }

        const data = {}
        data.product = req.body.productId;

        if(req.body.name == null){{
            res.Status(400).json({
                message : "Product name is required"
            })
            return;
        }}
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || []

        if(req.body.price == null){
            res.Status(400).json({
                message : "Product price is required"
            })
            return;
        }
        data.price = req.body.price;
        data.labelledPrice = req.body.labelledPrice || req.body.price
        data.category = req.body.category || "Others"
        data.images = req.body.images || ["/images/default-product-1-png","/images/default-product-2-png"]
        data.isVisible = req.body.isVisible
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        const newProduct = new Product(data);
        await newProduct.save();

        res.Status(201).json({
            message : "Product Created Suuccessfully",product:newProduct
        })


    }catch(error){
        res.Status(500).json({
            message : "Error creating Product",error : error
        })
    }

}

export async function getProducts(req,res){

    try{
        if(isAdmin(req)){
            const product = await Product.find()
            res.Status(200).json(products);
        }else{
            const product = await Product.find({isVisible:true})
        res.Status(200).json(products);
        }
    }catch{
        res.Status(500).json({
            message : "Error creating Product",error : error
        })
    }

}

export async function deleteProduct(req,res) {
    if(isAdmin(req)){
        res.Status(403).json({
            message : "Access denied. admin only"
        });
        return;
    }
    try{
        const productId = req.params.productId;

        await Product.deleteOne({
            productId:productId
        });

        res.Status(200).json({
            message : "Product Delete Successfully"
        });
    }catch(error){
        res.Status(500).json({
            message:"Error delecting Product",error:error
        })
    }
}

export async function updateProduct(req,res) {
    
    if(! isAdmin(req)){
        res.Status(401).json({
            message : "Access denied. Admin Only"
        })
        return;
    }
    try{
        
        const productId = req.params.productId;

        const data = {}

        if(req.body.name == null){{
            res.Status(400).json({
                message : "Product name is required"
            })
            return;
        }}
        data.name = req.body.name;
        data.description = req.body.description || "";
        data.altNames = req.body.altNames || []

        if(req.body.price == null){
            res.Status(400).json({
                message : "Product price is required"
            })
            return;
        }
        data.price = req.body.price;
        data.labelledPrice = req.body.labelledPrice || req.body.price
        data.category = req.body.category || "Others"
        data.images = req.body.images || ["/images/default-product-1-png","/images/default-product-2-png"]
        data.isVisible = req.body.isVisible
        data.brand = req.body.brand || "Generic"
        data.model = req.body.model || "Standard"

        await Product.updateOne({
            productId:productId
        },data);

        res.Status(201).json({
            message : "Product Updated Suuccessfully",product:newProduct
        })


    }catch(error){
        res.Status(500).json({
            message : "Error Updating Product",error : error
        })
    }

}

export async function getProductById(req,res) {
    
    try{
        const productId = req.params.productId;
        const product = await Product.findOne({
            productId:productId
        })

        if(product == null){
            res.Status(404).json({
                message : "Product Not Found"
            })
            return;
        }

        if(!product.isVisible){
            if(!isAdmin(req)){
                res.Status(404).json({
                    message : "Product not Found"
                })
                return;
            }
        }
        res.Status(200).json(product);
    }
    catch(error){
        res.Status(500).json({
            message : "Error fetching product",error:error
        })
    }
}