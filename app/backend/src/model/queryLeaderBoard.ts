type teamValue = 'm.home_team_id' | 'm.away_team_id';
type inProgress = 'true' | 'false';

const query(teamValue : teamValue , inProgress : inProgress) : any => {
    const queryValue = `SELECT
    t.team_name AS name,
    COUNT(*) AS totalGames,
    SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE
         m.away_team_goals END) as goalsFavor,
    SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE
         m.home_team_goals END) as goalsOwn,
    (SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE
         0 END) * 3 + SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE
         0 END)) AS totalPoints,
    (SUM(CASE WHEN m.home_team_id = t.id THEN m.home_team_goals ELSE
         m.away_team_goals END) -
     SUM(CASE WHEN m.home_team_id = t.id THEN m.away_team_goals ELSE
         m.home_team_goals END)) AS goalsBalance,
    ((SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN
        1 ELSE 0 END) * 3 + SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN
            1 ELSE 0 END)) / (COUNT(*) * 3)) * 100 AS efficiency
    FROM matches m
    JOIN teams t ON ${teamValue} = t.id
    WHERE m.in_progress = ${inProgress}
    GROUP BY t.team_name, t.id
    ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;
    `;
    
    return queryValue;
}

export default query;
