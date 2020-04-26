import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import './FavouriteEvents.scss';
import { ApplicationState } from '../../../state/ducks';
import { selectEventById } from '../../../state/ducks/sport-event/actions'
import { SportEvent } from '../../../shared/models/sport-event';
import { FavouriteSportEvent } from '../favourite-sport-event';

type FavouriteEventsProps = {
    user: UserInfo | null;
    sportEvents: SportEvent[];
    isLoggedIn: boolean;
    selectEventById: (id: string) => void;
}

function FavouriteEvents(props: FavouriteEventsProps) {
    
    const handleEventClick = (event: SportEvent): void => {
        if (event._id) {
            props.selectEventById(event._id);
        }
    }
    
    return <div className="favourite-events">
        <h2 className="favourite-events__title">Twoje najbliższe ulubione zawody:</h2>
        { props.sportEvents.map((sportEvent: SportEvent) => {
            return <FavouriteSportEvent eventSelected={handleEventClick} key={sportEvent._id} sportEvent={sportEvent} />
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
  
export default connect(mapStateToProps, { selectEventById })(FavouriteEvents);