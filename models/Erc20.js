/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Erc20', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    base: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(42),
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    decimals: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '18'
    },
    supply: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    owner: {
      type: DataTypes.STRING(42),
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'Erc20'
  });
};
