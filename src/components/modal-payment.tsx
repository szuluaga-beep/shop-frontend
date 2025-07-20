import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { CreditCard } from 'lucide-react';
import { FormPayment } from './form-payment';


export const ModalPayment = ({ productId }: { productId: number }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    return (
        <>
            <Button
                onPress={onOpen}
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
                                Pay for product #{productId}
                            </ModalHeader>
                            <ModalBody>
                                <FormPayment productId={productId} />

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

