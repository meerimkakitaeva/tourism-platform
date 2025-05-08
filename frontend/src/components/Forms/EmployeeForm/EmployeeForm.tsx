import React, { useState } from 'react';
import { IEmployeeMutation } from '@/type';
import { useAppDispatch } from '@/store/hooks';
import { useSelector } from 'react-redux';
import { selectPostTourError } from '@/containers/tours/toursSlice';
import { useRouter } from 'next/router';
import { editEmployees, postEmployees } from '@/containers/about/aboutThunk';
import FileInput from '@/components/UI/FileInput/FileInput';
import { addEmployee } from '@/containers/about/aboutSlice';
import '@/styles/SignInForm.css';
import '@/styles/admin-buttons.css';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import { useTranslations } from 'next-intl';

interface Props {
  existingEmployee?: IEmployeeMutation;
  isEdit?: boolean;
  idEmployee?: string;
}

const initialState = {
  name: '',
  number: '',
  role: '',
  image: null,
};
const EmployeeForm: React.FC<Props> = ({
  isEdit,
  existingEmployee = initialState,
  idEmployee,
}) => {
  const dispatch = useAppDispatch();
  const error = useSelector(selectPostTourError);
  const routers = useRouter();
  const [state, setState] = useState<IEmployeeMutation>(existingEmployee);
  const a = useTranslations('alert');
  const t = useTranslations('employees');
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && idEmployee) {
        const obj = {
          id: idEmployee,
          employeeMutation: state,
        };
        await dispatch(editEmployees(obj)).unwrap();
        dispatch(addEmployee(state));
        routers.push('/admin/employees/all').then((r) => r);
      } else {
        await dispatch(postEmployees(state)).unwrap();
      }
      routers.push('/admin/employees/all').then((r) => r);
    } catch (e) {
      alert(a('invalid_field'));
    }
  };

  const getFieldError = (name: string) => {
    try {
      return error?.errors[name].message;
    } catch {
      return undefined;
    }
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  return (
    <form className="form-employees" onSubmit={submitFormHandler}>
      <h2 className="form-employees-title">
        {isEdit ? t('save_title') : t('create_title')}
      </h2>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('name') ? 'form-control-error' : 'form-control'
          }
          name="name"
          id="name"
          value={state.name}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="name" className="form-label">
          {t('name')}:
        </label>
        {Boolean(getFieldError('name')) && (
          <span className="error">{getFieldError('name')}</span>
        )}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('number') ? 'form-control-error' : 'form-control'
          }
          name="number"
          id="number"
          value={state.number}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="number" className="form-label">
          {t('number')}:
        </label>
        {Boolean(getFieldError('number')) && (
          <span className="error">{getFieldError('number')}</span>
        )}
      </div>
      <div className="input-wrap">
        <input
          type="text"
          className={
            getFieldError('role') ? 'form-control-error' : 'form-control'
          }
          name="role"
          id="role"
          value={state.role}
          onChange={inputChangeHandler}
          required
        />
        <label htmlFor="role" className="form-label">
          {t('role')}:
        </label>
        {Boolean(getFieldError('role')) && (
          <span className="error">{getFieldError('role')}</span>
        )}
      </div>
      <div className="input-wrap">
        <label className="form-label-avatar avatar" htmlFor="image">
          {t('image')}
        </label>
        <FileInput
          onChange={changeFileValue}
          name="image"
          image={state.image}
          className="form-control"
        />
      </div>
      <div className="form-wrap-btn">
        <button
          type="submit"
          className="admin-button admin-button-edit"
          style={{ width: '100%' }}
        >
          {isEdit ? t('save_btn') : t('create_btn')}
          <AdminIcon type="save" />
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
