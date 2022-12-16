import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui'
import { addDoc } from 'firebase/firestore'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons'
import MeetingDateField from '../components/FormComponents/MeetingDateField'
import MeetingNameField from '../components/FormComponents/MeetingNameField'
import MeetingUsersField from '../components/FormComponents/MeetingUsersField'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import useFetchUsers from '../hooks/useFetchUsers'
import useToast from '../hooks/useToast'
import { meetingsRef } from '../utils/FirebaseConfig'
import { generateMeetingId } from '../utils/generateMeetingId'
import { FieldErrorType, UserType } from '../utils/Types'

const OneOnOneMeeting = () => {
  useAuth()
  const uid = useAppSelector((state) => state.auth.userInfo?.uid)
  const navigate = useNavigate()
  const [users] = useFetchUsers()
  const [createToast] = useToast()
  const [meetingName, setMeetingName] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment())
  const [showErrors, setShowErrors] = useState<{meetingName: FieldErrorType, meetingUser: FieldErrorType}>({
    meetingName: {
      show: false,
      message: []
    },
    meetingUser: {
      show: false,
      message: []
    }
  })

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions)
  }

  const validateForm = () => {
    let errors = false
    const clonedShowErrors = {...showErrors}

    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true
      clonedShowErrors.meetingName.message = ["Please enter meeting name"]
      errors = true
    } else {
      clonedShowErrors.meetingName.show = false
      clonedShowErrors.meetingName.message = []
    }

    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true
      clonedShowErrors.meetingUser.message = ["Please select a user"]
      errors = true
    } else {
      clonedShowErrors.meetingUser.show = false
      clonedShowErrors.meetingUser.message = []
    }

    setShowErrors(clonedShowErrors)
    return errors
  }

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingId()

      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: "1-on-1",
        invitedUsers:[selectedUsers[0]?.uid],
        meetingDate: startDate.format("L"),
        maxUsers: 1,
        status: true
      })

      createToast({
        title: "Meeting created successfully",
        type: "success"
      })
      
      navigate("/")
    }
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column"
      }}
    >
      <Header />
      <EuiFlexGroup justifyContent='center' alignItems='center'>
        <EuiForm>
          <MeetingNameField 
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />

          <MeetingUsersField
            label="Invite User"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a user"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />

          <MeetingDateField selected={startDate} setStartDate={setStartDate} />

          <EuiSpacer />

          <CreateMeetingButtons createMeeting={createMeeting} />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting