import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
  const Patients = sequelize.define("Patients", {
    id : {
      type : DataType.INTEGER,
      primaryKey : true,
      autoIncrement : true
    },
    name : {
      type : DataType.STRING,
      allowNull : false,
      validate: {
        notEmpty: true
      }
    },
    password : {
      type : DataType.STRING,
      allowNull : false,
      validate : {
        notEmpty : true
      }
    },
    email : {
      type : DataType.STRING,
      unique :  true,
      allowNull :  false,
      validade : {
        notEmpty : true
      }
    }
  }, {
    hooks : {
      beforeCreate : patient => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods : {
      associate : models => {
        Patients.hasMany(models.HeartBeats);
      },
      isPassword : (encodedPassword, password) => {
        return bcrypt.compareSync(password, encodedPassword)
      }
    }
  });
  return Patients;
};
