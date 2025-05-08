import React, { FormEvent, useEffect, useState } from 'react';
import PageLoader from '@/components/Loaders/PageLoader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLightMode } from '@/containers/config/configSlice';
import {
  deleteContact,
  editContacts,
  editContactsImage,
  fetchContacts,
} from '@/containers/contacts/contactsThunk';
import {
  selectContacts,
  selectEditContactsLoading,
} from '@/containers/contacts/contactsSlice';
import { IContactInfo, IContactsMutation } from '@/type';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { AxiosError } from 'axios';
import { apiUrl, userRoles } from '@/constants';
import TextField from '@/components/UI/TextField/TextField';
import peopleIcon from '@/assets/images/people-icon.svg';
import penIcon from '@/assets/images/pen-icon.svg';
import ButtonLoader from '@/components/Loaders/ButtonLoader';
import Image from 'next/image';
import FileInput from '@/components/UI/FileInput/FileInput';
import { GetServerSideProps } from 'next';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import AdminIcon from '@/components/UI/AdminIcon/AdminIcon';
import '@/styles/contactUs.css';

const ContactUs = () => {
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(selectContacts);
  const user = useAppSelector(selectUser);
  const editContactsLoading = useAppSelector(selectEditContactsLoading);
  const [editModalTitle, setEditModalTitle] = useState<boolean>(false);
  const [editModalInfo, setEditModalInfo] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<IContactInfo>({
    _id: '',
    country: '',
    address: '',
    phone: '',
  });
  const [contactInfo, setContactInfo] = useState<IContactInfo[]>(
    contacts?.contact || [{ country: '', address: '', phone: '', _id: '' }],
  );
  const [state, setState] = useState<IContactsMutation>({
    title: '',
    description: '',
    image: null,
    contact: contactInfo,
  });
  const [selectedCountryIndex, setSelectedCountryIndex] = useState<
    number | null
  >(null);
  const admin = user && user.role === userRoles.admin;
  const t = useTranslations('contact_us');
  const a = useTranslations('about');
  const metaT = useTranslations('metaTags');

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(setIsLightMode(false));
  }, [dispatch]);

  useEffect(() => {
    if (contacts) {
      setState({
        ...contacts,
        image: null,
      });
    }
  }, [contacts]);

  useEffect(() => {
    if (contacts?.contact) {
      setContactInfo(contacts.contact);
    }
  }, [contacts]);
  const onChange = (e: IChangeEvent) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      state.contact = contactInfo;
      state.image
        ? await dispatch(editContactsImage({ image: state.image })).unwrap()
        : null;
      await dispatch(editContacts(state)).unwrap();
      await dispatch(fetchContacts());
      setEditModalTitle(false);
      setEditModalInfo(false);
      dispatch(addAlert({ message: a('changes_saved'), type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: a('error'), type: 'error' }));
      }
    }
  };

  const onSubmitInfo = async (e?: FormEvent) => {
    e?.preventDefault();
    try {
      await dispatch(
        editContacts({
          ...state,
          contact: contactInfo,
        }),
      ).unwrap();

      await dispatch(fetchContacts());
      setEditModalTitle(false);
      setEditModalInfo(false);
      dispatch(addAlert({ message: a('changes_saved'), type: 'info' }));
    } catch (e) {
      if (e instanceof AxiosError) {
        dispatch(addAlert({ message: a('error'), type: 'error' }));
      }
    }
  };

  const onClickCountryInfo = (contact: IContactInfo, index: number) => {
    if (!admin) return;
    setSelectedCountryIndex(index);
    setEditContact(contact);
    setEditModalInfo(true);
  };
  const inputChangeHandlerMassive = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    const { name, value } = event.target;

    setContactInfo((prevState) => {
      const updatedInfo = [...prevState];
      updatedInfo[index] = {
        ...updatedInfo[index],
        [name]: value,
      };
      return updatedInfo;
    });
    setEditContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addOneItem = () => {
    const newContact = { country: '', address: '', phone: '' };
    const updatedInfo = [...contactInfo, newContact];

    setContactInfo(updatedInfo);
    setSelectedCountryIndex(updatedInfo.length - 1);
    setEditModalInfo(true);
    setEditContact({
      _id: '',
      country: '',
      address: '',
      phone: '',
    });
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

  const contactDeleteHandler = async (id: string) => {
    await dispatch(deleteContact(id));
    void dispatch(fetchContacts());
    setEditModalTitle(false);
    setEditModalInfo(false);
  };

  return (
    <>
      <Head>
        <title>{metaT('contact_us')}</title>
        <meta name="description" content="Contact us page" />
      </Head>
      <div className="contacts-page">
        <PageLoader />
        <div
          className={`editor-modal ${editModalInfo ? 'editor-modal-open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setEditModalInfo(false);
            setEditContact({
              _id: '',
              country: '',
              address: '',
              phone: '',
            });
          }}
        >
          {selectedCountryIndex !== null && (
            <div
              className="editor-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={onSubmitInfo}>
                <h2 style={{ margin: '10px 0' }}>
                  {editContact.country ? t('edit_info') : t('create_info')}
                </h2>
                <div className="input-tour-wrap">
                  <input
                    type="text"
                    className="form-tour-control"
                    style={{ margin: 0 }}
                    name={`country`}
                    id={`country`}
                    value={editContact?.country}
                    onChange={(event) =>
                      inputChangeHandlerMassive(event, selectedCountryIndex)
                    }
                    required
                  />
                  <label htmlFor={`country`} className="form-tour-label">
                    {t('contact_country_field')}
                  </label>
                </div>
                <div className="input-tour-wrap">
                  <input
                    type="text"
                    className="form-tour-control"
                    style={{ margin: 0 }}
                    name={`address`}
                    id={`address`}
                    value={editContact?.address}
                    onChange={(event) =>
                      inputChangeHandlerMassive(event, selectedCountryIndex)
                    }
                    required
                  />
                  <label htmlFor={`address`} className="form-tour-label">
                    {t('contact_address_field')}
                  </label>
                </div>
                <div className="input-tour-wrap">
                  <input
                    type="text"
                    className="form-tour-control"
                    style={{ margin: 0 }}
                    name={`phone`}
                    id={`phone`}
                    value={editContact?.phone}
                    onChange={(event) =>
                      inputChangeHandlerMassive(event, selectedCountryIndex)
                    }
                    required
                  />
                  <label htmlFor={`phone`} className="form-tour-label">
                    {t('contact_phone_field')}
                  </label>
                </div>
                <div className="form-contact-buttons">
                  <button
                    type="submit"
                    className="admin-button admin-button-edit"
                    style={{ margin: 0 }}
                    name="contacts-title-edit-btn"
                  >
                    {editContactsLoading ? (
                      <ButtonLoader size={18} />
                    ) : (
                      t('save')
                    )}
                    <AdminIcon type="save" />
                  </button>

                  {editContact._id && (
                    <button
                      type="button"
                      className="admin-button admin-button-outline admin-button-delete"
                      onClick={() => {
                        if (!editContact?._id) return;
                        void contactDeleteHandler(editContact._id);
                      }}
                      name="delete-contact-info"
                    >
                      <AdminIcon type="delete" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="contacts-top">
          <Image
            fill
            src={apiUrl + '/' + contacts?.image}
            alt="nature"
            className="contacts-main-img"
          />
          <div className="contacts-top-info">
            <div className="contacts-top-line"></div>
            <p className="contacts-top-title">
              {contacts && contacts.title ? contacts.title : 'Contact Us'}
              {admin && (
                <button
                  className="icon-container-edit-contacts"
                  onClick={() => setEditModalTitle(true)}
                  style={{ background: 'none' }}
                  name="main"
                >
                  <Image
                    src={penIcon}
                    alt="Pen Icon"
                    width={20}
                    height={20}
                    className="icon-edit"
                  />
                </button>
              )}
            </p>
            {contacts && contacts.description ? (
              <p className="contacts-top-txt">{contacts.description}</p>
            ) : null}
          </div>
        </div>
        <div className="contacts-page-location">
          <div className="container">
            <div className="contacts-card-main">
              {contacts &&
                contacts.contact &&
                contacts.contact.map((contact, index) => (
                  <div
                    className="contacts-card"
                    key={index}
                    onClick={() => onClickCountryInfo(contact, index)}
                  >
                    {contact.country ? (
                      <span className="contacts-country">
                        {contact.country || '-'}
                      </span>
                    ) : null}
                    {contact.address ? (
                      <span className="contacts-location">
                        {contact.address || '-'}
                      </span>
                    ) : null}
                    {contact.phone ? (
                      <span className="contacts-phone">
                        {contact.phone || '-'}
                      </span>
                    ) : null}
                  </div>
                ))}
            </div>

            {admin && (
              <div
                className="add-info"
                onClick={() => {
                  if (!contactInfo || contactInfo.length <= 0) {
                    setContactInfo((prevState) => [
                      ...prevState,
                      { country: '', address: '', phone: '' },
                    ]);
                  } else {
                    addOneItem();
                  }
                  setEditModalInfo(true);
                }}
              >
                +
              </div>
            )}
          </div>
        </div>

        <div
          className={`editor-modal ${
            editModalTitle ? 'editor-modal-open' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setEditModalTitle(false);
          }}
        >
          <div
            className="editor-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={onSubmit}>
              <h2>{t('banner_form_title')}</h2>
              <TextField
                name="title"
                type="text"
                value={state.title}
                onChange={onChange}
                icon={peopleIcon.src}
                label={t('banner_title_field')}
                required
              />
              <TextField
                name="description"
                type="text"
                value={state.description}
                onChange={onChange}
                icon={penIcon.src}
                label={t('banner_title_field')}
                required
              />
              <div
                className="input-wrap"
                style={{ marginTop: 20, marginBottom: 0 }}
              >
                <label className="form-label-avatar avatar" htmlFor="image">
                  {t('banner_image_field')}
                </label>
                <FileInput
                  onChange={changeFileValue}
                  name="image"
                  image={state.image}
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="admin-button admin-button-edit"
                style={{ width: '100%' }}
                name="contacts-title-edit-btn"
              >
                {editContactsLoading ? <ButtonLoader size={18} /> : t('save')}
                <AdminIcon type="save" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (
        await import(`../../public/locales/${locale}/translation.json`)
      ).default,
    },
  };
};
