import React, { useState } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { useForm, Controller } from 'react-hook-form'

import './AddEventForm.scss';
import { SportEvent } from '../../../shared/models/sport-event';
import { MarkerCoordinates } from '../../../shared/models/map';
import { getCurrentDate } from '../../../shared/utils';
import { Discipline, DISCPLINES_NAMES, DISCIPLINES_TYPES, DISCIPLINES_TYPES_NAMES } from '../../../shared/models/disciplines';

type AddEventFormProps = {
    onSuggetionChange: (coords: MarkerCoordinates) => void,
    onFormSubmit: (sportEvent: SportEvent) => void,
}

const disciplines: Discipline[] = [Discipline.MountainBiking, Discipline.RoadCycling, Discipline.Running, Discipline.XcSkiing];

export default function AddEventForm(props: AddEventFormProps) {
    const { control, setValue, register, handleSubmit, errors, reset } = useForm();
    const [selectedDiscipline, setSelectedDiscipline] = useState(Discipline.MountainBiking);
    const defaultDate = getCurrentDate();

    const onSubmit = (data: any): void => {
        console.log('Submitted data:', data);
        
        props.onFormSubmit({
            name: data.name,
            serie: data.serie,
            date: new Date(data.date),
            discipline: data.discipline,
            place: data.place,
            link: data.link,
            type: data.type,
            description: data.discription,
            coordinates: { lat: 0, lng: 0 }
        });

        reset();
    }

    const handleDisciplineChange = (event: any): void => {
        if (!event.target.value) {
            return;
        }

        setSelectedDiscipline(event.target.value as Discipline);
    }

    const handleSuggestionSelect = (suggestion: Suggest): void => {
        if (!suggestion || !suggestion.location) {
            return;
        }
    
        setValue('place', suggestion.label);
        props.onSuggetionChange({
            lat: suggestion.location.lat,
            lng: suggestion.location.lng
        })
    }

    return <div className="add-event-form">
        <form className="add-event-form__form form" id="addEventForm" name="addEventForm" onSubmit={handleSubmit(onSubmit)}>
            <div className={errors.name ? 'form__element form__element--error' : "form__element"}>
                <label className="form__label" htmlFor="name">Nazwa*</label>
                <input name="name" type="text" id="name" placeholder="Muflon MTB" ref={register({ required: true })} />
            </div>
            <div className={errors.place ? 'form__element form__element--error' : "form__element"}>
                <label className="form__label" htmlFor="place">Miejsce startu*</label>
                <Controller
                    as={Geosuggest}
                    name="place"
                    control={control}
                    rules={{ required: true }}
                    placeholder='Wpisz i wyszukaj miejsce startu'
                    onChange={([place]) => place}
                    onSuggestSelect={handleSuggestionSelect}
                    defaultValue={''}
                />
            </div>
            <div className="form__box">
                <div className="form__element">
                    <label className="form__label" htmlFor="serie">Seria</label>
                    <input name="serie" type="text" id="serie" placeholder="Strefa MTB Sudety" ref={register} />
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="date">Data*</label>
                    <input name="date" type="date" id="date" placeholder="01-06-2020" required defaultValue={defaultDate} ref={register({ required: true })} />
                </div>
            </div>
            
            <div className="form__box">
                <div className="form__element">
                    <label className="form__label" htmlFor="discipline">Dyscyplina*</label>
                    <select name="discipline" id="discipline" onChange={handleDisciplineChange} ref={register({ required: true })}>

                        { disciplines.map((discipline: Discipline) => {
                            return (<option key={discipline}  value={discipline}>{DISCPLINES_NAMES[discipline]}</option>)
                        }) }
                    </select>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="type">Typ</label>
                    <select name="type" id="type" ref={register({ required: false })}>
                        { (DISCIPLINES_TYPES[selectedDiscipline] as string[]).map((type: string) => {
                            return (<option key={`${type}${selectedDiscipline}`} value={type}>{DISCIPLINES_TYPES_NAMES[type]}</option>)
                        }) }
                    </select>
                </div>
            </div>
            <div className="form__element">
                <label className="form__label" htmlFor="link">Link do szczegółów</label>
                <input name="link" id="link" type="text" placeholder="http://" ref={register()} />
            </div>
            <div className={errors.place ? 'form__element form__element--error' : "form__element"}>
                <label className="form__label" htmlFor="description">Opis imprezy / trasy*</label>
                <textarea name="description" id="description" rows={6} ref={register({ required: true })} placeholder="Zachęć innych do startu - moze opisz krótko trasę i co czyni ją ciekawą."></textarea>
            </div>
            <button className="form__button button" type="submit">
                <span className="button__label">Dodaj zawody</span>
            </button>
        </form>
    </div>
}
