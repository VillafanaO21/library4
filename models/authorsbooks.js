'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authorsbooks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Authorsbooks.init({
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Authorsbooks',
    tableName: 'Authorsbooks',
    timestamps:false
  });
  return Authorsbooks;
};