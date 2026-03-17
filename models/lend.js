module.exports = (sequelize, DataTypes) => {
    const Lend = sequelize.define('Lend', {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        summa: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        give_day: {
            type: DataTypes.DATE,
            allowNull: false
        },
        take_day: {
            type: DataTypes.DATE,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: "Users", key: "id" }
        }

    }, {
        tableName: 'lends',
        timestamps: true
    });
    Lend.associate = (models) => {
        Lend.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
    };

    return Lend;
};