export default id => {
  const start = window.performance.now();
  return {
    stop: () => console.log(id, window.performance.now() - start),
    getElapsed: () => window.performance.now() - start
  };
};
