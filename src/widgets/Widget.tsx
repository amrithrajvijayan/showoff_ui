import WidgetInfo from "../models/WidgetInfoInterface";
import PropTypes from 'prop-types'

function Widget({ widget }: ParamType) {
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
}

type ParamType = {
    widget: WidgetInfo
}

export default Widget;