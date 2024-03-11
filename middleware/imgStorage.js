import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

function getExtension(fileName) {
  const ext = fileName.split('.').pop();
  return ext;
}

function getNameWithoutExt(fileName) {
  const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');
  return fileNameWithoutExt;
}

function deleteImages(fileName) {
  let name = getNameWithoutExt(fileName);
  name = name.split('/');
  name = name[name.length - 1];
  const dirPath = path.resolve('public');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return;
    }
    const matchedFiles = files.filter((file) => file.startsWith(name));
    matchedFiles.forEach((file) => {
      const filePath = path.join(dirPath, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          return;
        }
      });
    });
  });
}

async function deleteImage(fileName) {
  const filePath = path.resolve(path.join('public', fileName));
  fs.unlink(filePath, (err) => {
    if (err) {
      return;
    }
  });
}

async function replaceImage(fileName) {
  const filePath = path.resolve(path.join('public', fileName));
  const newFileName = getNameWithoutExt(fileName) + '.webp';
  const newFilePath = path.resolve(path.join('public', newFileName));
  if (getExtension(fileName) !== 'webp') {
    await sharp(filePath)
      .toFormat('webp')
      .webp({ quality: 75 })
      .toFile(newFilePath);
    await deleteImage(fileName);
  }
  return newFileName;
}

async function sizeImage(fileName, suffix, size) {
  const filePath = path.resolve(path.join('public', fileName));
  const newFileName = getNameWithoutExt(fileName) + suffix + '.webp';
  const newFilePath = path.resolve(path.join('public', newFileName));
  await sharp(filePath).resize(size).toFile(newFilePath);
  return newFileName;
}

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.' + getExtension(file.originalname));
  },
  destination: function (req, file, cb) {
    cb(null, path.join('.', 'public'));
  },
});

const fileFilter = (req, file, cb) => {
  const acceptedExtensions = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/webp',
  ];
  if (acceptedExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const imgUpload = multer({ storage: storage, fileFilter: fileFilter });

export {
  imgUpload,
  deleteImages,
  deleteImage,
  replaceImage,
  sizeImage,
  getExtension,
  getNameWithoutExt,
};
