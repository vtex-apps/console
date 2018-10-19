import React, { Component, Fragment } from 'react'
import { Button, EmptyState, Modal, ModalDialog } from 'vtex.styleguide'

interface Props {
  controllers: Controllers
  setControllers: any
}

interface State {
  selectingNewSpec: boolean
}

export default class AddSpecs extends Component<{}, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectingNewSpec: false
    }
  }

  public selectingNewSpec = () => this.setState({selectingNewSpec: true})

  public specSelected = () => this.setState({selectingNewSpec: false})

  public render = () => (
    <Fragment>
      <EmptyState>
        <div className="pt5">
          <Button variation="tertiary" size="small" onClick={this.selectingNewSpec}>
            <span className="flex align-baseline">Select New</span>
          </Button>
        </div>
      </EmptyState>
      {/* <ModalDialog
          centered
          confirmation={{
            label: 'Select',
            onClick: this.specSelected,
          }}
          cancelation={{
            label: 'Cancel',
            onClick: this.specSelected,
          }}
          isOpen={this.state.selectingNewSpec}
          onClose={this.specSelected}
        >
        <h1>Confirm?</h1>
        <p>
          Some child content before the action buttons. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Praesent semper eget magna sit
          amet maximus. In rutrum, justo sodales euismod dignissim, justo orci
          venenatis lectus, vel semper turpis nunc a justo.
        </p>
      </ModalDialog> */}
       {/* <Modal
          centered
          isOpen={this.state.selectingNewSpec}
          onClose={() => this.setState({selectingNewSpec: false})}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Modal> */}
    </Fragment>
  )
}
