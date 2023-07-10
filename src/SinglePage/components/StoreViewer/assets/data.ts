const annotationSample = [
    {
        "device1": [ // level 1
            {
                "id": "1234", // level 2
                "bt": 123,
                "tt": 456,
                "name": "Sub device1",
                "annotation": [  // level 2
                    {
                        "name": "annot1", // level 3
                        "bt": 1,
                        "tt": 2,
                        "id": 'annot1',
                    },
                    {
                        "name": "annot2", // level 3
                        "bt": 12,
                        "tt": 21,
                        "id": 'annot2',
                    }
                ]
            }
        ]
    },
    {
        "device2": [ // level 1
            {
                "id": "5678",// level 2
                "bt": 123,
                "tt": 456,
                "name": "Sub device1",
                "annotation": [ // level 2
                    {
                        "name": "temp1", // level 3
                        "bt": 1,
                        "tt": 2,
                        "id": 'annot3',
                    },
                    {
                        "name": "temp2", // level 3
                        "bt": 12,
                        "tt": 21,
                        "id": 'annot4',
                    }
                ]
            },
            {
                "id": "91011", // level 2
                "bt": 123,
                "tt": 456,
                "name": "Sub device2",
                "annotation": [ // level 2
                    {
                        "name": "temp3", // level 3
                        "bt": 1,
                        "tt": 2,
                        "id": 'annot5',
                    },
                    {
                        "name": "temp4",
                        "bt": 12,
                        "tt": 21,
                        "id": 'annot6',
                    }
                ]
            }
        ]
    },
    {
        "device3": [ // level 1
            {
                "id": "1213", // level 2
                "bt": 123,
                "tt": 456,
                "name": "Sub device",
                "annotation": [  // level 2
                    {
                        "name": "templ", // level 3
                        "bt": 1,
                        "tt": 2,
                        "id": 'annot7',
                    },
                    {
                        "name": "temp2", // level 3
                        "bt": 12,
                        "tt": 21,
                        "id": 'annot8',
                    }
                ]
            }
        ]
    },
];

export {
    annotationSample
};