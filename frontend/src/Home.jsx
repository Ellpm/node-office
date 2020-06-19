import React, { Component } from 'react'

export default class Home extends Component {
  async 

  render() {

    return (
      <>
      <div>Здраствуйте, {localStorage.getItem('email')}</div>
      <div>
        Ваши отпуска:
      </div>

      </>
    )
  }
}
