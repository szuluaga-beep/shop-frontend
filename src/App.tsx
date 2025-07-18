import {  Card, CardBody, CardHeader, Image } from "@heroui/react"
import { products } from "./data/products"
import { ModalPayment } from "./components/modal-payment";


function App() {

  return (
    <>
      <h1 className='text-4xl font-bold text-center'>Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        {
          products.map(product => (
            <Card className="py-4" key={product.id}>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">

                <ModalPayment productId={product.id} />
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-tiny uppercase font-bold">{product.name}</p>
                <small className="text-default-500">{product.description}</small>
                <h4 className="font-bold text-large">$ {product.price}</h4>
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={product.image}
                  width={200}
                />
              </CardBody>
            </Card>
          ))
        }
        
      </div>
    </>
  )
}

export default App
