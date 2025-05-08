import Employee from '../models/Employee';
import express from 'express';
import auth from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose from 'mongoose';
import { imagesUpload } from '../multer';

const employeeRouter = express.Router();

employeeRouter.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.send(employees);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

employeeRouter.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).send('Not found!');
    }

    return res.send(employee);
  } catch (e) {
    return res.status(500).send('Error');
  }
});

employeeRouter.post(
  '/',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const employee = new Employee({
        name: req.body.name,
        number: req.body.number,
        role: req.body.role,
        image: req.file ? 'images/' + req.file.filename : null,
      });

      await employee.save();
      return res.send(employee);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

employeeRouter.put(
  '/:id',
  auth,
  permit('admin'),
  imagesUpload.single('image'),
  async (req, res, next) => {
    try {
      const employee = await Employee.findById(req.params.id);

      if (!employee) {
        return res.status(404).send('Not found');
      }

      employee.name = req.body.name || employee.name;
      employee.number = req.body.number || employee.number;
      employee.role = req.body.role || employee.role;
      employee.image = req.file
        ? 'images/' + req.file.filename
        : employee.image;

      await employee.save();
      return res.send(employee);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      }
      return next(e);
    }
  },
);

employeeRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).send('Not found');
    }
    await employee.deleteOne();
    return res.send('Employee is deleted!');
  } catch (e) {
    return next(e);
  }
});

export default employeeRouter;
