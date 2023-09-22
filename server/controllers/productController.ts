import {NextFunction, Request, Response} from "express";
import {v4} from 'uuid';
import ApiError from "../error/ApiError";
import path from "path";
import {Product, ProductInfo} from "../models/models";

class ProductController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name, price, brandId, typeId, info} = req.body;
            if (!req.files)
                return next(ApiError.badRequest('Files'));
            let {img} = req.files;
            if (img instanceof Array)
                img = img[0];
            let filename = v4() + '.jpg';

            const product = await Product.create({name, price, brandId, typeId, img: filename});

            if (info) {
                const parsedInfo = JSON.parse(info);
                parsedInfo.forEach((el: any) => {
                    ProductInfo.create({
                        title: el.title,
                        description: el.description,
                        productId: product.dataValues.id,
                    })
                })
            }

            img.mv(path.resolve(__dirname, '..', 'static', filename));

            return res.json(product);
        } catch (e: any) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req: Request, res: Response) {
        const {brandId, typeId, limit , page} = req.query;
        const pageNumber = page ? Number(page) : 1;
        const limitNumber = limit ? Number(limit) : 9;
        let offset = pageNumber * limitNumber - limitNumber;
        let products;
        if (!brandId && !typeId) {
            products = await Product.findAndCountAll({limit: limitNumber, offset});
        }
        else if (brandId && !typeId) {
            products = await Product.findAndCountAll({where:{brandId}, limit: limitNumber, offset});
        }
        else if (!brandId && typeId) {
            products = await Product.findAndCountAll({where:{typeId}, limit: limitNumber, offset});
        }
        else {
            products = await Product.findAndCountAll({where:{brandId, typeId}, limit: limitNumber, offset});
        }
        return res.json(products);
    }

    async getOne(req: Request, res: Response) {
        const {id} = req.params;
        const product = await Product.findOne({where:{id}, include: [{model: ProductInfo, as: 'info'}]});
        return res.json(product);
    }
}

export default new ProductController;