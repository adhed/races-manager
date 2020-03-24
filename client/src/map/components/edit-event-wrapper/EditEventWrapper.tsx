import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';

type EditEventWrapperProps = {

}

function EditEventWrapper(props: EditEventWrapperProps): JSX.Element {
    return <div>

    </div>
}

const mapStateToProps = (state: ApplicationState): EditEventWrapperProps => {
    return {};
}

export default connect(mapStateToProps, null)(EditEventWrapper);