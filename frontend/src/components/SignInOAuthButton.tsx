import { useSignIn } from '@clerk/clerk-react'

import { Button } from './ui/button'

const SignInOAuthButton = () => {
    const {signIn,isLoaded}=useSignIn()
if(!isLoaded){return null}

const singInWithGoogle = async () => {
signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/auth-callback'
    })
}




  return (
    <Button onClick={singInWithGoogle}>Continue With Google</Button>
  )
}

export default SignInOAuthButton