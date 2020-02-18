module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "EthErc20",
        {
            base: {
                type: DataTypes.STRING(10),
                allowNull: false,
                primaryKey: true,
            },
            symbol: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(42),
                allowNull: false,
                defaultValue: "0x",
                primaryKey: true,
            },
            txHash: {
                type: DataTypes.STRING(66),
                allowNull: false,
                defaultValue: "0x",
                primaryKey: true,
            },
            decimals: {
                type: DataTypes.INTEGER(10).UNSIGNED,
                allowNull: false,
                defaultValue: "18",
            },
            supply: {
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: "1",
            },
            owner: {
                type: DataTypes.STRING(42),
                allowNull: true,
                defaultValue: "0x",
            },
            icon: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            deleted: {
                type: DataTypes.INTEGER(1),
                allowNull: false,
                defaultValue: "0",
            },
        },
        {
            tableName: "EthErc20",
        },
    );
};
