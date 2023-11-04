const matche = {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: true,
}

const errorEqualTeam = {
    id: 1,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: true,
}

const notFoundTeam = {
    id: 1,
    homeTeamId: 10000,
    homeTeamGoals: 2,
    awayTeamId: 4,
    awayTeamGoals: 1,
    inProgress: true,

}

const matcheFinished = {
    id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 1,
    inProgress: false,
}


const matcheCreated = {
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 1,
  }

const matches = [matche, matcheFinished]

export {matche, matches, matcheCreated, matcheFinished, errorEqualTeam, notFoundTeam};