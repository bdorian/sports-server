Note: Use the page-tutorial.html file asa reference

The app home page will list the available Leagues and the melees. Each melee is represented by the start time of the games in the league. For example, NBA could have 3 melees: 12pm, 3pm and 5pm. Each one will list the players from the teams playing at those times.

Not all the players will show in the melee, as the Admin will select a subset of the available players at that melee time.
The admin also sets the projected points for each player, to help users place their bets. This projection is important in computing the return on investment (ROI), i.e. the payout for the melee.

When the user looks at a melee, he will see a list of players, and for each player the following info:

Before the game starts:
-----------------------

Player details: Players name, image, team, position, matchup 
Melee details: Projected points,  Total investment placed on the player,  Current user's investment on the player

Tapping on a player will open the investment page that allows the user to place money on the player (less than the available balance). A melee fee will also be paid. The fee value depends on the time before the game starts (increases as the game start approaches)
A user can only invest on a player once, before the game, after that the player is locked for this user.

After the game starts:
----------------------

Player details: Players name, image, team, position, matchup 
Melee details: Player's results in this game, Projected points,  Score, Total investment placed on the player,  ROI, Current user's investment on the player

Tapping on a player will show details about the various points accumulated during the game (steals, points, interceptions, etc)
No investment can be made.
The Current points is updated by the application, live (or at certain time intervals). This may need a push from server, or regular polling of the server.
The score is the ration of Results/Project.
The ROI also gets calculated.

Questions about history: do we archive the melees after each day, can the user review melees in which he participated?


From David:
----------

Each investment is done individually (just like you buy a stock), not through selection of various players and bets (with a final submit).
The melee fee is not to play the melee, but the fee applied to each investment.

 
You cannot change your mind and remove an investment.  Once it's made, its locked in.  You made a $1000 investment on player A 5 hours before, no fee.  30 minutes before the game, you put an additional $2000 on player B, and $500 on player C.  Those will be subject to a $40 and $10 admin fee.  You could add a second investment on the same player.  This should be permitted.

We should probably show yesterdays melees as well.  So each time you enter you see yesterday's completed and today's current.

The fee should appear on the main melee page.  Not sure how it should look...maybe a small box  "Admin Fee: >4 hrs before 0%, 3>4 hrs before .5%, 2>3 hrs before 1%, 1>2 hrs before 1.5%, 0>1 hrs before 2%"

As for investments, they should be able to invest one at a time.  pop-up opens, put amount in and click invest...after click invest, ask for confirmation, click confirm and done.  

Timestamps
----------

In general, se pare ca melee times folosesc moment.utcOffset() care rotunjeste la minute.
Daca nu, cum e la lastLogin, folosim milisecunde.
Nu stiu cum e bine...
