import request from 'request';

export const post = (path, payload, cb) => {
  request.post(path).form(payload);
};
