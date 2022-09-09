import ChordService from './services/ChordService';
const chordService = new ChordService();

import { format } from 'timeago.js';

class UI {

    async renderChords() {
        const chords = await chordService.getChord();
        const chordsCardContainer= document.getElementById('chords-cards');
        chordsCardContainer.innerHTML = '';
        chords.forEach((chord) => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${chord.imagePath}" alt="" class="img-fluid"/>
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${chord.title}</h4>
                                <p class="card-text">${chord.author}</p>
                                <p class="card-text">${chord.year}</p>
                                <a href="#" class="btn btn-danger delete" _id="${chord._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(chord.created_at)}
                    </div>
                </div>       
            `;

            chordsCardContainer.appendChild(div);
        });

    } 

    async addNewChords(chord) {
        await chordService.postChord(chord);
        this.clearChordForm();
        this.renderChords();
    }

    clearChordForm() {
        document.getElementById('chord-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const container = document.querySelector('.col-md-4');
        const chordForm = document.querySelector('#chord-form');

        container.insertBefore(div, chordForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);



    }

    async deleteChord(chordId) {
        await chordService.deleteChord(chordId);
        this.renderChords();
    }

}

export default UI;

