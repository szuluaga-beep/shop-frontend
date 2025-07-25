import { addToast, Button, Card, CardBody, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, Image } from "@heroui/react";
import type { Product } from "../lib/interfaces/product";
import { formatCurrency } from "../lib/utils";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { toggleSummary } from "../store/slices/summary/summarySlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../actions/payment";
import type { PaymentWompi } from "../lib/interfaces/payment";

export const OrderSummary = ({ onOpenChange }: { onOpenChange: () => void }) => {

    const payment = useSelector((state: RootState) => state.payment);
    const product = useSelector((state: RootState) => state.product);

    const showSummary = useSelector((state: RootState) => state.summary.showSummary);
    const dispatch = useDispatch();

    const queryClient = useQueryClient()

    const mutationPayment = useMutation({
        mutationFn: async (payment: PaymentWompi) => {
            return createPayment(payment);
        },
        onSuccess: (data) => {
            addToast({
                title: "Payment Successful",
                description: `Your payment of ${formatCurrency(data.amount / 100)} has been processed successfully.`,
                color: "success"
            });
            onOpenChange(); // Close modal payment
            dispatch(toggleSummary());
            queryClient.invalidateQueries({ queryKey: ['products'] }); // Refresh products list if needed

            // Optionally, you can reset the payment state here
        },
        onError: (error: Error) => {
            addToast({
                title: "Payment Failed",
                description: error.message,
                color: "danger"
            });
        }
    })

    const payProduct = async () => {
        await mutationPayment.mutateAsync({
            address: payment.deliveryInfo,
            amountInCents: (parseFloat(product.price.toString()) + 5 + 2) * 100, // Convert to cents
            creditCardNumber: payment.creditCard,
            monthExpiration: payment.monthExpireAt,
            yearExpiration: payment.yearExpireAt,
            cvc: payment.cvc,
            nameOnCard: payment.nameOfCard,
            productId: product.id,
            customerFullName: payment.fullName,
            customerEmail: payment.email,
        })
    }

    return (
        <>

            <Drawer isOpen={showSummary} onOpenChange={
                () => {
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

                                <CheckoutSummary product={product} />
                            </DrawerBody>
                            <DrawerFooter>
                                <Button isDisabled={mutationPayment.isPending} color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button isLoading={mutationPayment.isPending} color="primary" onPress={() => {
                                    payProduct();

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

            <CardBody className="overflow-visible py-2 grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center place-items-center">
                <div>

                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src={product.imageUrl}
                        width={200}
                    />
                </div>
                <div className="flex flex-col items-center gap-1 justify-center">

                    <p className="text-tiny uppercase font-bold">{product.name}</p>
                    <small className="text-default-500">{product.description}</small>

                    <p className="text-lg font-semibold">Product amount: {formatCurrency(product.price)}</p>
                    <p className="text-default-500">Base fee: {formatCurrency(5)}</p>
                    <p className="text-default-500">Delivery fee: {formatCurrency(2)}</p>
                    <p className="text-default-500">Total price: {formatCurrency(parseFloat(product.price.toString()) + 5 + 2)}</p>
                </div>
            </CardBody>
        </Card>
    )
}