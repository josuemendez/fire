$.ajax({
    type: 'PUT', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
    dataType: 'json', // Set datatype - affects Accept header
    url: "https://api.hubapi.com/hubdb/api/v2/tables/697778/rows/6105430947/cells/3?hapikey=4dbf75dc-7096-4f8a-b269-74996f2acad2", // A valid URL
    headers: {
        "X-HTTP-Method-Override": "PUT"
    }, // X-HTTP-Method-Override set to PUT.
    data: '{"name": "disponible"}' // Some data e.g. Valid JSON as a string
});