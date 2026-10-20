import { Route, Routes, useParams } from "react-router-dom"
import { MotionConfig } from "framer-motion"
import { defaultSlug } from "./data/weddingConfig.js"
import InvitationPage from "./pages/InvitationPage.jsx"
import NotFound from "./pages/NotFound.jsx"

function InvitationRoute() {
  const { slug } = useParams()
  return <InvitationPage key={slug} slug={slug} />
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<InvitationPage key={defaultSlug} slug={defaultSlug} />} />
        <Route path="/wedding/:slug" element={<InvitationRoute />} />
        <Route path="/wedding/:slug/" element={<InvitationRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MotionConfig>
  )
}
