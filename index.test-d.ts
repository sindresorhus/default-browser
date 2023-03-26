import {expectType} from 'tsd';
import defaultBrowser, {type Browser} from './index.js';

expectType<Promise<Browser>>(defaultBrowser());
