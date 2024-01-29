import './widgets.css';
import React, { useState, useEffect } from 'react';
import WidgetInfo from '../models/WidgetInfoInterface';
import { fetchAllWidgets } from '../services/apiService';
import Moment from 'moment';

function ActiveWidgets() {

  const [data, setData] = useState([]);

  Moment.locale('en');

  useEffect(() => {
    fetchAllWidgets()
      .then(response => response.json())
      .then(json => {
        setData(json)
      })
      .catch(error => {
        console.log(error)
      });
  }, []);


  const widgets = data.filter((widget: WidgetInfo) => {
    return widget.status === true;
  }).map((widget: WidgetInfo) => {
    return (
      <div className='child shadow' key={widget.id}>
        <div className="widget-header-text"><b>Widget {widget.id}</b></div>

        <div className="container">
          <div className="row">
            <div className="left">
              <p>Name: </p>
            </div>
            <div className="right">
              <p><b>{widget.name}</b></p>
            </div>
          </div>

          <div className="row">
            <div className="left">
              <p>Description: </p>
            </div>
            <div className="right">
              <p><b>{widget.description}</b></p>
            </div>
          </div>


          <div className="row">
            <div className="left">
              <p>Created At: </p>
            </div>
            <div className="right">
              <p><b>{widget.created_at}</b></p>
            </div>
          </div>


        </div>

      </div>
    );
  })

  return (
    <React.Fragment>
      <div className='master-div'>
        <h2>Available Widgets</h2>
        <div className='parent'>
          {widgets}
        </div>
      </div>
    </React.Fragment>

  );
}

export default ActiveWidgets;
