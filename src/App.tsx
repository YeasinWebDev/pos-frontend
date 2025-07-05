
import { useState } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Link to="/singin">SignIn</Link>
    <Link to="/signup">SignUp</Link>
   </div>
  )
}

export default App
