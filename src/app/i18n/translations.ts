import { Language } from '../models/language.model';
import cs from './locale-cs.json';
import sk from './locale-sk.json';
import en from './locale-en.json';

export type TranslationKey = keyof typeof cs;

export type Translations = Record<TranslationKey, string>;

export const TRANSLATIONS: Record<Language, Translations> = { cs, sk, en };
