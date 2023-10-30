import { Model, QueryInterface, DataTypes } from 'sequelize';
import Teams from '../../Interfaces/ITeams';

export default {
    up(QueryInterface: QueryInterface) {
        return QueryInterface.createTable<Model<Teams>>('teams', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            teamName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'team_name',
            },
        })
    },
    down(QueryInterface: QueryInterface) {
        return QueryInterface.dropTable('teams');
    }
}