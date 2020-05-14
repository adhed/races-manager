import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { ApplicationState } from '../../../state/ducks';

type ProtectedRouteProps = {
    component: any;
    isLoggedIn: boolean;
    path: string;
    onlyAdmin?: boolean;
    isAdmin: boolean;
}

function ProtectedRoute(props: ProtectedRouteProps) {
    const Component = props.component;
    return props.isLoggedIn ? (
        props.onlyAdmin ? (props.isAdmin ? <Component /> : <Redirect to={{ pathname: '/sign-in' }}/>) : <Component />
    ) : <Redirect to={{ pathname: '/sign-in' }}/>
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        isAdmin: state.account.details.isAdmin,
    };
}

export default connect(mapStateToProps)(ProtectedRoute)