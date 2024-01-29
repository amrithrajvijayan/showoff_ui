import React, { useState, useEffect } from 'react';

import './widgets.css';
import WidgetInfo from '../models/WidgetInfoInterface';
import { fetchAllWidgets, enableDisableWidget, deleteWidget, createWidget, updateWidget } from '../services/apiService';
import Moment from 'moment';

function ManageWidgets() {

  const [data, setData] = useState([]);
  const [showNewWidgetUI, setShowNewWidgetUI] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetDescription, setWidgetDescription] = useState('');
  const [id, setId] = useState(0);
  const [message, setMessage] = useState('');
  const [showEditOption, setShowEditOption] = useState(false);
  const [widgetToSave, setWidgetToSave] = useState({
    id: 0,
    name: '',
    description: '',
    status: false
  });

  Moment.locale('en');

  useEffect(() => {
    fetchAllWidgets()
      .then(response => response.json())
      .then(json => {
        let maxId = 0;
        json.forEach((e: WidgetInfo) => {
          maxId = Math.max(maxId, e.id);
        });
        setId(maxId);
        setData(json)
      })
      .catch(error => console.error(error));
  }, []);


  function refreshWidgetsInfo() {
    fetchAllWidgets()
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }

  function showCreateNewWidgetForm() {
    setWidgetName('');
    setWidgetDescription('');
    setShowNewWidgetUI(true);
    setShowEditOption(false);
  }

  function closeWidgetForms() {
    setWidgetName('');
    setWidgetDescription('');
    setShowNewWidgetUI(false);
    setShowEditOption(false);
  }

  function showMessage(message: string) {
    setMessage(message);
    setTimeout(() => setMessage(''), 5000);
  }

  function saveWidget() {
    if (widgetName.length === 0 || widgetDescription.length === 0) {
      showMessage("Please provide required inputs");
    } else {
      const newWidget: WidgetInfo = {
        id: widgetToSave.id,
        name: widgetName,
        description: widgetDescription,
        status: widgetToSave.status ?? false,
      }
      updateWidget(newWidget).then((response) => {
        refreshWidgetsInfo();
        showMessage("Widget updated successfully");
      })
      setShowNewWidgetUI(false);
      setShowEditOption(false);
    }
  }

  function addNewWidget() {
    if (widgetName.length === 0 || widgetDescription.length === 0) {
      showMessage("Please provide required inputs");
    } else {
      const newWidget: WidgetInfo = {
        id: id + 1,
        name: widgetName,
        description: widgetDescription,
        status: true,
      }
      setId(id + 1);
      createWidget(newWidget).then((response) => {
        refreshWidgetsInfo();
        showMessage("Widget created successfully");
      })
      setShowNewWidgetUI(false);
    }
  }

  function edit(widget: WidgetInfo) {
    setWidgetName(widget.name);
    setWidgetDescription(widget.description);
    setWidgetToSave(widget);
    setShowEditOption(true);
    setShowNewWidgetUI(false);
  }

  function performAction(targetOp: string, widget: WidgetInfo) {
    setShowNewWidgetUI(false);
    setShowEditOption(false);

    switch (targetOp) {
      case 'disable': {
        enableDisableWidget(widget, false).then(() => refreshWidgetsInfo());
        break;
      }
      case 'enable': {
        enableDisableWidget(widget, true).then(() => refreshWidgetsInfo());
        break;
      }
      case 'delete': {
        deleteWidget(widget).then(() => {
          refreshWidgetsInfo()
          showMessage("Widget deleted successfully");
        });
        break;
      }
      case 'edit': {
        edit(widget);
      }
    }
  }

  const activeWidgetsTableRows = data.filter((widget: WidgetInfo) => {
    return widget.status === true;
  }).map((widget: WidgetInfo) => {
    return (
      <tr key={widget.id}>
        <td width='10%'>{widget.name}</td>
        <td width='30%'>{widget.description}</td>
        <td width='30%'>{Moment(widget.created_at).format('LLLL')}</td>
        <td width='20%'>
          <button onClick={() => performAction('disable', widget)}>Disable</button> &nbsp;
          <button onClick={() => performAction('edit', widget)}>Edit</button> &nbsp;
          <button onClick={() => performAction('delete', widget)}>Delete</button>
        </td>
      </tr>
    );
  })

  const disabledTableRows = data.filter((widget: WidgetInfo) => {
    return widget.status === false;
  }).map((widget: WidgetInfo) => {
    return (
      <tr key={widget.id}>
        <td width='10%'>{widget.name}</td>
        <td width='30%'>{widget.description}</td>
        <td width='30%'>{Moment(widget.created_at).format('LLLL')}</td>
        <td width='20%'>
          <button onClick={() => performAction('enable', widget)}>Enable</button> &nbsp;
          <button onClick={() => performAction('edit', widget)}>Edit</button> &nbsp;
          <button onClick={() => performAction('delete', widget)}>Delete</button>
        </td>
      </tr>
    );
  });


  const newWidgetCompnent = showNewWidgetUI ? (
    <div className="newWidgetDiv">
      <table border={1} width="50%">
        <tr>
          <td align="center" colSpan={2}><h4>Create New Widget</h4></td>
        </tr>
        <tr>
          <td width="30%">Name</td>
          <td><input type="text" size={50} onChange={(event) => setWidgetName(event.target.value)}></input></td>
        </tr>
        <tr>
          <td>Description</td>
          <td><textarea rows={3} maxLength={150} onChange={(event) => setWidgetDescription(event.target.value)}></textarea></td>
        </tr>
        <tr>
          <td align="center" height={35} colSpan={2}><button onClick={addNewWidget}>Create</button> <button onClick={closeWidgetForms}>Close</button></td>
        </tr>
      </table>
    </div>) : '';


  const editWidgetComponent = showEditOption ? (

    <div>
      <div>
        <h3>Edit Widgets</h3>
        Use the below UI for editing the selected widget. &nbsp;
      </div>

      <div className="newWidgetDiv">
        <table border={1} width="50%">
          <tr>
            <td align="center" colSpan={2}><h4>Edit Widget</h4></td>
          </tr>
          <tr>
            <td width="30%">Name</td>
            <td><input type="text" size={50} onChange={(event) => setWidgetName(event.target.value)} value={widgetName}></input></td>
          </tr>
          <tr>
            <td>Description</td>
            <td><textarea rows={3} maxLength={150} onChange={(event) => setWidgetDescription(event.target.value)} value={widgetDescription}></textarea></td>
          </tr>
          <tr>
            <td align="center" height={35} colSpan={2}><button onClick={saveWidget}>Save</button> <button onClick={closeWidgetForms}>Close</button></td>
          </tr>
        </table>
      </div></div>) : '';


  const messageComponent = message === '' ? '' : (
    <div className="message-div">
      <h3>{message}</h3>
    </div>);

  return (
    <div className="master-div">
      <div>
        <h2>Manage Widgets</h2>
        Manage the widgets in this screen.
      </div>

      {messageComponent}

      <div>
        <h3>Create New Widgets</h3>
        Use the 'Create Widget' button in order to create new widgets. &nbsp;
        <button onClick={showCreateNewWidgetForm}>Create Widget</button>
      </div>

      {newWidgetCompnent}
      {editWidgetComponent}

      <div>
        <h3>Enabled Widgets</h3>
        Following are the widgets which are in enabled state right now. You may disable them using the 'Disable' action or delete them using 'Delete' action.

        <table border={1} width='70%'>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {activeWidgetsTableRows}
        </table>

      </div>

      <div>
        <h3>Disabled Widgets</h3>

        Following are the widgets which are in disabled state right now. You may enable them using the 'Enable' action or delete them using 'Delete' action.

        <table border={1} width='70%'>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
          {disabledTableRows}
        </table>


      </div>

    </div>
  );
}

export default ManageWidgets;
