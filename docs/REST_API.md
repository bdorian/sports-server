POST /melee/all
--------------

Returns all meeles today, that are open, as a JSON-ized with each entry like:

    {
        "id": 1,
        "league": "NBA",
        "openTime": "1527541200000",
        "startTime": "1527555600000",
        "totalInvestment": 3366,
        "activePlayers": 33,
        "status": "post-event"
    }


POST /melee  {meleeId}
---------------------
Returns all the players in the specified meleeId (parameter passed as a request param)

    {
        "id": 3,
        "meleeId": 1,
        "firstName": "Markel",
        "lastName": "Brown",
        "position": "G",
        "team": "Rockets",
        "isPlayingHome": true,
        "vsTeam": "Warriors",
        "projection": 13,
        "totalInvestment": 103,
        "performance": null,
        "roi": 0,
        "userId": 1,
        "userInvestment": 103
    },
   {
        "id": 4,
        "meleeId": 1,
        "firstName": "Ryan",
        "lastName": "Anderson",
        "position": "F",
        "team": "Rockets",
        "isPlayingHome": true,
        "vsTeam": "Warriors",
        "projection": 14,
        "totalInvestment": 104,
        "performance": null,
        "roi": 0,
        "userId": 1,
        "userInvestment": 104
    }
]

POST /investment/history
-------------------------
Returns investments made by this user

[
    {
        "id": 2,
        "userId": 1,
        "player": "Markel Brown",
        "league": "NBA",
        "dateTime": "1529460637227",
        "amount": -200,
        "fee": 0,
        "balance": 4800
    },
    {
        "id": 3,
        "userId": 1,
        "player": "Markel Brown",
        "league": "NBA",
        "dateTime": "1529461388377",
        "amount": -250,
        "fee": 0,
        "balance": 4550
    },
    {
        "id": 4,
        "userId": 1,
        "player": "Markel Brown",
        "league": "NBA",
        "dateTime": "1529461563793",
        "amount": -50,
        "fee": 0,
        "balance": 4500
    },
    {
        "id": 5,
        "userId": 1,
        "player": "Markel Brown",
        "league": "NBA",
        "dateTime": "1529461855911",
        "amount": -600,
        "fee": 0,
        "balance": 3900
    }
]


iPhone APP:
Chat de la Florin
--------------------

la FSMAPI ai EndPoint cu toate endpointurile. am mai facut un push acum sa adaug / la inceput de endpoint
FSMAPIActions are toate actiunuile, acolo vezi parameterii care ii trimit
daca trebuie sa schimbi ceva


la FSMAPI ai EndPoint cu toate endpointurile. am mai facut un push acum sa adaug / la inceput de endpoint
FSMAPIActions are toate actiunuile, acolo vezi parameterii care ii trimit
daca trebuie sa schimbi ceva


la FSMAPI ai EndPoint cu toate endpointurile. am mai facut un push acum sa adaug / la inceput de endpoint
FSMAPIActions are toate actiunuile, acolo vezi parameterii care ii trimit
daca trebuie sa schimbi ceva