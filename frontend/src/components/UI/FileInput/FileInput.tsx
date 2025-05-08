import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import '@/styles/FileInput.css';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  image?: File | null;
  className?: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, image, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>('');
  const t = useTranslations('inputs');

  useEffect(() => {
    if (image === null) {
      setFilename('');
    }
  }, [image]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div className={'file-input ' + className}>
        <input
          id={name}
          style={{ display: 'none' }}
          type="file"
          name={name}
          onChange={onFileChange}
          ref={inputRef}
        />

        <h6 className="file-input-label">{filename}</h6>
      </div>
      <button type="button" onClick={activateInput} className="file-input-btn">
        {t('file_input_btn')}
      </button>
    </>
  );
};

export default FileInput;
