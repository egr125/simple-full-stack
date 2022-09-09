class ChordService {

    constructor() {
        this.URI = '/api/chords';
    }

    async getChord() {
        const response = await fetch(this.URI);
        const chords = await response.json();
        return chords;
    }

   async postChord(chord) { 
        const res = await fetch(this.URI, {
        method: "POST",
        body: chord,
    });
    const data = await res.json();
    console.log(data)

   }

   async deleteChord(chordID) {
    const res =await fetch(`${this.URI}/${chordID}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });
    const data = await res.json();
    console.log(data)


   }

}

export default ChordService;