export interface IMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>;
  finishMatch(id: IMatches['id']): Promise<void>;
  updatedMatch(
    id: IMatches['id'],
    homeTeamGoals: IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ): Promise<void>;
}
