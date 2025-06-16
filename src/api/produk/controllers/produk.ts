/**
 * produk controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::produk.produk', ({strapi}) => ({
    async create(ctx) {
        const {name, description, price, stock} = ctx.request.body.data;

        if (!name || name.trim() === '') {
            return ctx.badRequest('Field name wajib diisi');
        }

        if (price<0 || stock <0) {
            return ctx.badRequest('Price dan Stock tidak boleh negatif');
        }

        return await super.create(ctx);
    }, 

    async delete(ctx) {
        const {documentId} = ctx.params;

        try {
            const entity = await strapi.entityService.delete('api::produk.produk', documentId);

            ctx.body = {
                message: 'Produk berhasil dihapus',
                data: entity,
            };
            ctx.status = 200;
        } catch (error) {
            ctx.status = 500;
            ctx.body = {
                error: 'Gagal menghapus produk',
                details: error,
            };
        }   
    }
}));
