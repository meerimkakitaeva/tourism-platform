import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addAlert, selectUser } from '@/containers/users/usersSlice';
import { Fade } from 'react-awesome-reveal';
import { createGuideRating } from '@/containers/ratings/ratingThunk';
import {
  createGuideReview,
  fetchGuideReviews,
} from '@/containers/reviews/reviewThunk';
import { useTranslations } from 'next-intl';
import '@/styles/newReviewForm.css';

interface IProps {
  guideReview: boolean;
}

interface IPostReview {
  comment: string;
  rating: number;
}

const NewReview: React.FC<IProps> = ({ guideReview }) => {
  const { id } = useParams() as {
    id: string;
  };
  const [state, setState] = useState<IPostReview>({
    comment: '',
    rating: 5,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const t = useTranslations('guide');
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
    if (!user) return;

    try {
      if (guideReview) {
        await dispatch(
          createGuideRating({
            user: user._id,
            rating: state.rating,
            guide: id,
          }),
        ).unwrap();
        await dispatch(
          createGuideReview({
            user: user._id,
            comment: state.comment,
            guide: id,
          }),
        ).unwrap();
        dispatch(fetchGuideReviews(id));
      }

      dispatch(addAlert({ message: a('review_send'), type: 'info' }));
      setState({
        comment: '',
        rating: 5,
      });
    } catch (e) {
      // nothing
    }
  };

  return (
    <Fade>
      <h3 className="review-form-title">{t(`write_review`)}</h3>
      <form className="review-form" onSubmit={onSubmit}>
        <div className="tour-rating-range">
          <span>{t(`rating`)}</span>
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
            placeholder={t(`comment`)}
            onChange={onChange}
            value={state.comment}
            name="comment"
            required
          />
        </div>
        <button type="submit">{t(`send_review`)}</button>
      </form>
    </Fade>
  );
};

export default NewReview;
