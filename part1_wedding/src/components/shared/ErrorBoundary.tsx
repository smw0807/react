import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallbackUI?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('error : ', error)
    console.log('errorInfo : ', errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackUI ?? <h1>에러가 발생했습니다.</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary
