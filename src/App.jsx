import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Main from './layouts/Main'

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  }

  static getDerivedStateFromError (error) {
    return { hasError: true, error }
  }

  componentDidCatch = (error, info) => {
    console.log('catch')
    console.error(error, info)
  }

  render () {
    if (this.state.hasError) {
      return <h2>Whoops, something went wrong.</h2>
    }

    return this.props.children
  }
}

export default class App extends React.Component {
  render () {
    return (
      <ErrorBoundary>
        <Main/>
      </ErrorBoundary>
    )
  }
}
