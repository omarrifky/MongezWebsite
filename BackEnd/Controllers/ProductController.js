import { Router } from "express";
import { authenticatesupplier } from "../../MiddleWare";
import { Product } from "../Models/Product";
const router = Router();

router.post("/getall", (req, res) => { // Gets all products
    const { queryBody, search, page, sort, limit } = req.body;
    const skip = limit * (page - 1);
    if (search) queryBody.$text = { $search: search };
    Product.find({ isremoved: false, ...queryBody })
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .then(async(products) => {
            const count = await Product.countDocuments({ isremoved: false, ...queryBody })
                .sort(sort);
            const pages = Math.ceil(count / limit);
            res.status(200).send({ products, pages, count });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
});

router.post("/create", authenticatesupplier, (req, res) => {

    var newproduct = new Product(); // create a new instance of the Product model
    newproduct.productName = req.body.productName;
    newproduct.photoLinks = req.body.photoLinks;
    newproduct.price = req.body.price;
    newproduct.percentageDiscount = req.body.percentageDiscount;
    newproduct.priceDiscount = req.body.priceDiscount;
    newproduct.rating = req.body.rating;
    newproduct.supplier = req.supplier._id;
    newproduct.quantity = req.body.quantity;
    newproduct.save().then(product => {
            res.status(200).send({ product: newproduct });
        })
        .catch((err) => {
            res.status(400).send({
                err: err.message ? err.message : err,
            });
        });
})

export const productController = router;