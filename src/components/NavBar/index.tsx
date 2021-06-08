import React, { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import { CONTRACT_NAME } from '../../config';
import { useEffect } from 'react';

const routes : {name: string; href:string}[] = [
]

const NavBar = () => {
  const [user, setUser] = useState(window.accountId);
  
  const handleLogin = () => {
    window.walletConnection.requestSignIn(CONTRACT_NAME)
  }
  const handleSignOut = () => {
    window.walletConnection.signOut();
    setUser(window.accountId)
  };

  return (
    <Disclosure as="nav" className="border-b border-gray-200 shadow">
      {({ open }) => (
        <>
          <div className="max-w-6xl px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <Link to="/" className="font-medium">
                    Near💡 Idea
                  </Link>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {routes.map((item) => (
                      <Link key={item.name} to={item.href}>
                        <a
                          className={classNames(
                            false
                              ? 'bg-indigo-700 text-white'
                              : 'text-gray-600 hover:ring-indigo-400 hover:ring-2',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="hidden ml-4 sm:block">
                <Search />
              </div> */}
              <div className="absolute inset-y-0 right-0 flex items-center flex-shrink-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="p-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            Hello <span className="font-semibold">{user}</span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700 font-medium'
                                  )}
                                >
                                  {user}
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  onClick={handleSignOut}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  Sign out
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <div className="text-sm font-medium text-gray-700 hover:text-gray-500">
                    <a className="cursor-pointer" onClick={handleLogin} aria-label="Login with NEAR">Login with <span className="font-bold">NEAR</span></a>
                  </div>
                )}

              <a className="ml-3" href="https://github.com/thanhlmm/near-idea" target="_blank">
                <img className="w-8" src="./assets/logo-github.svg" alt="Github" />
              </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* <div className="block px-3 py-2">
                <Search />
              </div> */}
              {routes.map((item) => (
                <Link key={item.name} to={item.href}>
                  <a
                    className={classNames(
                      false
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
