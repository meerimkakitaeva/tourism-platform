import React, { useRef, useEffect } from 'react';
import {
  IgrGeographicMapModule,
  IgrGeographicSymbolSeriesModule,
} from 'igniteui-react-maps';
import { IgrGeographicMap } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';
import '@/styles/Map.css';

IgrGeographicSymbolSeriesModule.register();
IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

interface Props {
  country: string;
}

const Map: React.FC<Props> = ({ country }) => {
  const geographicMapRef = useRef<IgrGeographicMap>(null);

  useEffect(() => {
    if (geographicMapRef.current) {
      // Add your location logic here
      // Example: Set the initial location
      geographicMapRef.current.zoomToGeographic({
        left: 69.2,
        top: 39.2,
        width: 10,
        height: 4,
      });
    }
  }, []);

  return (
    <div className="one-tour-map">
      <h2>Location: {country}</h2>
      <IgrGeographicMap
        width="1000px"
        height="500px"
        zoomable="true"
        ref={geographicMapRef}
      />
    </div>
  );
};

export default Map;
