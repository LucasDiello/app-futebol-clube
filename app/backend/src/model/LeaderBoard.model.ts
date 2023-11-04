import { QueryTypes } from 'sequelize';
import db from '../database/models';
import queryObj from './queryLeaderBoard';
import ILeaderboard, { ILeaderBoardModel } from '../Interfaces/ILeaderBoard';

export default class LeaderBoard implements ILeaderBoardModel {
  private sequelize = db;

  async findAllHome() : Promise<ILeaderboard[]> {
    const leaderBoard = await this.sequelize.query(queryObj.inHomeTeam, {
      type: QueryTypes.SELECT,
    });

    return leaderBoard as ILeaderboard[];
  }

  async findAllAway() : Promise<ILeaderboard[]> {
    const leaderBoard = await this.sequelize.query(queryObj.inAwayTeam, {
      type: QueryTypes.SELECT,
    });

    return leaderBoard as ILeaderboard[];
  }
}
