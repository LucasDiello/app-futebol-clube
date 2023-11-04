import LeaderBoard from '../model/LeaderBoard.model';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel = new LeaderBoard(),
  ) {}

  async findAll() {
    const leaderBoard = await this.leaderBoardModel.findAll();
    return { status: 'successful', data: leaderBoard };
  }
}
