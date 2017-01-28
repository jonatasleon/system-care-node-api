import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Doctors = sequelize.define('Doctors', {
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
      beforeCreate: (doctor) => {
        const salt = bcrypt.genSaltSync();
        doctor.password = bcrypt.hashSync(doctor.password, salt);
      },
    },
    classMethods: {
      associate: (models) => {
        Doctors.hasMany(models.Patients);
      },
      isPassword: (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword),
    },
  });
  return Doctors;
};
