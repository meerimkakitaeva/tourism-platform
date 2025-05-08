import React, { useEffect, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import TextFieldSelect from '@/components/UI/TextField/components/TextFieldSelect/TextFieldSelect';
import PhoneInputWithCountrySelect from 'react-phone-number-input';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import 'react-phone-number-input/style.css';
import 'react-day-picker/dist/style.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import '@/styles/TextField.css';

interface Props {
  name: string;
  type: React.HTMLInputTypeAttribute | 'select' | 'phone';
  value: string;
  onChange: (e: IChangeEvent) => void;
  icon?: string;
  className?: string;
  label?: string;
  errorMessage?: string;
  errorMessageSize?: string | number;
  required?: boolean;
  style?: React.CSSProperties;
  setErrorMessage?: (message: string) => void;
}

const TextField: React.FC<Props> = (props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [prevSelectedDate, setPrevSelectedDate] = useState<Date>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const t = useTranslations('oneTour');

  useEffect(() => {
    if (inputRef.current && selectedDate && prevSelectedDate !== selectedDate) {
      props.onChange({
        target: {
          name: inputRef.current.name,
          value: selectedDate.toISOString(),
        },
      });
      setPrevSelectedDate(selectedDate);
    }
  }, [inputRef, props, prevSelectedDate, selectedDate]);

  const isDatePicker = props.type === 'date';
  const isSelect = props.type === 'select';
  const isPhone = props.type === 'phone';

  const getFormat = (date: Date) => format(date, 'dd/MM/yyyy');

  const inputClassNames: string[] = ['text-field-input'];

  useEffect(() => {
    const phoneInputsRef = document.getElementsByClassName(
      'PhoneInputInput',
    ) as HTMLCollectionOf<HTMLInputElement>;

    if (phoneInputsRef[0]) {
      phoneInputsRef[0].style.borderColor =
        isPhone && props.errorMessage ? '#f5543f' : '#c4c4c4';
    }
  }, [isPhone, props]);

  if (props.errorMessage) inputClassNames.push('text-field-input-error');
  if (!props.icon) inputClassNames.push('text-field-input-no-icon');

  return (
    <div className="text-field" style={props.style}>
      {!isPhone && (
        <label
          className={`text-field-label ${
            isFocus || (isDatePicker && selectedDate) || props.value
              ? 'text-field-label-hidden'
              : ''
          } ${!props.icon ? 'text-field-label-no-icon' : ''}`}
        >
          {props.label}
        </label>
      )}
      {isSelect ? (
        <TextFieldSelect
          name={props.name}
          label={props.label}
          value={props.value}
          onSelect={props.onChange}
          className={inputClassNames.join(' ')}
        />
      ) : isPhone ? (
        <PhoneInputWithCountrySelect
          placeholder={t('tour_order_form_phone')}
          value={props.value}
          onChange={(e) => {
            if (e) {
              props.onChange({
                target: { name: props.name, value: e },
              });
            }
          }}
          autoComplete="off"
          className="input-phone-number"
          international
        />
      ) : (
        <input
          className={inputClassNames.join(' ') + (props.className || '')}
          type={isDatePicker ? 'text' : props.type}
          name={props.name}
          value={
            isDatePicker
              ? selectedDate
                ? getFormat(selectedDate)
                : ''
              : props.value
          }
          onChange={(e) => {
            props.onChange(
              isDatePicker
                ? {
                    target: {
                      name: 'date',
                      value: selectedDate ? selectedDate.toISOString() : '',
                    },
                  }
                : e,
            );
          }}
          style={{ fontSize: props.type === 'password' ? 26 : 18 }}
          ref={inputRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete="off"
        />
      )}
      {props.icon && (
        <Image
          width={24}
          height={24}
          className="text-field-img"
          src={props.icon}
          alt="img"
        />
      )}
      {props.errorMessage && (
        <span
          className="text-field-span"
          style={{ fontSize: props.errorMessageSize }}
        >
          {props.required &&
          (props.errorMessage?.includes('required') || isSelect)
            ? 'The text field is required.'
            : props.errorMessage}
        </span>
      )}

      {isDatePicker && (
        <div
          onClick={() => setIsFocus(true)}
          className={`day-picker ${isFocus ? '' : 'day-picker-hide'}`}
        >
          <DayPicker
            onDayClick={(_, __, e) => {
              e.stopPropagation();
              setIsFocus(false);
            }}
            mode="single"
            showOutsideDays
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiersClassNames={{
              disabled: 'my-disabled',
              selected: 'my-selected',
              today: 'my-today',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TextField;
