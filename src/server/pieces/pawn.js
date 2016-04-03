export default {
  moveDescriptor: {
    diagonal: (isCapture, forwards) => isCapture && forwards,
    cardinal: (isCapture, forwards) => !isCapture && forwards,
    projectable: rank => rank == 2
  },
  getValue: () => 1
};
