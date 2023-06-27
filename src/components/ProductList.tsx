import IProduct from '../types/IProduct';

interface ProductListProps {
  products: Array<IProduct>;
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      {products.map((product: IProduct, index: number) => (
        <div key={product.id} className="product">
          <span>{index + 1}</span>
          <img className="product-image" src={product.images[0]} alt={product.title} />
          <div className="product-name">{product.title}</div>
          <div className="product-price">${product.price}</div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
