

import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./components/product";
import { getProducts } from "./actions/product";
import { SkeletonCard } from "./components/skeleton";


function App() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,

  });
  if (isLoading) {

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    )
  }
  if (error) return <div>Error loading products</div>;

  if (!products || products.length === 0) return <div>No products available</div>;

  return (
    <>
      <h1 className='text-4xl font-bold text-center'>Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">

        {
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        }

      </div>
    </>
  )
}

export default App
