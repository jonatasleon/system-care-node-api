import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

module.exports = app => {
  const Patients =  app.db.models.Patients;
  const cfg = app.libs.config;
  const params = {
    secretOrKey : cfg.jwtSecret,
    jwtFromRequest : ExtractJwt.fromAuthHeader()
  };

  const strategy =  new Strategy(params, (payload, done) => {
    Patients.findById(payload.id)
    .then (patient => {
      if(patient){
        return done (null, {
          id: patient.id,
          email : patient.email
        });
      }
      return done(null, false)
    })
    .catch(error => done(error, null));
  });

  passport.use(strategy);
  return {
    initialize : () => {
      return passport.initialize();
    },
    authenticate : () => {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};
