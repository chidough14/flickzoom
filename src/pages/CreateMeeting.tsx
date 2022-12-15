import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import meeting2 from '../assets/meeting2.png'
import meeting1 from '../assets/meeting1.png'

const CreateMeeting = () => {
  useAuth()
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column"
      }} 
    >
      <Header />
      <EuiFlexGroup justifyContent='center' alignItems='center' style={{margin: "5vh 10vw"}}>
        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="100%" alt='icon' src={meeting1} />}
            title={'Create 1 on 1 meeting'}
            description="Create a single person meeting"
            onClick={() => navigate("/create1on1")}
            paddingSize="xl"
          />
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiCard
            icon={<EuiImage size="100%" alt='icon' src={meeting2} />}
            title={'Create video conference'}
            description="Invite multiple people to the meeting"
            onClick={() => navigate("/videoconference")}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting