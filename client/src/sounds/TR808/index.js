/**
 * Mapping selected sounds of TR808 to a JS object.
 * Sounds were lifted from this resource:
 * `http://smd-records.com/tr808/?page_id=14`
 *
 * Of the 16 'instruments' in the TR808, there are 116 different samples
 * in the zip file. However, I've just selected one sample from each of
 * those labeled sounds.
 */

const TR808 = {
  BassDrum: 'BD5000.mp3',
  Clap: 'CP.mp3',
  Claves: 'CL.mp3',
  'Conga.Low': 'LC50.mp3',
  'Conga.Mid': 'MC50.mp3',
  'Conga.High': 'HC50.mp3',
  Cowbell: 'CB.mp3',
  Cymbal: 'CY1000.mp3',
  'HiHat.Open': 'OH50.mp3',
  'HiHat.Closed': 'CH.mp3',
  Maracas: 'MA.mp3',
  RimShot: 'RS.mp3',
  SnareDrum: 'SD0075.mp3',
  'Tom.Low': 'LT50.mp3',
  'Tom.Mid': 'MT50.mp3',
  'Tom.High': 'HT50.mp3'
};

export default TR808;
