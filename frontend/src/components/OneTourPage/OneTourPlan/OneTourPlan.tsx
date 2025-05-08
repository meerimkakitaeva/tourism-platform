import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useAppSelector } from '@/store/hooks';
import '@/styles/OneTourPlan.css';

const OneTourPlan = () => {
  const tourPlan = useAppSelector((state) => state.tours.tour?.plan);
  const [selectedDay, setSelectedDay] = useState('');

  const onDayClick = (id: string) => {
    if (selectedDay === id) {
      return setSelectedDay('');
    }
    setSelectedDay(id);
  };

  return (
    <Fade>
      <div className="one-tour-plan">
        <div className="one-tour-plan-list">
          {tourPlan?.map((planDay) => (
            <div
              className="plan-day"
              key={planDay._id}
              onClick={() => onDayClick(planDay._id)}
            >
              <div className="plan-day-checkbox">
                <div
                  className={`plan-day-checkbox-inner ${
                    selectedDay === planDay._id && 'plan-day-checkbox-checked'
                  }`}
                />
              </div>
              <div className="plan-day-body">
                {tourPlan[tourPlan?.length - 1]._id !== planDay._id && (
                  <div className="plan-day-body-arrow" />
                )}
                <span className="plan-day-title">{planDay.title}</span>
                <span
                  className={`plan-day-description ${
                    selectedDay === planDay._id
                      ? ''
                      : 'plan-day-description-hidden'
                  }`}
                >
                  {planDay.planDescription}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fade>
  );
};

export default OneTourPlan;
