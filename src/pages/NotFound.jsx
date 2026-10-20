import { Link } from "react-router-dom"
import { useEffect } from "react"

export default function NotFound() {
  useEffect(() => {
    document.title = "Invitation not found"
  }, [])

  return (
    <main className="invite-shell missing">
      <div>
        <p className="script kicker">A missing envelope</p>
        <h1 className="block-title">This invitation could not be found</h1>
        <p className="lede">The link may be incomplete. You can open the sample invitation instead.</p>
        <Link className="btn btn-gold" to="/">
          View the invitation
        </Link>
      </div>
    </main>
  )
}
