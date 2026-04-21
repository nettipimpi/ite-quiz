// Struttura affermazioni
// Gruppo A (id 1-6): ripetute in TUTTE e 3 le sessioni (3x esposizione)
// Gruppo B (id 7-11): ripetute in S2 e S3 (2x esposizione)
// Gruppo C-S1 (id 12-16): uniche S1 (controllo)
// Gruppo C-S2 (id 17-21): uniche S2 (controllo)
// Gruppo C-S3 (id 22-26): uniche S3 (controllo)

const STMTS = {
  1:  { text: "Il cuore umano batte in media circa 100.000 volte al giorno.", vero: true },
  2:  { text: "La Torre Eiffel fu costruita originariamente come installazione temporanea.", vero: false },
  3:  { text: "L'acqua copre circa il 71% della superficie terrestre.", vero: true },
  4:  { text: "Gli elefanti sono gli unici mammiferi che non riescono a saltare.", vero: false },
  5:  { text: "La luce del Sole impiega circa 8 minuti per raggiungere la Terra.", vero: true },
  6:  { text: "Il cervello umano continua a svilupparsi fino ai 25 anni circa.", vero: true },
  7:  { text: "Il monte Everest è la montagna più alta misurata dalla base alla vetta.", vero: false },
  8:  { text: "Il sangue è rosso perché l'emoglobina contiene ferro.", vero: true },
  9:  { text: "L'oro è il metallo con la maggiore conduttività elettrica.", vero: false },
  10: { text: "Il DNA umano è identico al 98,7% a quello degli scimpanzé.", vero: true },
  11: { text: "Gli esseri umani usano solo il 10% della capacità del proprio cervello.", vero: false },
  12: { text: "Il suono viaggia più velocemente nell'acqua che nell'aria.", vero: true },
  13: { text: "Gli occhi di un gatto hanno tre palpebre.", vero: true },
  14: { text: "Il Brasile è il paese con la maggiore biodiversità al mondo.", vero: true },
  15: { text: "La Luna è più vicina alla Terra in estate che in inverno.", vero: false },
  16: { text: "Il corpo umano contiene abbastanza ferro da fare un chiodo da 8 cm.", vero: true },
  17: { text: "Il caffè è il secondo prodotto più commerciato al mondo dopo il petrolio.", vero: false },
  18: { text: "Il polpo ha tre cuori e sangue di colore blu.", vero: true },
  19: { text: "La velocità della luce nel vuoto è di circa 300.000 km al secondo.", vero: true },
  20: { text: "I ragni hanno sempre esattamente otto occhi.", vero: false },
  21: { text: "Una lumaca può dormire fino a tre anni consecutivi.", vero: true },
  22: { text: "L'idrogeno è l'elemento chimico più abbondante nell'universo osservabile.", vero: true },
  23: { text: "La Muraglia Cinese è visibile a occhio nudo dallo spazio.", vero: false },
  24: { text: "Il miele non scade mai se conservato correttamente.", vero: true },
  25: { text: "Un'ostrica può cambiare sesso più volte nel corso della propria vita.", vero: true },
  26: { text: "Gli squali sono gli unici animali che non si ammalano mai di cancro.", vero: false },
};

// Affermazioni per sessione
const SESSION_IDS = {
  1: [1,2,3,4,5,6, 7,8,9,10,11, 12,13,14,15,16],
  2: [1,2,3,4,5,6, 7,8,9,10,11, 17,18,19,20,21],
  3: [1,2,3,4,5,6, 7,8,9,10,11, 22,23,24,25,26],
};

// Gruppo di esposizione per id e sessione
function getEsposizione(id, sess) {
  if (id >= 1 && id <= 6) {
    return sess === 1 ? 'prima' : sess === 2 ? 'seconda' : 'terza';
  }
  if (id >= 7 && id <= 11) {
    return sess === 1 ? 'prima' : sess === 2 ? 'seconda' : 'terza';
  }
  return 'unica';
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const SESS_INFO = {
  1: { label: 'Sessione 1', cls: 's1', color: '#3b82f6', desc: '16 affermazioni — tutte nuove.', next: 'Il prossimo appuntamento è giovedì (Sessione 2).' },
  2: { label: 'Sessione 2', cls: 's2', color: '#22c55e', desc: '16 affermazioni — alcune già viste, alcune nuove.', next: 'Ultimo appuntamento domenica (Sessione 3).' },
  3: { label: 'Sessione 3', cls: 's3', color: '#f59e0b', desc: '16 affermazioni — ultime domande.', next: 'Esperimento completato. Risultati presentati lunedì 27.' },
};
