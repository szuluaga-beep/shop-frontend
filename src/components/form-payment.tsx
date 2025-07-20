import { Accordion, AccordionItem, Button, Form, Image, Input, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mastercardRegex, paymentSchema, visaRegex } from "../lib/schemas/payment";
import type { Payment } from "../lib/types/payment";
import { useState, type ChangeEvent } from "react";
import { cleanCardNumber, formatCardNumber } from "../lib/utils";
import { Package } from "lucide-react";
import { months } from "../data/months";
import { years } from "../data/years";
import { Checkout } from "./checkout";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setPaymentDetails } from "../store/slices/payment/paymentSlice";
import { toggleSummary } from "../store/slices/summary/summarySlice";

export const FormPayment = () => {

  const [creditCardType, setCreditCardType] = useState<string>('');
  const [cardValue, setCardValue] = useState<string>('');

   const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      creditCard: '',
      cvc: '',
      nameOfCard: '',
      fullName: '',
      deliveryInfo: '',
    },
  });

  const payment = useSelector((state: RootState) => state.payment);
  const dispatch = useDispatch();

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

  const onSubmit = (data: Payment) => {
    dispatch(setPaymentDetails(data));
    dispatch(toggleSummary());
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full justify-center items-center'>
      {
        payment.creditCard
      }

      <Accordion variant="bordered" className="w-full" defaultExpandedKeys={["1"]}>

        <AccordionItem
          key={"1"}
          title="Payment Information"
          aria-label="Payment Information"
          subtitle="Enter your credit card details"
        >
          <fieldset className='w-full mb-2'>

            <div className='flex flex-col gap-4 w-full'>
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
              <div className="flex gap-4 w-full flex-col md:flex-row">

                <div className="flex gap-4 w-full">
                  <Select label="Select a month"
                    items={months}
                    variant="bordered"
                    {...register('monthExpireAt')}
                    errorMessage={errors.monthExpireAt?.message}
                    isInvalid={!!errors.monthExpireAt}
                  >
                    {(month) => <SelectItem key={month.value}>{month.label}</SelectItem>}
                  </Select>
                  <Select label="Select a year" variant="bordered"
                    {...register('yearExpireAt')}
                    errorMessage={errors.yearExpireAt?.message}
                    isInvalid={!!errors.yearExpireAt}
                    items={years}
                  >
                    {(year) => <SelectItem key={year.value}>{year.label}</SelectItem>}
                  </Select>
                </div>

                <Input
                  {...register('cvc')}
                  errorMessage={errors.cvc?.message}
                  isInvalid={!!errors.cvc}
                  className="w-full md:w-1/3"
                  label="CVC"
                  placeholder="123"
                  variant="bordered"
                />
              </div>
              <Input
                {...register('nameOfCard')}
                errorMessage={errors.nameOfCard?.message}
                isInvalid={!!errors.nameOfCard}
                label="Name on Card"
                placeholder="John Doe"
                variant="bordered"
              />
            </div>
          </fieldset>
        </AccordionItem>
        <AccordionItem
          key={"2"}
          title="Delivery Information"
          aria-label="Delivery Information"
          subtitle="Enter your delivery details"
        >
          <fieldset className='w-full'>


            <div className='flex flex-col gap-4 w-full'>
              <Input
                type='text'
                label="Customer Full Name"
                placeholder="Enter your full name"
                variant="bordered"
                {...register('fullName')}
                errorMessage={errors.fullName?.message}
                isInvalid={!!errors.fullName}
              />
              <Input
                endContent={
                  <Package className="text-2xl text-default-400 pointer-events-none shrink-0" />
                }
                {...register('deliveryInfo')}
                errorMessage={errors.deliveryInfo?.message}
                isInvalid={!!errors.deliveryInfo}
                label="Delivery information"
                placeholder="Enter your address"
                variant="bordered"
              />
            </div>
          </fieldset>
        </AccordionItem>
      </Accordion>



      <Checkout />



      <Button type='submit' color="primary">
        Checkout
      </Button>
    </Form>
  )
}

