import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const user = {
    nickname: 'john.doe',
  }

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 h-15">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          {/* Image and Link to the far left */}
          <div className="flex items-start space-x-3">
            <Link
              to={'/'}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                CineQueue
              </span>
            </Link>
          </div>

          <NavGroup>
            <IfAuthenticated>
              <div className="relative">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 relative"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={handleNavMenuClick}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={
                      user?.picture ||
                      '/docs/images/people/profile-picture-3.jpg'
                    }
                    alt="account"
                  />
                </button>

                {toggledNavMenu && (
                  <div
                    className="z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-2 right-0 left-auto"
                    id="user-dropdown"
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900 dark:text-white">
                        {user?.name || 'User'}
                      </span>
                      <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                        {user?.email || 'email@example.com'}
                      </span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/watchlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Watchlist
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/seen"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Previously Watched
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleSignOut}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </IfAuthenticated>
            <IfNotAuthenticated>
              <NavButton onClick={handleSignIn} className="text-white">
                Sign in
              </NavButton>
            </IfNotAuthenticated>
          </NavGroup>
        </div>
      </nav>
    </>
  )
}

export default Nav
