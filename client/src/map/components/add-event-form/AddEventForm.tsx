import React, { FormEvent } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { useForm } from 'react-hook-form'

import './AddEventForm.scss';
import { SportEvent } from '../../../shared/models/sport-event';
import { MarkerCoordinates } from '../../../shared/models/map';
import { getCurrentDate } from '../../../shared/utils';

type AddEventFormProps = {
    onSuggetionChange: (coords: MarkerCoordinates) => void,
    onFormSubmit: (sportEvent: SportEvent) => void,
}

export default function AddEventForm(props: AddEventFormProps) {
    const { register, handleSubmit, watch, errors } = useForm();
    const defaultDate = getCurrentDate();

    const onSubmit = (data: any): void => {
        console.log('data', data);
        // const formData = new FormData(event.target as any);
        
        // props.onFormSubmit({
        //     name: '',
        //     serie: String(formData.get('serie')),
        //     date: new Date(String(formData.get('date'))),
        //     discipline: String(formData.get('discipline')),
        //     place: String(formData.get('place')),
        //     link: String(formData.get('link')),
        //     type: String(formData.get('type')),
        //     description: String(formData.get('description')),
        //     coordinates: { lat: 0, lng: 0 }
        // });
    }

    const handleSuggestionSelect = (suggestion: Suggest): void => {
        if (!suggestion || !suggestion.location) {
            return;
        }
    
        props.onSuggetionChange({
            lat: suggestion.location.lat,
            lng: suggestion.location.lng
        })
    }

    const handleOnNameChange = (name: string): void => {
        if (!name) {
            return;
        }
    }


    return <div className="add-event-form">
        <form className="add-event-form__form form" id="addEventForm" name="addEventForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="form__element">
                <label className="form__label" htmlFor="name">Nazwa</label>
                <input name="name" type="text" id="name" placeholder="Muflon MTB" ref={register({ required: true })} />
            </div>
            <div className="form__box">
                <div className="form__element">
                    <label className="form__label" htmlFor="serie">Seria</label>
                    <input name="serie" type="text" id="serie" placeholder="Strefa MTB Sudety" ref={register} />
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="date">Data</label>
                    <input name="date" type="date" id="date" placeholder="01-06-2020" required defaultValue={defaultDate} ref={register({ required: true })} />
                </div>
            </div>
            
            <div className="form__box">
                <div className="form__element">
                    <label className="form__label" htmlFor="discipline">Dyscyplina</label>
                    <select name="discipline" id="discipline" ref={register({ required: true })}>
                        <option>Kolarstwo górskie</option>
                        <option>Bieganie</option>
                        <option>Narciarstwo biegowe</option>
                        <option>Kolarstwo szosowe</option>
                    </select>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="type">Typ</label>
                    <input name="type" id="type" type="text" placeholder="XCM" ref={register} />
                </div>
            </div>
            <div className="form__element">
                <label className="form__label" htmlFor="place">Miejsce startu</label>
                <Geosuggest placeholder="Wpisz miejsce startu" onChange={handleOnNameChange} onSuggestSelect={handleSuggestionSelect} />
            </div>
            <div className="form__element">
                <label className="form__label" htmlFor="link">Link do szczegółów</label>
                <input name="link" id="link" type="text" placeholder="http://" ref={register()} />
            </div>
            <div className="form__element">
                <label className="form__label" htmlFor="description">Opis</label>
                <textarea name="description" id="description" rows={6} placeholder="Zachęć innych do startu - moze opisz krótko trasę i co czyni ją ciekawą." ref={register()}></textarea>
            </div>
            <button className="form__button button" type="submit">
                <span className="button__label">Dodaj zawody</span>
            </button>
        </form>
    </div>
}
