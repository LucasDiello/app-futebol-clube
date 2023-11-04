export default interface ILeaderboard {
  name: string;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
  totalPoints: number;
}

export interface ILeaderBoardModel {
  findAllHome(): Promise<ILeaderboard[]>;
  findAllAway(): Promise<ILeaderboard[]>;
}
