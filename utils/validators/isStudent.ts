export default (isAuth: boolean, userDataFromToken: any, userId: string) => {
  return (
    isAuth &&
    userDataFromToken.userId === userId &&
    userDataFromToken.tokenType === 'student'
  )
}
