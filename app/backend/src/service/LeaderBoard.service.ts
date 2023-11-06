import LeaderBoard from '../model/LeaderBoard.model';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel = new LeaderBoard(),
  ) {}

  async findAllHome() {
    const leaderBoard = await this.leaderBoardModel.findAllHome();
    return { status: 'successful', data: leaderBoard };
  }

  async findAllAway() {
    const leaderBoard = await this.leaderBoardModel.findAllAway();
    return { status: 'successful', data: leaderBoard };
  }

  async findAll() {
    const leaderBoard = await this.leaderBoardModel.findAll();
    return { status: 'successful', data: leaderBoard };
  }
}
