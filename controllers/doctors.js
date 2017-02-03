import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorReponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class DoctorsController {
  constructor(Doctors) {
    this.Doctors = Doctors;
  }

  getById(id) {
    return this.Doctors.findOne({ where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message));
  }
  update(patient, id) {
    return this.Doctors.update(patient, { where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default DoctorsController;
