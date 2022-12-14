import { EuiFlexGroup, EuiProvider, EuiFlexItem, EuiImage, EuiSpacer, EuiText, EuiTextColor, EuiButton, EuiPanel } from '@elastic/eui'
import React from 'react'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth'
import { query, where, getDocs, addDoc } from 'firebase/firestore'
import animation from '../assets/animation.gif'
import logo from '../assets/logo.png'
import { firebaseAuth, userRef } from '../utils/FirebaseConfig'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../app/slices/AuthSlice'


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/")
  })

  const login = async () => {
    const provider = new GoogleAuthProvider()
    const { user: {displayName, email, uid}} = await signInWithPopup(firebaseAuth, provider)

    if (email) {
      const fireStoreQuery = query(userRef, where("uid", "==", uid))
      const fetchedUsers = await getDocs(fireStoreQuery)

      if (fetchedUsers.docs.length === 0) {
        await addDoc(userRef, {
          uid, 
          name: displayName,
          email
        })
      }
    }

    dispatch(setUser({ uid, name: displayName, email}))
    navigate("/")
  }

  return (
    <EuiProvider colorMode="dark">
      <EuiFlexGroup 
        alignItems='center' 
        justifyContent='center'
        style={{ width: "100vw", height: "100vh"}}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel>
            <EuiFlexGroup justifyContent='center' alignItems='center' >
              <EuiFlexItem>
                <EuiImage
                  alt="logo"
                  src={animation}
                />
              </EuiFlexItem>

              <EuiFlexItem>
                <EuiImage
                  alt="logo"
                  src={logo}
                  size="230px"
                />


                <EuiSpacer size='xs' />

                <EuiText textAlign="center" grow={false}>
                  <h3>
                    <EuiTextColor>One platform to</EuiTextColor>
                    <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
                  </h3>
                </EuiText>

                <EuiSpacer size='l' />

                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup> 
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  )
}

export default Login