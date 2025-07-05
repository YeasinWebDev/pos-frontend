import { useUserQuery } from "../features/auth/authApi"

function User() {
  const {data: user, isLoading ,isError} = useUserQuery({})
  return {user , isLoading ,isError}
}

export default User