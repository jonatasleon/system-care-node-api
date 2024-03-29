// TODO: inserir as colunas que serão os pontos de batimento do pacient
// heartbeatValue
// time
// patient_id
export default (sequelize, DataType) => {
  const Heartbeats = sequelize.define('Heartbeats', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heartbeatValue: {
      type: DataType.DOUBLE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Heartbeats.belongsTo(models.Patients);
      },
    },
  });
  return Heartbeats;
};
