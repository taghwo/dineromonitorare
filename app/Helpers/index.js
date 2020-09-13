const getId = async(auth) => {
    const {id} =  await auth.getUser()
    return id
}
const getUser = async(auth) => {
    return  await auth.getUser()
}

module.exports = {
    getId,
    getUser
  }