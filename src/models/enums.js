const Leagues = {
    NBA: 'NBA',
    NFL: 'NFL'
};

const MeleeStatus = {
    Pre: 'pre-event',
    Mid: 'mid-event',
    Post: 'post-event'
  };
  
  const GameStatus = {
    Scheduled: 'scheduled',
    Created: 'created',
    InProgress: 'inprogress',
    HalfTime: 'halftime',
    Complete: 'complete', // The game is over, but stat validation is not complete.
    Closed: 'closed', // The game is over and the stats have been validated.
    Cancelled: 'cancelled',
    Delayed: 'delayed',
    Postponed: 'postponed',
    TimeToBeDetermined: 'time-tbd',
    IfNecessary: 'If necessary', // The game will be scheduled if it is required.
    Unnecessary: 'unnecessary'
  };
  
  function getMeleeStatus(gameStatus) {
    switch (gameStatus) {
      case GameStatus.Scheduled: return MeleeStatus.Pre;
      case GameStatus.Created: return MeleeStatus.Pre;
      case GameStatus.InProgress: return MeleeStatus.Mid;
      case GameStatus.HalfTime: return MeleeStatus.Mid;
      case GameStatus.Complete: return MeleeStatus.Mid;
      case GameStatus.Closed: return MeleeStatus.Post;
      case GameStatus.Cancelled: return MeleeStatus.Pre;
      case GameStatus.Delayed: return MeleeStatus.Pre;
      case GameStatus.Postponed: return MeleeStatus.Pre;
      case GameStatus.TimeToBeDetermined: return MeleeStatus.Pre;
      case GameStatus.IfNecessary: return MeleeStatus.Pre;
      case GameStatus.Unnecessary: return MeleeStatus.Post;
      default:
        throw new Error('Invalid game status: `' + gameStatus + '`.');
    }
  }

module.exports = {
    league: Leagues,
    meleeStatus: MeleeStatus,
    gameStatus: GameStatus,
    getMeleeStatus: getMeleeStatus
};