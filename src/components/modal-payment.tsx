import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { CreditCard } from 'lucide-react';
import { FormPayment } from './form-payment';
import type { Product } from '../lib/interfaces/product';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/slices/product/productSlice';


export const ModalPayment = ({ product }: { product: Product }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const dispatch = useDispatch();

    return (
        <>
            <Button
                onPress={() => {
                    onOpen();
                    dispatch(addProduct(product))

                }}
                color="primary"
                size="sm"
                radius="full"
                className="self-end font-semibold text-balance text-base"
            >
                Pay with credit card
                <CreditCard className='text-2xl pointer-events-none shrink-0' />
            </Button>
            <Modal isOpen={isOpen} backdrop='opaque' placement="center" onOpenChange={onOpenChange} size='2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Pay for product {product.name}
                            </ModalHeader>
                            <ModalBody>
                                <FormPayment />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

