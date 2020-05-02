import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';

type ProtectedRouteProps = {
    component: any;
    isLoggedIn: boolean;
    path: string;
}


function ProtectedRoute(props: ProtectedRouteProps) {
    const Component = props.component;
    return props.isLoggedIn ? (
        <Component />
    ) : <Redirect to={{ pathname: '/sign-in' }}/>
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn
    };
}

export default connect(mapStateToProps)(ProtectedRoute)