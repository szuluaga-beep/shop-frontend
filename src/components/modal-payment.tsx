import { Button, Form, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Package } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { mastercardRegex, paymentSchema, visaRegex } from '../lib/schemas/payment';
import { cleanCardNumber, formatCardNumber } from '../lib/utils';


export const ModalPayment = ({ productId }: { productId: number }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [creditCardType, setCreditCardType] = useState<string>('');
    const [cardValue, setCardValue] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            creditCard: '',
            deliveryInfo: '',
            expireAt: '',
            cvc: '',
            nameOfCard: '',
        },
    })

    const handleCreditCardType = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value.startsWith('4') || visaRegex.test(cleanCardNumber(value))) {
            setCreditCardType('Visa');
        } else if (value.startsWith('5') || mastercardRegex.test(cleanCardNumber(value))) {
            setCreditCardType('MasterCard');
        } else {
            setCreditCardType('');
        }
    }


    const onSubmit = (data: z.infer<typeof paymentSchema>) => {
        console.log({
            productId,
            creditCard: data.creditCard,
            deliveryInfo: data.deliveryInfo,
            expireAt: data.expireAt,
            cvc: data.cvc,
        });
    };

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
            <Modal isOpen={isOpen} backdrop='opaque' placement="center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Pay for product #{productId}
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 items-center justify-center'>

                                    <Input
                                        endContent={
                                            creditCardType === 'Visa' ? (
                                                <Image
                                                    src="/visa.svg"
                                                    alt="Visa"
                                                    className="w-6 h-6"
                                                />
                                            ) : creditCardType === 'MasterCard' ? (
                                                <Image
                                                    src="/mastercard.svg"
                                                    alt="MasterCard"
                                                    className="w-6 h-6"
                                                />
                                            ) : null
                                        }
                                        autoFocus
                                        {...register('creditCard')}
                                        value={cardValue}
                                        errorMessage={errors.creditCard?.message}
                                        isInvalid={!!errors.creditCard}
                                        labelPlacement='outside'
                                        label="Credit Card"
                                        placeholder="1234 5678 9012 3456"
                                        variant="bordered"
                                        onChange={(e) => {
                                            handleCreditCardType(e);
                                            const formatted = formatCardNumber(e.target.value);
                                            e.target.value = formatted;
                                            register('creditCard').onChange(e);
                                            setCardValue(formatted);
                                        }}
                                    />
                                    <div className='flex gap-4 w-full'>
                                        <Input
                                            {...register('expireAt')}
                                            errorMessage={errors.expireAt?.message}
                                            isInvalid={!!errors.expireAt}
                                            labelPlacement='outside'
                                            label="Expiration Date"
                                            placeholder="MM/YY"
                                            variant="bordered"
                                        />
                                        <Input
                                            {...register('cvc')}
                                            errorMessage={errors.cvc?.message}
                                            isInvalid={!!errors.cvc}
                                            labelPlacement='outside'
                                            label="CVC"
                                            placeholder="123"
                                            variant="bordered"
                                        />
                                    </div>
                                    <Input
                                        {...register('nameOfCard')}
                                        errorMessage={errors.nameOfCard?.message}
                                        isInvalid={!!errors.nameOfCard}
                                        labelPlacement='outside'
                                        label="Name on Card"
                                        placeholder="John Doe"
                                        variant="bordered"
                                    />
                                    <Input
                                        endContent={
                                            <Package className="text-2xl text-default-400 pointer-events-none shrink-0" />
                                        }
                                        {...register('deliveryInfo')}
                                        errorMessage={errors.deliveryInfo?.message}
                                        isInvalid={!!errors.deliveryInfo}
                                        labelPlacement='outside'
                                        label="Delivery information"
                                        placeholder="Enter your address"
                                        variant="bordered"
                                    />
                                    <Button type='submit' color="primary">
                                        Checkout
                                    </Button>
                                </Form>

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
