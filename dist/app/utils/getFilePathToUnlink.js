"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImagePathToUnlink = exports.getFilePathToUnlink = void 0;
const getFilePathToUnlink = (file) => {
    const getFileName = file.substring(file.lastIndexOf('/') + 1);
    const fileToUnlink = `public\\files\\${getFileName}`;
    return fileToUnlink;
};
exports.getFilePathToUnlink = getFilePathToUnlink;
const getImagePathToUnlink = (file) => {
    const getFileName = file.substring(file.lastIndexOf('/') + 1);
    const imageToUnlink = `public\\images\\${getFileName}`;
    return imageToUnlink;
};
exports.getImagePathToUnlink = getImagePathToUnlink;
