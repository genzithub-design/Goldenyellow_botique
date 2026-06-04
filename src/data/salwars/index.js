import kurtis from './kurtis.json';
import maxis from './maxis.json';
import coordsets from './coordsets.json';
import salwars from './salwars.json';
import legwear from './legwear.json';

const allSalwars = [
  ...kurtis,
  ...maxis,
  ...coordsets,
  ...salwars,
  ...legwear
];

export { kurtis, maxis, coordsets, salwars, legwear };
export default allSalwars;
