const Product = ({ product }) => {
  const { title, thumbnail, price } = product;

  return (
    <div className="card bg-white w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={thumbnail} alt={title} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>

        <div className="card-actions">
          <button className="btn btn-primary">{price}</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
