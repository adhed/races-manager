import React, { FormEvent } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';

import './AddEventForm.scss';
import { SportEvent } from '../../../shared/models/sport-event';
import { eventApis } from '../../../core/services';
import { MarkerCoordinates } from '../../../shared/models/map';

type AddEventFormProps = {
    onSuggetionChange: (coords: MarkerCoordinates) => void,
}

export default class AddEventForm extends React.Component<AddEventFormProps> {
    constructor(props: AddEventFormProps, state: any) {
        super(props, state);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuggestionSelect = this.handleSuggestionSelect.bind(this);
      }

    handleSubmit(event: FormEvent): void {
        event.preventDefault();
        const coordinates = { lat: 15.000, lng: 33.122 };
        const formData = new FormData(event.target as any);
        const sportEvent: SportEvent = {
            name: String(formData.get('name')),
            serie: String(formData.get('serie')),
            date: new Date(String(formData.get('date'))),
            discipline: String(formData.get('discipline')),
            place: String(formData.get('place')),
            link: String(formData.get('link')),
            type: String(formData.get('type')),
            coordinates,
            description: String(formData.get('description')),
        };

        eventApis.insertEvent(sportEvent);
    }

    handleSuggestionSelect(suggestion: Suggest): void {
        this.props.onSuggetionChange({
            lat: suggestion.location.lat,
            lng: suggestion.location.lng
        })
    }

    render() {
        return <div className="add-event-form">
            <form className="add-event-form__form form" id="addEventForm" name="addEventForm" onSubmit={this.handleSubmit}>
                <div className="form__element">
                    <label className="form__label" htmlFor="name">Nazwa</label>
                    <input name="name" type="text" id="name" placeholder="Muflon MTB"></input>
                </div>
                <div className="form__box">
                    <div className="form__element">
                        <label className="form__label" htmlFor="serie">Seria</label>
                        <input name="serie" type="text" id="serie" placeholder="Strefa MTB Sudety"></input>
                    </div>
                    <div className="form__element">
                        <label className="form__label" htmlFor="date">Data</label>
                        <input name="date" type="date" id="date" placeholder="01.05.2020"></input>
                    </div>
                </div>
                
                <div className="form__box">
                    <div className="form__element">
                        <label className="form__label" htmlFor="discipline">Dyscyplina</label>
                        <input name="discipline" type="text" id="discipline"></input>
                    </div>
                    <div className="form__element">
                        <label className="form__label" htmlFor="type">Typ</label>
                        <input name="type" id="type" type="text" placeholder="XCM"></input>
                    </div>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="place">Miejsce startu</label>
                    <Geosuggest onSuggestSelect={this.handleSuggestionSelect} />
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="link">Link do szczegółów</label>
                    <input name="link" id="link" type="text" placeholder="http://"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="description">Opis</label>
                    <textarea name="description" id="description" rows={6} placeholder="Mocne MTB na rozpoczęcie sezonu, zapraszamy!"></textarea>
                </div>
                <button className="form__button button" type="submit">
                    <span className="button__label">Dodaj zawody</span>
                </button>
            </form>
        </div>
    }
    
}
