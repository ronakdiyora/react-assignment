import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/es/styles-compiled.css'

import { cardActions } from '_store'

export { Home }

function Home() {
  const dispatch = useDispatch()
  const { user: authUser } = useSelector((x) => x.auth)
  const { cards } = useSelector((x) => x.cards)

  useEffect(() => {
    dispatch(cardActions.getAll())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Hi {authUser?.firstName}!</h1>
      <p>You're logged in with React 18 + Redux & JWT!!</p>
      <h3>Cards from secure api end point:</h3>
      {cards &&
        cards.results &&
        cards.results.length &&
        cards.results.map((card) => (
          <Cards
            key={card.id}
            number={card.cardNumber}
            expiry={card.cardExpiration}
            name={card.cardHolder}
            focused={card.focus}
          />
        ))}
      {cards.loading && (
        <div className="spinner-border spinner-border-sm"></div>
      )}
      {cards.error && (
        <div className="text-danger">
          Error loading cards: {cards.error.message}
        </div>
      )}
    </div>
  )
}
