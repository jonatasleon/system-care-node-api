module.exports = {
  database : "system_care_test",
  username : "root",
  password : "root",
  params : {
    dialect : "mysql",
    define : {
      underscored : true
    }
  },
  jwtSecret : "SYSCARE - API",
  jwtSession : {session : false}
};
