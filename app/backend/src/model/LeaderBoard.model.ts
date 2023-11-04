import { QueryTypes } from 'sequelize';
import db from '../database/models';
import query from './queryLeaderBoard';

export default class LeaderBoard {
  private sequelize = db;

  async findAll() {
    const leaderBoard = await this.sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return leaderBoard;
  }
}
