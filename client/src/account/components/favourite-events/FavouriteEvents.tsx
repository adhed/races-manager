import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import './FavouriteEvents.scss';
import { ApplicationState } from '../../../state/ducks';
import { SportEvent } from '../../../shared/models/sport-event';
import { FavouriteSportEvent } from '../favourite-sport-event';

type FavouriteEventsProps = {
    user: UserInfo | null;
    sportEvents: SportEvent[];
    isLoggedIn: boolean;
}

function FavouriteEvents(props: FavouriteEventsProps) {
    console.log('sportEvents', props.sportEvents);
    return <div className="favourite-events">
        <h2 className="favourite-events__title">Twoje ulubione zawody:</h2>
        { props.sportEvents.map((sportEvent: SportEvent) => {
            return <FavouriteSportEvent key={sportEvent._id} sportEvent={sportEvent} />
        }) }
    </div>;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
        sportEvents: state.sportEvent.data
    };
}
  
export default connect(mapStateToProps)(FavouriteEvents);