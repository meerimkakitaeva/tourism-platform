import React, { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectAdminGuides } from '@/containers/guides/guidesSlice';
import { fetchAdminGuides } from '@/containers/guides/guidesThunk';

interface Props {
  name: string;
  label?: string;
  selectedGuideIds: string[];
  onSelect: (selectedGuideIds: string[]) => void;
  isSubmit?: boolean;
}

interface IOption {
  value: string;
  label: string;
}

const TextFieldSelect: React.FC<Props> = (props) => {
  const guides = useAppSelector(selectAdminGuides);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdminGuides());
  }, [dispatch]);

  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    if (guides && !options.length) {
      setOptions(
        guides.map((guide) => ({
          value: guide._id,
          label: guide.user.displayName,
        })),
      );
    }
  }, [guides, options.length]);

  // @ts-ignore
  const handleSelectChange = (selectedOptions: MultiValue<IOption, true>) => {
    const selectedValues = (selectedOptions as IOption[]).map(
      (option) => option.value,
    );

    props.onSelect(selectedValues);
  };

  return (
    <Select
      className={`text-field-select text-field-input-guides`}
      options={options}
      value={options.filter((option) =>
        props.selectedGuideIds.includes(option.value),
      )}
      onChange={handleSelectChange}
      placeholder={props.label}
      name={props.name}
      required
      isMulti
    />
  );
};

export default TextFieldSelect;
