import {expectType} from 'tsd';
import defaultBrowser = require('.');

expectType<Promise<{ name: string; id: string }>>(defaultBrowser());
