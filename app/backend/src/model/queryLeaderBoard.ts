type IStates = 'm.home_team_id' | 'm.away_team_id';
type IQuery = {
  inHomeTeam: string,
  inAwayTeam: string,
};

const querySelect = (q1 : string, q2 : string) => `SELECT
t.team_name AS name,
COUNT(*) AS totalGames,
SUM(CASE WHEN ${q1} > ${q2} THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN ${q1} = ${q2} THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN ${q1} < ${q2} THEN 1 ELSE 0 END) AS totalLosses,
SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE
     m.away_team_goals END) as goalsFavor,
SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE
     m.home_team_goals END) as goalsOwn,
(SUM(CASE WHEN ${q1} > ${q2} THEN 1 ELSE
     0 END) * 3 + SUM(CASE WHEN ${q1} = ${q2} THEN 1 ELSE
     0 END)) AS totalPoints,
(SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE
     m.away_team_goals END) -
 SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE
     m.home_team_goals END)) AS goalsBalance,
((SUM(CASE WHEN ${q1} > ${q2} THEN
    1 ELSE 0 END) * 3 + SUM(CASE WHEN ${q1} = ${q2} THEN
        1 ELSE 0 END)) / (COUNT(*) * 3)) * 100 AS efficiency`;

const queryFrom = (states : IStates) => `FROM matches m
JOIN teams t ON ${states} = t.id
WHERE m.in_progress = false
GROUP BY t.team_name, t.id
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC`;

const queryFormatedHome = () => `${querySelect(
  ' m.home_team_goals',
  'm.away_team_goals',
)} ${queryFrom('m.home_team_id')}`;

const queryFormatedAway = () => `${querySelect(
  'm.away_team_goals',
  ' m.home_team_goals',
)} ${queryFrom('m.away_team_id')}`;

const queryObj : IQuery = {
  inHomeTeam: queryFormatedHome(),
  inAwayTeam: queryFormatedAway(),
};

export default queryObj;
