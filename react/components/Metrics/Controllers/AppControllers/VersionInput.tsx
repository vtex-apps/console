import { any } from 'ramda'
import React, { Component } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'
import * as semver from 'semver'
import { Input } from 'vtex.styleguide'

import { getAppVersion } from '../../../../common/utils'
import { AppContext } from '../../Contexts/AppContext'


interface State {
  inputIsNotSemver: boolean
}


const semverRangesRegex = [
  /([0-9])+\.x/,
  /([0-9])+\.([0-9])+\.x/,
  /\bv?(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[\da-z-]+(?:\.[\da-z-]+)*)?(?:\+[\da-z-]+(?:\.[\da-z-]+)*)?\b/,
]

const isValidVersion = (version: string) => any((regex: RegExp) => regex.test(version), semverRangesRegex)

class VersionInput extends Component<InjectedIntlProps, State> {
  constructor(props: InjectedIntlProps) {
    super(props)
    this.state = {
      inputIsNotSemver: false,
    }
  }

  public setStateAsync(state: State) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    })
  }

  public render() {
    return (
      <AppContext.Consumer>
        {({ appControllers, setAppControllers }) => (
          <Input
            placeholder={appControllers.appVersion || 'Ex: 1.0.x'}
            label={this.props.intl.formatMessage({ id: 'console.app.version' })}
            onChange={(event: any) => this.parseInputAndSetState(event.target.value, appControllers, setAppControllers)}
            errorMessage={this.state.inputIsNotSemver ? 'Version is not in the SemVer spec' : ''}
          />
        )}
      </AppContext.Consumer>
    )
  }

  private parseInputAndSetState = (version: string, appControllers: AppController, setAppControllers: SetAppControllers) => {
    const isValid = version.length === 0 || isValidVersion(version)
    if (!isValid) {
      this.setState({ inputIsNotSemver: true })
    } else {
      this.setState(
        { inputIsNotSemver: false },
        () => this.updateAppControllers(version, appControllers, setAppControllers)
      )
    }
  }

  private updateAppControllers = (version: string, appControllers: AppController, setAppControllers: SetAppControllers) => {
    let chosenMajor = ''
    let chosenMinor = ''
    let chosenPatch = ''
    try {
      const { major, minor, patch } = semver.parse(version) as any
      chosenMajor = major
      chosenMinor = minor
      chosenPatch = patch
    } catch (err) {
      const [major, minor, patch] = version.replace('x', '').split('.')
      chosenMajor = major
      chosenMinor = minor
      chosenPatch = patch
    }

    const appVersion = getAppVersion(String(chosenMajor), String(chosenMinor), String(chosenPatch))
    setAppControllers({
      ...appControllers,
      appVersion,
    })
  }
}

export default injectIntl(VersionInput)
