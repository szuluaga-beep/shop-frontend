import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { CreditCard, LockIcon, Package } from 'lucide-react';


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
                <CreditCard className='text-2xl pointer-events-none shrink-0'/>
            </Button>
            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Pay for product #{productId}
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    endContent={
                                        <CreditCard className="text-2xl text-default-400 pointer-events-none shrink-0" />
                                    }
                                    labelPlacement='outside'
                                    label="Credit Card"
                                    placeholder="1234 5678 9012 3456"
                                    variant="bordered"
                                />
                                <Input
                                    endContent={
                                        <Package className="text-2xl text-default-400 pointer-events-none shrink-0" />
                                    }
                                    labelPlacement='outside'
                                    label="Delivery information"
                                    placeholder="Enter your address"
                                    variant="bordered"
                                />
                                
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Checkout
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
