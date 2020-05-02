import React from 'react';
import { UserInfo } from 'firebase';
import { connect } from 'react-redux';

import './FavouriteEvents.scss';
import { ApplicationState } from '../../../state/ducks';
import { selectEventById } from '../../../state/ducks/sport-event/actions'
import { removeEventFromFavourites } from '../../../state/ducks/account/actions'
import { SportEvent } from '../../../shared/models/sport-event';
import { FavouriteSportEvent } from '../favourite-sport-event';
import { getFavouriteEvents } from '../../../state/ducks/account/selectors';

type FavouriteEventsProps = {
    user: UserInfo | null;
    sportEvents: SportEvent[];
    isLoggedIn: boolean;
    selectEventById: (id: string) => void;
    removeEventFromFavourites: (eventId: string) => void;
}

function FavouriteEvents(props: FavouriteEventsProps) {
    
    const handleEventClick = (event: SportEvent): void => {
        if (event._id) {
            props.selectEventById(event._id);
        }
    }

    const handleRemovrFromFavourite = (event: SportEvent): void => {
        const result = window.confirm('Czy na pewno chcesz usunąć te zawody z listy ulubionych?');

        if (!result || !event._id) {
            return;
        }
    
        props.removeEventFromFavourites(event?._id);
    }
    
    return <div className="favourite-events">
        <h2 className="favourite-events__title">Twoje najbliższe ulubione zawody:</h2>
        { props.sportEvents.map((sportEvent: SportEvent) => {
            return <FavouriteSportEvent removeFromFavourite={handleRemovrFromFavourite} eventSelected={handleEventClick} key={sportEvent._id} sportEvent={sportEvent} />
        }) }
    </div>;
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        isLoggedIn: state.account.isLoggedIn,
        user: state.account.user,
        sportEvents: getFavouriteEvents(state.sportEvent.data, state.account.favouriteEvents),
    };
}
  
export default connect(mapStateToProps, { removeEventFromFavourites, selectEventById })(FavouriteEvents);