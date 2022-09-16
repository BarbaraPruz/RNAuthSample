import { useContext, useState } from 'react'
import AuthContent from '../components/Auth/AuthContent'
import { createUser } from '../utils/auth'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { Alert } from 'react-native'
import { AuthContext } from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser(email, password)
      authCtx.authenticate(token)
    } catch (e) {
      Alert.alert('Signup Failure', 'Please try again')
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }
  return <AuthContent onAuthenticate={signupHandler} />
}

export default SignupScreen
