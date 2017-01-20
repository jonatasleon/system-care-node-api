module.exports = {
  database: "system_care",
  username:"root",
  password:"root",
  params:{
    dialect :"mysql",
    define : {
      underscored:true
    }
  },
  jwtSecret :"S1$C4r3 - AP!",
  jwtSession : {session : false}
};
