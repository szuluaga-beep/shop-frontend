import { Button, Card, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Image } from "@heroui/react";
import type { Product } from "../lib/interfaces/product";
import { formatCurrency } from "../lib/utils";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleSummary } from "../store/slices/summary/summarySlice";


export const Checkout = () => {

    const payment = useSelector((state: RootState) => state.payment);
    const product = useSelector((state: RootState) => state.product);

    const showSummary = useSelector((state: RootState) => state.summary.showSummary);
    const dispatch = useDispatch();

    const payProduct = () => {
        console.log(payment)
    }

    return (
        <>
            
            <Drawer placement="bottom" size="5xl" isOpen={showSummary} onOpenChange={
                ()=>{
                    dispatch(toggleSummary());
                }
            }

            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerHeader className="flex flex-col gap-1">
                                Summary payment
                            </DrawerHeader>
                            <DrawerBody>
                                {
                                    payment.creditCard
                                }
                                <CheckoutSummary product={product} />
                            </DrawerBody>
                            <DrawerFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => {
                                    payProduct();
                                    // onClose();
                                }}>
                                    Pay
                                </Button>
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>

    )
}

const CheckoutSummary = ({ product }: { product: Product }) => {

    return (
        <Card className="py-4">

            <CardBody className="overflow-visible py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center place-items-center">

                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={product.image}
                    width={200}
                />
                <div className="flex flex-col items-center">

                    <p className="text-tiny uppercase font-bold">{product.name}</p>
                    <small className="text-default-500">{product.description}</small>

                    <p className="text-lg font-semibold">Product price: {formatCurrency(product.price)}</p>
                    <p className="text-lg font-semibold">Product amount: {product.quantity}</p>
                </div>
                <div className="flex flex-col items-center text-lg font-semibold">

                    <p >Base fee: {formatCurrency(5)}</p>
                    <p >Delivery fee: {formatCurrency(2)}</p>
                    <p >Total price: {formatCurrency(product.price * product.quantity + 5 + 2)}</p>
                </div>
            </CardBody>
        </Card>
    )
}