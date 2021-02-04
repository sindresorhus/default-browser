import {expectType} from 'tsd';
import defaultBrowser, {Browser} from '.';

expectType<Promise<Browser>>(defaultBrowser());
