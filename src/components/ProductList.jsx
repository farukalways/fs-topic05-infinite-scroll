import { useEffect, useRef, useState } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();
  const perPageProduct = 9;

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=9&skip=${page * perPageProduct}`
      );
      const data = await response.json();
      if (data.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setPage((prevPage) => prevPage + 1);
      }
    };

    const onInterSection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProduct();
      }
    };

    const observer = new IntersectionObserver(onInterSection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    // cleanUp
    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);

  return (
    <div className=" bg-gray-200 text-black">
      <div className="w-11/12 mx-auto min-h-screen">
        <h2 className="my-5 py-7 text-center bg-gray-300 text-2xl text-purple-500">
          All Product
        </h2>
        <div className=" py-5 px-2 mt-5 w-full min-h-screen bg-gray-300">
          <div className="grid grid-cols-3 gap-5 ">
            {" "}
            {products &&
              products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
          </div>

          {hasMore && <p ref={loaderRef}>more Product...</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
