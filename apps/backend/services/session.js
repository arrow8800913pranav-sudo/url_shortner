const sessionIdUserMap = new Map();

export function setIdToUser(user, id) {
  sessionIdUserMap.set(user, id);
}

export function getUser(id) {
  return sessionIdUserMap.get(id);
}
