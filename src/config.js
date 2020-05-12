// config.js
module.exports = {
    secret: 'fsm secret',
    verbose: true,
    feed: {
      authentication: {
        sportRadar: {
          userId: "FSMadmin",
          password: "Temppw777"
        },
        fsmServer: {
          email: "admin@admin.admin",
          password: "fsmadmin"
        }
      },
      baseUrl: "http://api.sportradar.us/",
      delayCallBy: 1200,//milliseconds
      schedule: "0 4 * * *", // daily at 4AM
      gameResultPollingSchedule: '*/2 * * * *', // every 2 minutes
      leagues : [
        {
          league: "NFL",
          apiKey: "3q6urcxhyejfzufa7e4bfxb2",
          imagesApiKey: "twtnsdkgvt3yck6da3w8q3vn",
          feed: {
            daily_change_log: "nfl-ot2/league/:year/:month/:day/changes:format",
            game_boxscore: "nfl-ot2/games/:game_id/boxscore:format",
            game_roster: "nfl-ot2/games/:game_id/roster:format",
            game_statistics: "nfl-ot2/games/:game_id/statistics:format",
            league_hierarchy: "nfl-ot2/league/hierarchy:format",
            play_by_play: "nfl-ot2/games/:game_id/pbp:format",
            player_participation: "nfl-ot2/plays/:game_id/participation:format",
            player_profile: "nfl-ot2/players/:player_id/profile:format",
            schedule: "nfl-ot2/games/:year/:nfl_season/schedule:format",
            seasonal_statistics: "nfl-ot2/seasontd/:year/:nfl_season/teams/:team_id/statistics:format",
            standings: "nfl-ot2/seasontd/:year/standings:format",
            team_profile: "nfl-ot2/teams/:team_id/profile:format",
            team_roster: "nfl-ot2/teams/:team_id/full_roster:format",
            weekly_schedule: "nfl-ot2/games/:year/:nfl_season/:nfl_season_week/schedule:format",
            weekly_injuries: "nfl-ot2/seasontd/:year/:nfl_season/:nfl_season_week/injuries:format",
            weekly_depth_charts: "nfl-ot2/seasontd/:year/:nfl_season/:nfl_season_week/depth_charts:format"
          }
        }, {
          league: "NBA", 
          apiKey: "dnwbjczke2v2wfv9zytu8hpf",
          imagesApiKey: "???",
          feed: {
            daily_change_log: "nba/trial/v4/en/league/:year/:month/:day/changes:format",
            daily_schedule: "nba/trial/v4/en/games/:year/:month/:day/schedule:format",
            daily_transfers: "nba/trial/v4/en/league/:year/:month/:day/transfers:format",
            free_agents: "nba/trial/v4/en/league/free_agents:format",
            game_boxscore: "nba/trial/v4/en/games/:game_id/boxscore:format",
            game_summary: "nba/trial/v4/en/games/:game_id/summary:format",
            injuries: "nba/trial/v4/en/league/injuries:format",
            league_hierarchy: "nba/trial/v4/en/league/hierarchy:format",
            league_leaders: "nba/trial/v4/en/seasons/:season_year/:season_type/leaders:format",
            play_by_play: "nba/trial/v4/en/games/:game_id/pbp:format",
            player_profile: "nba/trial/v4/en/players/:player_id/profile:format",
            rankings: "nba/trial/v4/en/seasons/:season_year/:season_type/rankings:format",
            schedule: "nba/trial/v4/en/games/:season_year/:season_type/schedule:format",
            seasonal_statistics: "nba/trial/v4/en/seasons/:season_year/:season_type/teams/:team_id/statistics:format",
            series_schedule: "nba/trial/v4/en/series/:season_year/:season_type/schedule:format",
            series_statistics: "nba/trial/v4/en/series/:series_id/teams/:team_id/statistics:format",
            standings: "nba/trial/v4/en/seasons/:season_year/:season_type/standings:format",
            team_profile_rosters: "nba/trial/v4/en/teams/:team_id/profile:format"
          },
          feed_params: {
            daily_schedule: {
              year: 2018,
	            month: 3, 
	            day: 10
            }
          }
        }
      ]
    }
  };