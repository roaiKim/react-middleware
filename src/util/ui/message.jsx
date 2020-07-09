import { message } from 'antd'

// Configure at 1st import
// Toast.config({top: 20});

export function createSuccessMessage (content) {
  message.success(content)
}

export function createErrorMessage (content) {
  message.error(content)
}
