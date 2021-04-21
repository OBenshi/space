
// Our new builder function
buildFilter = (filter) => {
    let query = {};
    for (let keys in filter) {
        if ( (filter[keys].constructor === Object) || (filter[keys].constructor === Array && filter[keys].length > 0)) {
            query[keys] = filter[keys];
        }
    }
    return query;
}

// Our new filter function
filterData = (data, query) => {
    const keysWithMinMax = [
        'listPrice',
        'bedrooms'
    ];
    const filteredData = data.filter( (item) => {
        for (let key in query) {
            /* Note: this initial check can be modified in case
             *       you still want to include results that may
             *       not have that specific key.
             * 
             *       If that is the case, you can just change these
             *       checks to:
             *       
             *       if (item[key] !=== undefined) {
             *           if (keysWithMinMax.includes(key)) {
             *              ...
             *           }
             *           else if (!query[key].includes(item[key])) {
             *              ...
             *           }
             *       }
             *       
             *       This way your program won't crash when the key doesn't
             *       exist.
             */
            if (item[key] === undefined) {
                return false;
            }
            else if (keysWithMinMax.includes(key)) {
                if (query[key]['min'] !== null && item[key] < query[key]['min']) {
                    return false;
                }
                if (query[key]['max'] !== null && item[key] > query[key]['max']) {
                    return false;
                }
            }
            else if (!query[key].includes(item[key])) {
                return false;
            }
        }
        return true;
    });
    return filteredData;
};



console.log('----------------------');  // For easier reading in the console

// Updated filter
filter = {
    type: [
        'Apartment',
    ],
    saleType: [
        'For Rent',
    ],
    listPrice: {
        min: 1000,
        max: 1800
    },
    bedrooms: {
        min: 1,
        max: null
    },
    washerDryerInUnit: [
        true,
    ],
};

// Updated query
query = buildFilter(filter);
result = filterData(data, query);
console.log(JSON.stringify(result, null, 4));