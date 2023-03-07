'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.belongsToMany(models.Course, {
        through: 'author_courses',
        as: 'book',
        foreignKey: 'author_id',
        otherKey: 'book_id',
        timestamps: false
      })
    }
  };
  Student.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    written_book: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Author',
    timestamps: false,
    tableName: 'Authors'
  });
  return Student;
};