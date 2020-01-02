const products = require('../Service/Product');

const APIError = require('../rest').APIError;

const db = require('../db');

module.exports = {
    'GET /api/products': async (ctx, next) => {
        const data = await db('SELECT * from product');

        ctx.rest({
            products: data
        });
        // ctx.rest({
        //     products: products.getProducts()
        // });
    },

    'GET /api/products/:id': async (ctx, next) => {
        const data = await db(`SELECT * FROM product WHERE id = ${ctx.params.id}`);
        ctx.rest({
            products: data
        });
        // ctx.rest({
        //     products: products.getProductsId(ctx.params.id)
        // });
    },

    'POST /api/products': async (ctx, next) => {
        const name = ctx.request.body.name;
        const manufacturer = ctx.request.body.manufacturer;
        const price = ctx.request.body.price;
        const data = await db(`INSERT INTO product(name, manufacturer, price) VALUES('${name}', '${manufacturer}', ${price})`);

        // var p = products.createProduct(ctx.request.body.name, ctx.request.body.manufacturer, parseFloat(ctx.request.body.price));
        ctx.rest({
            products: data
        });
    },

    'PUT /api/products/:id': async (ctx, next) => {
        const data = await db(`UPDATE product set name = 'UPDATE Name' WHERE id = ${ctx.params.id}`);
        // var p = products.deleteProduct(ctx.params.id);
        if (data) {
            ctx.rest({
                products: data
            });
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    },

    'DELETE /api/products/:id': async (ctx, next) => {
        // console.log(`delete product ${ctx.params.id}...`);
        const data = await db(`DELETE FROM product WHERE id = ${ctx.params.id}`);
        // var p = products.deleteProduct(ctx.params.id);
        if (data) {
            ctx.rest({
                products: data
            });
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};