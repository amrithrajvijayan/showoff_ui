import WidgetInfo from "../models/WidgetInfoInterface";

const API_URL = process.env.REACT_APP_WIDGETS_API_URL ?? ''; //http://localhost:3000/widgets/';

const fetchAllWidgets = function(): Promise<Response> {
    return fetch(API_URL);
}

const enableDisableWidget = function(widget: WidgetInfo, status: boolean): Promise<void> {

    return new Promise<void>((resolve ,reject) => {
    widget.status = status;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
    };
    fetch(API_URL + widget.id, requestOptions)
        .then(response => response.json())
        .then(data => {
            resolve();
        });
    });
}

const updateWidget = function(widget: WidgetInfo): Promise<void> {

    return new Promise<void>((resolve ,reject) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
    };
    fetch(API_URL + widget.id, requestOptions)
        .then(response => response.json())
        .then(data => {
            resolve();
        });
    });
}



const createWidget = function(widget: WidgetInfo): Promise<void> {

    return new Promise<void>((resolve ,reject) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
    };
    fetch(API_URL, requestOptions)
        .then(response => response.json())
        .then(data => {
            resolve();
        });
    });
}



const deleteWidget = function(widget: WidgetInfo): Promise<void> {

    return new Promise<void>((resolve ,reject) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widget)
    };
    fetch(API_URL + widget.id, requestOptions)
        .then(() => {
            resolve();
        });
    });
}

export { fetchAllWidgets, enableDisableWidget, deleteWidget, createWidget, updateWidget }