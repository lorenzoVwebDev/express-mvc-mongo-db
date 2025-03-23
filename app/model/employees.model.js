const { v4:uuidv4 } = require('uuid')
const { mysqlQuery, results } = require('../configuration/mysqldb.config.js');
const { errorCreator } = require('../configuration/commonFunctions.js')
const striptags = require('striptags')
const Employees = require('./mongo.schemas/mongo.schema.employees.js')

const modelgetAllEmployees = async () => {
  const employees = await Employees.find()
  
  return [200, employees]
}

const modelgetEmployee = async (id) => {

  if (!id.match(/^[a-zA-Z0-9]+$/)) return [400, {'response':'bad-request'}];

  const employee = await Employees.findOne({ _id: id}).exec()

  if (!employee) return [401, {'response': 'not-found'}];

  return [200, employee]
}

const modelcreateNewEmployee = async (firstname, lastname) => {

  const newEmployee = {
    firstname,
    lastname
  }
  
  const result = await Employees.create(newEmployee);

  if (!result) throw 'db error';

  return [200, newEmployee]
}

const modelupdateEmployee = async (id, firstname, lastname) => {
  if (!id.match(/^[a-zA-Z0-9]+$/)) return [400, {'response':'bad-request'}];

  const employee = await Employees.findOne({ _id: id}).exec()

  if (!employee) return [401 , {'response':'id-not-found'}]
  
  employee.firstname = firstname;
  employee.lastname = lastname;

  const result = await employee.save();

  if (!result) throw 'db error';
  
  return [200, {'response': `updated-employee${id}`}]
}

const modeldeleteEmployee = async (id) => {
  const employees = await new Promise((resolve, reject) => {
    mysqlQuery('SELECT * FROM ??', ['employees'], resolve, reject)
  }).then(data => data).catch(error => {
    throw new Error(error)
  })

  const employee = employees.filter(employee => employee.id == id)[0]

  if (!employee) return [401, {'response':'not-found'}]

  const deleted = await new Promise((resolve, reject) => {
    mysqlQuery('DELETE FROM ?? WHERE id = ?', ['employees', employee.id], resolve, reject)
  }).then(data => data).catch(error => {
    throw new Error(error)
  })

  const sorted = await new Promise((resolve, reject) => {
    mysqlQuery('UPDATE ?? SET id = id - 1 WHERE id > ?', ['employees', employee.id], resolve, reject)
  }).then(data => data).catch(error => {
    throw new Error(error)
  })

  if (deleted) return [200, {'response': `employee${employee.id}-deleted`}];
}

module.exports = {modelgetAllEmployees, modelgetEmployee, modelcreateNewEmployee, modelupdateEmployee, modeldeleteEmployee}