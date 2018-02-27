
module.exports = (sequelize, DataTypes) => {
  const incidents = sequelize.define('incidents', {
    revisionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    trackerId: DataTypes.INTEGER
  }, {});
  incidents.associate = function(models) {
    incidents.hasMany(models.incidentrevisions, {foreignKey: 'incidentId'});
  };
  return incidents;
};
