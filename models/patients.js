import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Patients = sequelize.define('Patients', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validade: {
        notEmpty: true,
      },
    },
  }, {
    hooks: {
      beforeCreate: (patient) => {
        const salt = bcrypt.genSaltSync();
        patient.password = bcrypt.hashSync(patient.password, salt);
      },
    },
    classMethods: {
      associate: (models) => {
        Patients.belongsTo(models.Doctors);
        Patients.hasMany(models.Heartbeats);
      },
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
  });
  return Patients;
};
