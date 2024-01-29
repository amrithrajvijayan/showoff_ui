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
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{widget.name}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{widget.description}</td>
            </tr>
            <tr>
              <td>Status</td>
              <td>{widget.status ? 'true' : 'false'}</td>
            </tr>
            <tr>
              <td>Created At</td>
              <td>{Moment(widget.created_at).format('LLLL')}</td>
            </tr>
          </tbody>
        </table>
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
