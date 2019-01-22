import { any } from 'ramda'
import React, { Component } from 'react'
import * as semver from 'semver'
import { Input } from 'vtex.styleguide'

interface Props {
  envControllers: EnvController
  setEnvControllers: any
}

interface State {
  inputIsNotSemver: boolean
}

const semverRangesRegex = [
  /([0-9])+\.x/,
  /([0-9])+\.([0-9])+\.x/,
  /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/
]

const isValidVersion = (version: string) => any((regex: RegExp) => regex.test(version), semverRangesRegex)

export default class VersionInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputIsNotSemver: false
    }
  }

  public render = () => (
    <Input
      placeholder="Ex: 1.0.x"
      label="Version"
      onChange={(event: any) => this.parseInputAndSetState(event.target.value)}
      errorMessage={this.state.inputIsNotSemver && 'Version is not in the SemVer spec'}
    />
  )

  private parseInputAndSetState = async (version: string) => {
    const isValid = isValidVersion(version)
    if (!isValid) {
      await this.setState({inputIsNotSemver: true})
    } else {
      await this.setState({inputIsNotSemver: false})
      let chosenMajor = ''
      let chosenMinor = ''
      let chosenPatch = ''
      try {
        const {major, minor, patch} = semver.parse(version) as any
        chosenMajor = major
        chosenMinor = minor
        chosenPatch = patch
      } catch (err) {
        const [major, minor, patch] = version.replace('x', '').split('.')
        chosenMajor = major
        chosenMinor = minor
        chosenPatch = patch
      }

      this.props.setEnvControllers({
        ...this.props.envControllers,
        chosenMajor,
        chosenMinor,
        chosenPatch,
      })
    }
  }
}
