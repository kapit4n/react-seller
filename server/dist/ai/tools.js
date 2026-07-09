"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTools = createTools;
function defineTool(name, description, parameters, execute) {
    return { definition: { name, description, parameters }, execute };
}
function createTools(productRepo, orderDetailRepo, orderRepo, customerRepo) {
    const searchProducts = defineTool('searchProducts', 'Search for products by name, code, or keyword. Returns matching products with id, name, code, price, and stock.', {
        type: 'object',
        properties: {
            query: {
                type: 'string',
                description: 'Search query (product name or code)',
            },
        },
        required: ['query'],
    }, async (args) => {
        const query = String(args.query || '').toLowerCase();
        const all = await productRepo.find({ limit: 100 });
        const filtered = all.filter((p) => p.name.toLowerCase().includes(query) ||
            (p.code && p.code.toLowerCase().includes(query)));
        return {
            success: true,
            data: filtered.map((p) => ({
                id: p.id,
                name: p.name,
                code: p.code,
                price: p.price,
                stock: p.stock,
                img: p.img,
            })),
        };
    });
    const getProductStock = defineTool('getProductStock', 'Get the current stock level for a specific product by ID.', {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                description: 'The product ID',
            },
        },
        required: ['productId'],
    }, async (args) => {
        const id = Number(args.productId);
        const product = await productRepo.findById(id);
        return {
            success: true,
            data: { id: product.id, name: product.name, stock: product.stock, price: product.price },
        };
    });
    const getCurrentCart = defineTool('getCurrentCart', 'Get the current shopping cart contents, including items, quantities, prices, and total.', {
        type: 'object',
        properties: {},
        required: [],
    }, async () => {
        const items = await orderDetailRepo.find({ where: { orderId: null } });
        const cart = { items: [], total: 0, itemCount: 0 };
        for (const item of items) {
            let productName = `Product #${item.productId}`;
            try {
                const product = await productRepo.findById(item.productId);
                productName = product.name;
            }
            catch { }
            const cartItem = {
                id: item.id,
                productId: item.productId,
                productName,
                quantity: item.quantity,
                price: item.price,
                totalPrice: item.totalPrice,
            };
            cart.items.push(cartItem);
            cart.total += item.totalPrice;
            cart.itemCount += item.quantity;
        }
        return { success: true, data: cart };
    });
    const addToCart = defineTool('addToCart', 'Add a product to the current cart. Validates stock before adding.', {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                description: 'The product ID to add',
            },
            quantity: {
                type: 'number',
                description: 'Quantity to add (default 1)',
            },
        },
        required: ['productId'],
    }, async (args) => {
        const productId = Number(args.productId);
        const quantity = Number(args.quantity || 1);
        const product = await productRepo.findById(productId);
        const existingItems = await orderDetailRepo.find({
            where: { orderId: null, productId },
        });
        const currentQtyInCart = existingItems.reduce((sum, i) => sum + i.quantity, 0);
        const needed = currentQtyInCart + quantity;
        if (needed > product.stock) {
            return {
                success: false,
                error: `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${quantity}, already in cart: ${currentQtyInCart}.`,
            };
        }
        if (existingItems.length > 0) {
            const item = existingItems[0];
            const newQty = item.quantity + quantity;
            const totalPrice = newQty * product.price;
            await orderDetailRepo.updateById(item.id, {
                quantity: newQty,
                totalPrice,
            });
            return {
                success: true,
                data: { id: item.id, productId, quantity: newQty, price: product.price, totalPrice },
            };
        }
        const totalPrice = quantity * product.price;
        const detail = await orderDetailRepo.create({
            productId,
            quantity,
            price: product.price,
            totalPrice,
            discount: 0,
        });
        return {
            success: true,
            data: { id: detail.id, productId, quantity, price: product.price, totalPrice },
        };
    });
    const removeFromCart = defineTool('removeFromCart', 'Remove a product from the current cart by product ID.', {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                description: 'The product ID to remove',
            },
        },
        required: ['productId'],
    }, async (args) => {
        const productId = Number(args.productId);
        const items = await orderDetailRepo.find({
            where: { orderId: null, productId },
        });
        if (items.length === 0) {
            return { success: false, error: 'Product not found in cart' };
        }
        for (const item of items) {
            await orderDetailRepo.deleteById(item.id);
        }
        return { success: true, data: { productId, removed: items.length } };
    });
    const updateQuantity = defineTool('updateQuantity', 'Update the quantity of a product in the current cart. Validates stock.', {
        type: 'object',
        properties: {
            productId: {
                type: 'number',
                description: 'The product ID to update',
            },
            quantity: {
                type: 'number',
                description: 'New quantity (must be > 0)',
            },
        },
        required: ['productId', 'quantity'],
    }, async (args) => {
        const productId = Number(args.productId);
        const quantity = Number(args.quantity);
        if (quantity <= 0) {
            return { success: false, error: 'Quantity must be greater than 0' };
        }
        const product = await productRepo.findById(productId);
        if (quantity > product.stock) {
            return {
                success: false,
                error: `Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${quantity}.`,
            };
        }
        const items = await orderDetailRepo.find({
            where: { orderId: null, productId },
        });
        if (items.length === 0) {
            return { success: false, error: 'Product not found in cart' };
        }
        const item = items[0];
        const totalPrice = quantity * product.price;
        await orderDetailRepo.updateById(item.id, { quantity, totalPrice });
        return { success: true, data: { id: item.id, productId, quantity, price: product.price, totalPrice } };
    });
    const clearCart = defineTool('clearCart', 'Remove all items from the current cart.', {
        type: 'object',
        properties: {},
        required: [],
    }, async () => {
        const items = await orderDetailRepo.find({ where: { orderId: null } });
        for (const item of items) {
            await orderDetailRepo.deleteById(item.id);
        }
        return { success: true, data: { cleared: items.length } };
    });
    const submitOrder = defineTool('submitOrder', 'Submit the current cart as a new order. Requires a customerId.', {
        type: 'object',
        properties: {
            customerId: {
                type: 'number',
                description: 'The customer ID for this order',
            },
        },
        required: ['customerId'],
    }, async (args) => {
        const customerId = Number(args.customerId);
        const customer = await customerRepo.findById(customerId);
        const items = await orderDetailRepo.find({ where: { orderId: null } });
        if (items.length === 0) {
            return { success: false, error: 'Cart is empty' };
        }
        const total = items.reduce((sum, i) => sum + i.totalPrice, 0);
        if (total > customer.budget) {
            return {
                success: false,
                error: `Customer "${customer.name}" has insufficient budget. Available: Bs ${customer.budget.toFixed(2)}, total: Bs ${total.toFixed(2)}.`,
            };
        }
        const order = await orderRepo.create({
            customerId,
            total,
            createdDate: new Date(),
            deliveryDate: new Date(),
            paid: false,
            delivered: false,
        });
        for (const item of items) {
            await orderDetailRepo.updateById(item.id, { orderId: order.id });
            const product = await productRepo.findById(item.productId);
            const newStock = product.stock - item.quantity;
            await productRepo.updateById(item.productId, { stock: newStock });
        }
        return {
            success: true,
            data: { orderId: order.id, total, itemCount: items.length },
        };
    });
    const proposeCartChanges = defineTool('proposeCartChanges', 'Propose changes to the cart. Call this to present a summary of what you want to do and get user confirmation. This does NOT make any changes.', {
        type: 'object',
        properties: {
            summary: {
                type: 'string',
                description: 'Human-readable summary of the proposed changes',
            },
            actions: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['add', 'remove', 'update', 'clear', 'submit'],
                            description: 'Type of action',
                        },
                        productId: { type: 'number' },
                        productName: { type: 'string' },
                        quantity: { type: 'number' },
                        customerId: { type: 'number' },
                    },
                    required: ['type'],
                },
            },
            total: { type: 'number', description: 'Total price of the proposed changes' },
        },
        required: ['summary', 'actions'],
    }, async (args) => {
        return { success: true, data: args };
    });
    return [
        searchProducts,
        getProductStock,
        getCurrentCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        submitOrder,
        proposeCartChanges,
    ];
}
//# sourceMappingURL=tools.js.map