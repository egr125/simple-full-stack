import e from 'cors';
import './styles/style.css';

import UI from './UI';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderChords();
});



document.getElementById('chord-form')
    .addEventListener('submit', e => {
        const title =document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const image = document.getElementById('image').files;

        const formData = new FormData();
        formData.append('image', image[0]);
        formData.append('title', title);
        formData.append('author', author);
        formData.append('year', year);
        
        
        const ui = new UI();
        ui.addNewChords(formData);
        ui.renderMessage('New Chord Added', 'success', 3000);      


        e.preventDefault();

    });

document.getElementById('chords-cards')
    .addEventListener('click', e => {
        if(e.target.classList.contains('delete')) {
            const ui = new UI()
            ui.deleteChord(e.target.getAttribute('_id'));
            ui.renderMessage('Book deleted', 'danger', 2000);
        }
        e.preventDefault();
    });
  
