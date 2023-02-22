'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
   this.hasMany(models.borrow,{
    foreignKey: "adminID", as:"borrowed"
   })
    }
    // ada s nya nama tabel
    // has itu untuk primary key (id utama)
    // belongs to untuk foreignkey
    // one-one ->belongs to , has one
    // one-many ->belongs to,has many
    // many-many ->belongs to many,has many
  }
  admin.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    address: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'admin',
  });
  return admin;
};