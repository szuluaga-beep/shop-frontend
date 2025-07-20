
import { products } from "./data/products"
import { ProductCard } from "./components/product";


function App() {

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
