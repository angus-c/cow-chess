export default id => {
  const start = Date.now();
  return {
    stop: () => console.log(id, Date.now() - start),
    getElapsed: () => Date.now() - start
  };
};
