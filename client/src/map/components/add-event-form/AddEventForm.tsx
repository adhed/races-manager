import React, { useState, ChangeEvent, useEffect } from 'react';
import Geosuggest, { Suggest } from 'react-geosuggest';
import { useForm, Controller } from 'react-hook-form'
import { SportEvent } from '../../../shared/models/sport-event';
import { MarkerCoordinates } from '../../../shared/models/map';
import { getCurrentDate, getDate } from '../../../shared/utils';
import { Discipline, DISCPLINES_NAMES, DISCIPLINES_TYPES, DISCIPLINES_TYPES_NAMES } from '../../../shared/models/disciplines';
import './AddEventForm.scss';
import CloseIcon from '../../../shared/components/close-icon/CloseIcon';


type AddEventFormProps = {
    initialData?: SportEvent | null;
    onSuggetionChange: (coords: MarkerCoordinates) => void,
    onFormSubmit: (sportEvent: SportEvent) => void,
    onCloseClick: () => void,
}

const disciplines: Discipline[] = [Discipline.MountainBiking, Discipline.RoadCycling, Discipline.Running, Discipline.XcSkiing];

export default function AddEventForm(props: AddEventFormProps) {
    const { control, setValue, register, handleSubmit, errors, reset } = useForm();
    const [selectedDiscipline, setSelectedDiscipline] = useState(Discipline.MountainBiking);
    const [placeInitialValue, setPlaceInitialValue] = useState('');
    const isEditMode = !!props.initialData;
    const defaultDate = getCurrentDate();

    useEffect(() => {
        if (isEditMode) {
            handleInitialData();
        }
    }, []);

    useEffect(() => {
        if (!isEditMode) {
            resetForm();
        }
    }, [props.initialData]);

    const resetForm = (): void => {
        reset();
        setSelectedDiscipline(Discipline.MountainBiking);
        setPlaceInitialValue('');
    }
    
    const handleInitialData = (): void => {
        setValue('name', props.initialData?.name);
        setValue('serie', props.initialData?.serie);
        setValue('date', getDate(props.initialData?.date as Date));
    
        setValue('discipline', props.initialData?.discipline);
        setSelectedDiscipline(props.initialData?.discipline as Discipline);

        setValue('place', props.initialData?.place);
        setPlaceInitialValue(props.initialData?.place as string);

        setValue('type', props.initialData?.type);
        setValue('description', props.initialData?.description);
        setValue('coordinates', props.initialData?.coordinates);
    }

    const onSubmit = (data: any): void => {
        props.onFormSubmit({
            name: data.name,
            serie: data.serie,
            date: new Date(data.date),
            discipline: data.discipline,
            place: data.place,
            link: data.link,
            type: data.type,
            description: data.description,
            coordinates: { lat: 0, lng: 0 }
        });
    }

    const handleDisciplineChange = (event: ChangeEvent<HTMLSelectElement>): void => {
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

    const handleCloseClick = (): void => {
        props.onCloseClick();
    }

    return <div className="add-event-form">
        <CloseIcon onCloseClick={handleCloseClick} title="Zamknij formularz" />
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
                    initialValue={placeInitialValue}
                    rules={{ required: true }}
                    placeholder='Szklarska Poręba'
                    onChange={([place]) => place}
                    onSuggestSelect={handleSuggestionSelect}
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
                <input name="link" id="link" type="url" placeholder="http://" ref={register()} />
            </div>
            <div className={errors.description ? 'form__element form__element--error' : "form__element"}>
                <label className="form__label" htmlFor="description">Opis imprezy / trasy*</label>
                <textarea name="description" id="description" rows={6} ref={register({ required: true })} placeholder="Zachęć innych do startu - moze opisz krótko trasę i co czyni ją ciekawą."></textarea>
            </div>
            <button className="form__button button" type="submit">
                <span className="button__label">{ isEditMode ? 'Zapisz' : 'Dodaj' } zawody</span>
            </button>
        </form>
    </div>
}
