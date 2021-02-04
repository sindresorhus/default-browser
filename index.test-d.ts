import {expectType} from 'tsd';
import * as defaultBrowser from './index.js';

expectType<Promise<defaultBrowser.Browser>>(defaultBrowser());
