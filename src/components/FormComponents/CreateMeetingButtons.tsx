import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingButtons = ({createMeeting, isEdit=false, closeFlyout}: {
  createMeeting: () => void
  isEdit?: boolean
  closeFlyout?: () => void
}) => {
  const navigate = useNavigate()
  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton color='danger' fill  onClick={() => (isEdit ? closeFlyout!() : navigate("/"))}>Cancel</EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton fill onClick={createMeeting}>
          {isEdit ? "Edit Meeting" : "Create Meeting"}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default CreateMeetingButtons