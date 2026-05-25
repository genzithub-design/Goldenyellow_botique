import collections from './collections';
import cottonSarees from './cottonSarees';
import kanchipuramSarees from './kanchipuramSarees';
import banarasiSarees from './banarasiSarees';
import organzaSarees from './organzaSarees';
import chiffonSarees from './chiffonSarees';
import georgetteSarees from './georgetteSarees';
import bridalSarees from './bridalSarees';
import linenSarees from './linenSarees';

export const sareeDataMap = {
  'cotton-sarees': cottonSarees,
  'kanchipuram-silk': kanchipuramSarees,
  'banarasi-silk': banarasiSarees,
  'organza-sarees': organzaSarees,
  'chiffon-sarees': chiffonSarees,
  'georgette-sarees': georgetteSarees,
  'bridal-sarees': bridalSarees,
  'linen-sarees': linenSarees,
};

export const allSareesList = [
  ...cottonSarees,
  ...kanchipuramSarees,
  ...banarasiSarees,
  ...organzaSarees,
  ...chiffonSarees,
  ...georgetteSarees,
  ...bridalSarees,
  ...linenSarees,
];

export { collections };
