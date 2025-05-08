import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { tourReview } from '@/containers/tours/toursThunk';
import { fetchToursReviews } from '@/containers/reviews/reviewThunk';
import { useTranslations } from 'next-intl';
import '@/styles/newReviewForm.css';

interface IPostReview {
  tour: string;
  comment: string;
  rating: number;
}

const NewReviewForm = () => {
  const { id } = useParams() as {
    id: string;
  };
  const [state, setState] = useState<IPostReview>({
    tour: '',
    comment: '',
    rating: 5,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const t = useTranslations('oneTour');
  const a = useTranslations('alert');

  const onRatingClick = (number: number) => {
    setState((prevState) => ({
      ...prevState,
      rating: number,
    }));
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!user) return;
      await dispatch(
        tourReview({
          ...state,
          user: user._id,
          tour: id,
        }),
      ).unwrap();
      dispatch(addAlert({ message: a('review_send'), type: 'info' }));
      setState({
        tour: '',
        comment: '',
        rating: 5,
      });
      dispatch(fetchToursReviews(id));
    } catch {
      // nothing
    }
  };

  return (
    <Fade>
      <h3 className="review-form-title">{t('tour_review_form_title')}</h3>
      <form className="review-form" onSubmit={onSubmit}>
        <div className="tour-rating-range">
          <span>{t('tour_review_form_rating')}</span>
          <div className="tour-rating-stars">
            <span
              className={`star-icon ${state.rating >= 1 && 'rated-star'}`}
              onClick={() => onRatingClick(1)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 2 && 'rated-star'}`}
              onClick={() => onRatingClick(2)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 3 && 'rated-star'}`}
              onClick={() => onRatingClick(3)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 4 && 'rated-star'}`}
              onClick={() => onRatingClick(4)}
            >
              &#9733;
            </span>
            <span
              className={`star-icon ${state.rating >= 5 && 'rated-star'}`}
              onClick={() => onRatingClick(5)}
            >
              &#9733;
            </span>
          </div>
        </div>
        <div className="review-form-textarea">
          <textarea
            className="review-form-input"
            placeholder={t('tour_review_form_placeholder')}
            onChange={onChange}
            value={state.comment}
            name="comment"
            required
          />
        </div>
        <button type="submit">{t('tour_review_form_button')}</button>
      </form>
    </Fade>
  );
};

export default NewReviewForm;
