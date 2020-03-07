import React from 'react';
import './AddEventForm.scss';

export default class AddEventForm extends React.Component {
    render() {
        return <div className="add-event-form">
            <form className="add-event-form__form form">
                <div className="form__element">
                    <label className="form__label" htmlFor="name">Nazwa</label>
                    <input name="name" type="text" id="name" placeholder="Muflon MTB"></input>
                </div>
                <div className="form__box">
                    <div className="form__element">
                        <label className="form__label" htmlFor="name">Seria</label>
                        <input name="series" type="text" id="series" placeholder="Strefa MTB Sudety"></input>
                    </div>
                    <div className="form__element">
                        <label className="form__label" htmlFor="date">Data</label>
                        <input name="date" type="date" id="date" placeholder="01.05.2020"></input>
                    </div>
                </div>
                
                <div className="form__box">
                    <div className="form__element">
                        <label className="form__label" htmlFor="date">Dyscyplina</label>
                        <input name="date" type="text"></input>
                    </div>
                    <div className="form__element">
                        <label className="form__label" htmlFor="type">Typ</label>
                        <input name="type" id="type" placeholder="XCM"></input>
                    </div>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="place">Miejsce startu</label>
                    <input name="place" id="place" placeholder="Wałbrzych"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="link">Link do szczegółów</label>
                    <input name="link" id="link" placeholder="http://"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="description">Opis</label>
                    <textarea name="description" id="description" rows={6} placeholder="Mocne MTB na rozpoczęcie sezonu, zapraszamy!"></textarea>
                </div>
                <button className="form__button button">
                    <span className="button__label">Dodaj zawody</span>
                </button>
            </form>
        </div>
    }
    
}
