import * as bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isTracker: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {});

  users.prototype.generateHash = function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  users.prototype.verifyPassword = function verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  };
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
