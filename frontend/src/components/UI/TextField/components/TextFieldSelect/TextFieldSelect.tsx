import React, { useEffect, useState } from 'react';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { useAppSelector } from '@/store/hooks';
import { selectOneTour } from '@/containers/tours/toursSlice';
import Select from 'react-select';
import '@/styles/TextFieldSelect.css';

interface Props {
  name: string;
  label?: string;
  value: string;
  onSelect: (e: IChangeEvent) => void;
  className?: string;
}

interface ISelectGuide {
  value: string;
  label: string;
}

const TextFieldSelect: React.FC<Props> = (props) => {
  const tour = useAppSelector(selectOneTour);

  const [guides, setGuides] = useState<ISelectGuide[]>([]);

  useEffect(() => {
    if (!guides.length && tour) {
      setGuides(
        tour.guides.map((guide) => ({
          label: guide.user.displayName,
          value: guide._id,
        })),
      );
    }
  }, [guides, tour]);

  return (
    tour && (
      <Select
        className={`text-field-select ${props.className}`}
        options={guides}
        value={guides.find((option) => option.value === props.value)}
        onChange={(newValue) =>
          newValue &&
          props.onSelect({
            target: { name: props.name, value: newValue.value },
          })
        }
        placeholder={props.label}
        name={props.name}
      />
    )
  );
};

export default TextFieldSelect;
