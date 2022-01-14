const express = require('express');
const router = express.Router();
const photoModel = require('../models/photo.model');
const httpStatus = require('http-status-codes');

router.post('/add', async (req, res) => {
  console.log(req.photo);
  let photo = new photoModel({
    image: req.body.image,
    description: req.body.description,
  });
  photo = await photo.save();
  if (!photo) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error Occured',
    });
  }
  res.status(httpStatus.StatusCodes.OK).json({
    message: 'Uploaded Successfully',
    data: photo,
  });
});

router.get('/list', async (req, res) => {
  const data = await photoModel
    .find({ description: { $elemMatch: { allocation: { $lt: 101 } } } })
    .sort({ creationTime: -1 });
  if (!data) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error Occured',
    });
  }
  res.status(httpStatus.StatusCodes.OK).json({
    message: 'Fetch Successfully',
    data: data,
  });
});

router.get('/list/:id', async (req, res) => {
  const data = await photoModel.findOne({ _id: req.params.id });
  if (!data) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error Occured',
    });
  }
  res.status(httpStatus.StatusCodes.OK).json({
    message: 'Fetch Successfully',
    data: data,
  });
});

router.put('/update/:id', async (req, res) => {
  const obj = {
    image: req.body.image,
    description: req.body.description,
  };
  const data = await photoModel.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: obj }
  );
  console.log(data);
  if (!data) {
    return res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Error Occured',
    });
  }
  res.status(httpStatus.StatusCodes.OK).json({
    message: 'Order Updated Successfully',
    data: data,
  });
});

module.exports = router;
