const sessionIdUserMap = new Map();

function setIdToUser(user, id) {
  sessionIdUserMap.set(user, id);
}

function getUser(id) {
  return sessionIdUserMap.get(id);
}

module.exports = {
  setIdToUser,
  getUser,
};
