export const check_product_discount = async(admin, product_id) =>
{
    const product = await admin.rest.resources.Product.find({
        session: session,
        id: product_id,
      });
    if(product)
    {
        product.variants.forEach(variant => {
            const price = parseFloat(variant.price);
            const compareAtPrice = parseFloat(variant.compare_at_price);
            if (compareAtPrice > price) {
              return true;
            }
        })
    }
    return false;
}