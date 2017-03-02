import React from 'react';
import Map from '../containers/GoogleMapContainer';
import Search from './meetupSearchBar';
import EventList from './MeetupEventsList';

const Dashboard = () =>
  (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>{'PlaceHolder'}</h2>
      </div>
      <div className="row">
        <div className="column dashboard-side">
          <Search className="meetup-search" />
          <EventList className="meetup-list" />
        </div>
        <Map />
      </div>
    </div>
  );

export default Dashboard;
