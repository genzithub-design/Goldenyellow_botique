import kanchipuram from './kanchipuram.json';
import banarasi from './banarasi.json';
import cotton from './cotton.json';
import organza from './organza.json';
import bridal from './bridal.json';

const allSarees = [
  ...kanchipuram,
  ...banarasi,
  ...cotton,
  ...organza,
  ...bridal
];

export { kanchipuram, banarasi, cotton, organza, bridal };
export default allSarees;
