import React from 'react'
import {
  AragonApp,
  Button,
  Text,
  TextInput,
  RadioGroup,
  observe
} from '@aragon/ui'
import Aragon, { providers } from '@aragon/client'
import styled from 'styled-components'

const AppContainer = styled(AragonApp)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default class App extends React.Component {
  render () {
    return (
      <AppContainer>
        <div>
    {/*<VoteCount observable={this.props.observable} />*/}
          <AddVoter app={this.props.app} />
          <Vote app={this.props.app} /> 
          <GetResult app={this.props.app}/>
        </div>
      </AppContainer>
    )
  }
}

class AddVoter extends React.Component {
  constructor(props){
    super(props)
    this.state = { address: ''}
  }
  updateAddress = (e) => {
    this.setState({address: e.target.value})
  }
  render() {
    const { address } = this.state;
    return (
      <div>
        <TextInput type='text' value={address} onChange={this.updateAddress} />
        <Button onClick={() => this.props.app.addVoter(address)}>Submit</Button>
      </div> 
    )
  }
}

class Vote extends React.Component {
  constructor(props){
    super(props)
    this.state = { vote: ''}
  }
  handleVote = (e) => {
    this.setState({vote: e.target.value})
  }
  render() {
    const { vote } = this.state;
    return (
      <RadioGroup name="group" onChange={this.handleVote}>
        {["true", "false"].map((label, i) => {
          <Label key={i} label={label}>
            <RadioButton
              inline
              checked={label === value}
              value={label}
            />
          </Label>
        })}
      </RadioGroup>
    )
  }
}

class GetResult extends React.Componenet {
  state = {
    value: ''
  }
  updateVote = () => {
    this.setState({value: this.props.app.getResult()})
  }
  render () {
    return (
      <div>
        <Button onClick={() => this.updateVote()}>Update</Button>
        <Text>{this.state.value}</Text>
      </div>
    )
  }
}

const VoteCount = observe(
  (state$) => state$,
  { inFavour: 0, against:0 }
)(
  ({ count }) => <Text.Block style={{ textAlign: 'center' }} size='xxlarge'>For: {inFavour} Against: {against}</Text.Block>
)
