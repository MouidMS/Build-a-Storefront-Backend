"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../models/product");
const prodcutStore = new product_1.ProductStore();
describe('Test Prodcut Model', () => {
    it('index method', () => {
        expect(prodcutStore.index).toBeDefined();
    });
    it('show method', () => {
        expect(prodcutStore.show).toBeDefined();
    });
    it('create method', () => {
        expect(prodcutStore.create).toBeDefined();
    });
    it('remove method', () => {
        expect(prodcutStore.delete).toBeDefined();
    });
    it('update method', () => {
        expect(prodcutStore.update).toBeDefined();
    });
    it('add a product', async () => {
        const result = await prodcutStore.create({
            name: 'Iphone 13 pro max',
            price: 250,
        });
        expect(result).toEqual({
            id: 3,
            name: 'Iphone 13 pro max',
            price: 250
        });
    });
    it('index list of products', async () => {
        const result = await prodcutStore.index();
        expect(result).toEqual([{
                id: 3,
                name: 'Iphone 13 pro max',
                price: 250
            }]);
    });
    it('check if return correct product', async () => {
        const result = await prodcutStore.show(3);
        expect(result).toEqual({
            id: 3,
            name: 'Iphone 13 pro max',
            price: 250
        });
    });
    it('check if update the product', async () => {
        const product = {
            name: 'Ipad 2021 128GB',
            price: 3200,
        };
        const createProeuct = await prodcutStore.create(product);
        const UpdateProduct = {
            name: 'Ipad 2021 256GB',
            price: 3800,
        };
        const { id, name, price } = await prodcutStore.update(createProeuct.id, UpdateProduct);
        expect(name).toEqual(UpdateProduct.name);
        expect(price).toEqual(UpdateProduct.price);
        await prodcutStore.delete(id);
    });
    it('check if can remove the product', async () => {
        await prodcutStore.delete(3);
        const result = await prodcutStore.index();
        expect(result).toEqual([]);
    });
});
