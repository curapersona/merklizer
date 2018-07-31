import * as dicomParser from 'dicom-parser';

const media = {
  resourceType: 'Media',
  type: { value: 1 },
  content: {
    data: { value: '' },
  },
};

let pixelData = null;

const createMedia = (uint8array) => {
  const dataSet = dicomParser.parseDicom(uint8array);
  const pixelDataElement = dataSet.elements.x7fe00010;
  if (pixelDataElement) {
    pixelData = new Uint8Array(
      dataSet.byteArray.buffer,
      pixelDataElement.dataOffset,
      pixelDataElement.length,
    );
  }
  if (pixelData) {
    media.content.data.value = Buffer.from(pixelData).toString('base64');
  }

  return media;
};

export default {
  createMedia,
};
