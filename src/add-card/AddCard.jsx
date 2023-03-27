import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { cardActions } from '_store'
import {
  formatCreditCardNumber,
  formatExpirationDate,
  formatCVC,
} from '../_helpers'

export { AddCard }

function AddCard() {
  const [state, setState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "VISA",
    focused: "",
  })
  const dispatch = useDispatch();

  const handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    setState({ [target.name]: target.value })
  }

  const handleInputFocus = ({ target }) => {
    setState({
      focused: target.name,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { issuer } = state
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value
        return acc
      }, {})
console.log('formData =', formData);
      dispatch(cardActions.addCard(
        {
          "name": formData.name,
          "cardExpiration": formData.expiry,
          "cardHolder": formData.name,
          "cardNumber": formData.number,
          "category": issuer
        }
      ))
    // setState({ formData })
    // this.form.reset();
  }

  return (
    <div className="card">
      <h4 className="card-header">Create card</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="tel"
              name="number"
              className="form-control"
              placeholder="Card Number"
              pattern="[\d| ]{16,22}"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            <small>E.g.: 49..., 51..., 36..., 37...</small>
          </div>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="tel"
                name="expiry"
                className="form-control"
                placeholder="Valid Thru"
                pattern="\d\d/\d\d"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="col-6">
              <input
                type="tel"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-primary btn-block">PAY</button>
          </div>
        </form>
      </div>
    </div>
  )
}
