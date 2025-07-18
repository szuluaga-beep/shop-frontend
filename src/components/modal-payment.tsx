import { Button, Form, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Package } from 'lucide-react';
import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const cleanCardNumber = (value: string) => value.replace(/[\s-]/g, '');

const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format the digits into groups of 4
    return digits.replace(/(.{4})/g, '$1 ').trim();
}

// Regular expressions for common credit card types
const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/; // 13 or 16 digits, starts with 4
const mastercardRegex = /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/; // 16 digits, starts with 51-55 or 2221-2720

const schema = z.object({
    creditCard: z.string()
        .trim() // Remove leading/trailing whitespace
        .transform(cleanCardNumber) // Remove internal spaces/dashes
        .refine(val => {
            // Check against multiple regexes
            return visaRegex.test(val) ||
                mastercardRegex.test(val)
        }, {
            message: 'Invalid credit card number format. Please enter a valid Visa or MasterCard number.'
        }),

    expireAt: z.string().nonempty('Expiration date is required'),
    cvc: z.string()
        .length(3, 'CVC must be exactly 3 digits'),
    nameOfCard: z.string().min(1, 'Name on card is required'),
    deliveryInfo: z.string().min(1, 'Delivery information is required'),
});


export const ModalPayment = ({ productId }: { productId: number }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [creditCardType, setCreditCardType] = useState<string>('');
    const [cardValue, setCardValue] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
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


    const onSubmit = (data: z.infer<typeof schema>) => {
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
