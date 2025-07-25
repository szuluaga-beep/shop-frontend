import { Button, Form, Image, Input, NumberInput, Select, SelectItem } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { mastercardRegex, paymentSchema, visaRegex } from "../lib/schemas/payment";
import type { Payment } from "../lib/types/payment";
import { useState, type ChangeEvent } from "react";
import { cleanCardNumber, formatCardNumber } from "../lib/utils";
import { Package } from "lucide-react";
import { months } from "../data/months";
import { years } from "../data/years";
import { OrderSummary } from "./checkout";
import { useDispatch } from "react-redux";
import { setPaymentDetails } from "../store/slices/payment/paymentSlice";
import { toggleSummary } from "../store/slices/summary/summarySlice";

export const FormPayment = ({ onOpenChange }: { onOpenChange: () => void }) => {

  const [creditCardType, setCreditCardType] = useState<string>('');
  const [cardValue, setCardValue] = useState<string>('');

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(paymentSchema),
  });

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


      <fieldset className='w-full mb-2'>
        <legend>Payment Information</legend>

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
            <Controller
              name="cvc"
              control={control}
              render={({ field }) => (
                <NumberInput
                  {...field}
                  value={+field.value}
                  hideStepper
                  errorMessage={errors.cvc?.message}
                  isInvalid={!!errors.cvc}
                  className="w-full md:w-1/3"
                  label="CVC"
                  placeholder="123"
                  variant="bordered"
                  onValueChange={(value) => {
                    field.onChange(value);
                    field.value = value.toString();
                  }}
                />
              )}
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

      <fieldset className='w-full'>
        <legend >
          Delivery Information
        </legend>


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
            type='email'
            label="Customer Email"
            placeholder="Enter your email"
            variant="bordered"
            {...register('email')}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
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

      <OrderSummary onOpenChange={onOpenChange} />

      <Button type='submit' color="primary">
        Checkout
      </Button>
    </Form>
  )
}

