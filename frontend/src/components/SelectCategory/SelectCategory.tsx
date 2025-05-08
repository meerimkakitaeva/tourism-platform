import React from 'react';
import { apiUrl } from '@/constants';
import '@/styles/selectCategory.css';

interface IProps {
  type: string;
  colorValue?: string;
  markerValue?: { src: string; type: string };
  onMarkerSelect: (
    routeIndex: number,
    checkpointId: string,
    markerCategory: {
      src: string;
      type: string;
    },
  ) => void;
  onColorSelect: (routeIndex: number, markerCategory: string) => void;
  routeIndex: number;
  checkpointId?: string;
  selected: boolean;
  onToggle: () => void;
  colorCategories: string[];
  markerCategories: {
    src: string;
    type: string;
  }[];
}

const SelectCategory: React.FC<IProps> = ({
  type,
  colorValue,
  markerValue,
  onColorSelect,
  onMarkerSelect,
  routeIndex,
  checkpointId,
  selected,
  onToggle,
  colorCategories,
  markerCategories,
}) => {
  return (
    <div
      className="select-category"
      onClick={(e) => {
        e.stopPropagation();
        void onToggle();
      }}
      style={{
        backgroundImage:
          type === 'markers'
            ? `url(${apiUrl + '/' + (markerValue ? markerValue.src : '')})`
            : 'unset',
        margin: type === 'markers' ? '' : '0 20px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '20px',
          left: '10px',
          width: '20px',
          height: '20px',
          backgroundColor: colorValue,
        }}
        className="route-color-marker"
      />
      <span>
        {(markerValue && markerValue.type) || (colorValue && colorValue)}
      </span>
      <span className="select-category-arrow">
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
          className="css-tj5bde-Svg"
        >
          <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
      </span>
      {selected && (
        <div className="marker-categories">
          {(type === 'markers' ? markerCategories : colorCategories).map(
            (category, index) => (
              <span
                className="marker-category"
                key={index}
                onClick={() => {
                  if (typeof category === 'string') {
                    onColorSelect(routeIndex, category);
                  } else {
                    onMarkerSelect(routeIndex, checkpointId || '', category);
                  }
                }}
                style={{
                  backgroundImage:
                    type === 'markers'
                      ? `url(${
                          apiUrl +
                          '/' +
                          (typeof category === 'string' ? '' : category.src)
                        }`
                      : 'unset',
                  backgroundColor: type === 'markers' ? '' : 'inherit',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '15px',
                    left: '10px',
                    width: '20px',
                    height: '20px',
                    backgroundColor:
                      typeof category === 'string' ? category : '',
                  }}
                  className="marker-color-element"
                />
                {typeof category === 'string' ? category : category.type}
              </span>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
