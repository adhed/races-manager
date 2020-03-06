import React from 'react';
import './AddEventForm.scss';

export default class AddEventForm extends React.Component {
    render() {
        return <div className="add-event-form">
            <form className="add-event-form__form form">
                <div className="form__element">
                    <label className="form__label" htmlFor="name">Nazwa zawodów</label>
                    <input name="name" type="text" id="name" placeholder="Bikemaraton"></input>
                </div>
                
                <div className="form__element">
                    <label className="form__label" htmlFor="date">Data</label>
                    <input name="date" type="date" id="date" placeholder="01.05.2020"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="date">Dyscyplina</label>
                    <input name="date" type="text"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="place">Miejsce</label>
                    <input name="place" id="place" placeholder="Wałbrzych"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="type">Typ zawodów</label>
                    <input name="type" id="type" placeholder="XCM"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="link">Link</label>
                    <input name="link" id="link" placeholder="http://"></input>
                </div>
                <div className="form__element">
                    <label className="form__label" htmlFor="description">Opis</label>
                    <textarea name="description" id="description" rows={4} placeholder=""></textarea>
                </div>
                <button className="form__button button">
                    <span className="button__label">Zgłoś zawody</span>
                </button>
            </form>
        </div>
    }
    
}
