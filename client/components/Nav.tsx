import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useState } from 'react'
import DummyNav from './DummyNav.tsx'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const { user, logout, loginWithRedirect } = useAuth0()

  const [toggledNavMenu, setToggledNavMenu] = useState(true)

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  function handleNavMenuClick() {
    setToggledNavMenu((state) => !state)
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 h-15">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
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
          </a>

          <NavGroup>
            <IfAuthenticated>
              <NavButton onClick={handleSignOut}></NavButton>

              {/* {user && <p>Signed in as: {user?.nickname}</p>} */}

              <div className="flex flex-col items-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
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
                {/* <!-- Dropdown menu --> */}
                {toggledNavMenu && (
                  <>
                    {/* <button
                      data-collapse-toggle="navbar-user"
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      aria-controls="navbar-user"
                      aria-expanded="false"
                    > */}
                    <div
                      className="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute inline"
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                          name@flowbite.com
                        </span>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Dashboard
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            Sign out
                          </a>
                        </li>
                      </ul>
                    </div>

                    {/* </button> */}
                  </>
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
