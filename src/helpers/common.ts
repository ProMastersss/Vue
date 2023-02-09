export const headers = {
  Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
};

export const getServerUrl = function (path: string) {
  return process.env.VUE_APP_SERVER_HOST + "/" + path;
};
