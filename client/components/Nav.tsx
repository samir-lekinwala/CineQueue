import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const user = {
    nickname: 'john.doe',
  }

  const handleSignOut = () => {
    console.log('sign out')
  }

  const handleSignIn = () => {
    console.log('sign in')
  }

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
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
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="user"
              />
            </button>
            <NavGroup>
              <IfAuthenticated>
                <NavButton onClick={handleSignOut}>Sign out</NavButton>
                {user && <p>Signed in as: {user?.nickname}</p>}
              </IfAuthenticated>
              <IfNotAuthenticated>
                <NavButton onClick={handleSignIn}>Sign in</NavButton>
              </IfNotAuthenticated>
            </NavGroup>
            <h1>Fruit FTW!</h1>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
