import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchToursByFilter } from '@/containers/tours/toursThunk';
import magnifierIcon from '@/assets/images/magnifier.svg';
import { useParams } from 'next/navigation';
import TextField from '@/components/UI/TextField/TextField';
import calendarOrderIcon from '../../assets/images/calendar-icon.svg';
import { IChangeEvent } from '@/components/OneTourOrderForm/OneTourOrderForm';
import Image from 'next/image';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';

const categoriesData = [
  { id: 'checkbox-1', label: 'history' },
  { id: 'checkbox-2', label: 'budget' },
  { id: 'checkbox-3', label: 'popular' },
  { id: 'checkbox-4', label: 'vacation' },
  { id: 'checkbox-5', label: 'exotic' },
];

type TCurrentTab = 'location' | 'categories' | 'min' | 'max';

const TourFilter = () => {
  const params = useParams() as { pageNum: string };
  const limitTours = 6;
  const t = useTranslations('filter');
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [date, setDate] = useState('');
  const [currentTab, setCurrentTab] = useState<TCurrentTab | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (params) {
      setCurrentPage(parseInt(params.pageNum));
    }
  }, [params]);

  const indexOfLastRecord = currentPage * limitTours;
  const indexOfFirstRecord = indexOfLastRecord - limitTours;

  const fetchByType = async () => {
    dispatch(
      fetchToursByFilter({
        date,
        location: searchTerm,
        categories: selectedCategories,
        skip: indexOfFirstRecord,
        limit: limitTours,
      }),
    );
  };

  const toggleCategory = async (label: string) => {
    const updatedCategories = selectedCategories.includes(label)
      ? selectedCategories.filter((value) => value !== label)
      : [...selectedCategories, label];

    setSelectedCategories(updatedCategories);
  };

  const filterRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentTab === 'location' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentTab]);

  const handleDateChange = (e: IChangeEvent) => {
    setDate(format(new Date(e.target.value), 'dd/MM/yyyy'));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setCurrentTab(null);
        setShowCategories(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <section className="section-filter" ref={filterRef}>
      <ul className="filters-list">
        <li
          className="tab-filter"
          onClick={(e) => {
            e.stopPropagation();
            setCurrentTab('location');
          }}
        >
          <button
            className={`${
              currentTab === 'location'
                ? 'filter-input filter-active'
                : 'filter-link'
            }`}
          >
            <span className="icon-filter"></span>
            {currentTab === 'location' ? (
              <input
                ref={inputRef}
                type="text"
                placeholder={t('location')}
                className={`filter-link input-filter-name ${
                  currentTab === 'location' ? 'filter-active' : ''
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            ) : (
              <span
                style={{ textTransform: searchTerm ? 'initial' : 'uppercase' }}
              >
                {searchTerm || t('location')}
              </span>
            )}
          </button>
        </li>
        <li
          className="tab-filter"
          onClick={() => {
            if (date) {
              setDate('');
            }
          }}
        >
          <TextField
            name="date"
            label={t('date')}
            type="date"
            value={date}
            onChange={handleDateChange}
            icon={calendarOrderIcon}
          />
        </li>
        <li className="tab-filter tab-category">
          <button
            className={`filter-link ${
              currentTab === 'categories' ? 'filter-active' : ''
            }`}
            onClick={() => {
              setCurrentTab('categories');
              setShowCategories(!showCategories);
            }}
          >
            <span className="icon-filter"></span>
            <span>{t('categories')}</span>
          </button>

          {showCategories ? (
            <div className="categories-filter">
              <div className="categories-filter-inner">
                <div className="form-wrap mt-md-30">
                  <ul className="list-sm">
                    {categoriesData.map((category) => (
                      <li key={category.id}>
                        <label className="checkbox-inline">
                          <input
                            name={category.label}
                            value={category.label}
                            type="checkbox"
                            className="checkbox-custom"
                            checked={selectedCategories.includes(
                              category.label,
                            )}
                            onChange={() => toggleCategory(category.label)}
                          />
                          <span className="checkbox-custom-dummy"></span>
                          {t(category.label)}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </li>
        <button className="filter-btn" onClick={fetchByType}>
          <Image
            width={16}
            height={16}
            src={magnifierIcon.src}
            alt="magnifier-icon"
          />
          {t('search')}
        </button>
      </ul>
    </section>
  );
};

export default TourFilter;
