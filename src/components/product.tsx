
import { Card, CardBody, CardFooter, Image } from '@heroui/react'
import type { Product } from '../lib/interfaces/product'
import { ModalPayment } from './modal-payment'
import { formatCurrency } from '../lib/utils'

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="py-4" key={product.id}>

            <CardBody className="overflow-visible py-2 flex flex-col items-center gap-2">

                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={product.imageUrl}
                    width={200}
                />
                <p className="text-tiny uppercase font-bold">{product.name}</p>
                <small className="text-default-500">{product.description}</small>
                <div className="flex items-center justify-between w-full mt-2">

                    <h4 className="font-bold text-large">{formatCurrency(product.price)}</h4>
                    <span className="text-sm ">Availability units: {product.quantity}</span>
                </div>
            </CardBody>
            <CardFooter className="flex justify-end">
                <ModalPayment product={product} />

            </CardFooter>
        </Card>
    )
}

