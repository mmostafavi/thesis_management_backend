export default (isAuth: Boolean, userDataFromToken: any, userId: string) => {
  return (
    isAuth &&
    userDataFromToken.departmentInfo.manager === userId &&
    userDataFromToken.tokenType === 'instructor'
  )
}
