function saveAuthToCookie (value) { // 토큰 값을 쿠키에 셋팅
  document.cookie = `accessToken=${value}`
}

function saveUserToCookie (value) { // username 값을 쿠키에 싯팅
  document.cookie = `accessUser=${value}`
}

function getAuthFromCookie () { // 저장된 토큰값 가져오기
  return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function getUserFromCookie () { // 저장된 유저값 가져오기
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)accessUser\s*=\s*([^;]*).*$)|^.*$/, '$1')
}

function deleteCookie (value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}

export default {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie
}
