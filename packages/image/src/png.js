import PNG from '@tiger-za-pdf/png-js';

PNG.isValid = function(data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

export default PNG;
