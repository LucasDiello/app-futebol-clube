import { Model, QueryInterface, DataTypes } from 'sequelize';
import { IUsers } from '../../Interfaces/IUsers';


export default {
    up(QueryInterface: QueryInterface) {
        return QueryInterface.createTable<Model<IUsers>>('users', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },

            username: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'username',
            },

            role: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'role',
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'email',
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password',
            },

        })
    },
    down(QueryInterface: QueryInterface) {
        return QueryInterface.dropTable('users');
    }
}