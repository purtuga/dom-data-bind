import dataStore    from "common-micro-libs/src/jsutils/dataStore"

//=====================================================
export const PRIVATE = dataStore.create();

export const escapeString = str => String(str).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");