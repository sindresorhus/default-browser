import {expectType} from 'tsd';
import defaultBrowser, {Browser} from './index.js';

expectType<Promise<Browser>>(defaultBrowser());
