import React from 'react'

export const Navigation: React.FC = () => {
  return (
    <nav>
      <ul className="flex gap-2 items-center">
        <li>
          <a className="btn-custom variant-tab" href="" title="Your Board">
            Login
          </a>
        </li>
        <li>
          <a className="btn-custom variant-tab" href="" title="Your Board">
            Statistics
          </a>
        </li>
        <li>
          <a className="btn-custom variant-tab" href="" title="Your Board">
            Resources
          </a>
        </li>
        <li>
          <a className="btn-custom variant-tab" href="" title="Your Board">
            Links
          </a>
        </li>
      </ul>
    </nav>
  )
}
