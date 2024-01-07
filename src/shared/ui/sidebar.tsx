import { Fragment, PropsWithChildren, useMemo } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import { Dialog, Transition } from '@headlessui/react';

interface SidebarProps extends PropsWithChildren {
  title: string;
  isOpen: boolean;
  onClose(): void;
}

export function Sidebar({ title, children, onClose, isOpen }: SidebarProps) {
  const value = useMemo(
    () => ({
      isOpen,
      close: onClose,
    }),
    [isOpen, onClose],
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={value.close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex sm:max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full">
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="hidden sm:flex absolute -left-4 top-0 -ml-8 pr-2 pt-4 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="relative rounded-full text-gray-30 focus:outline-none focus:ring-2 focus:ring-white p-2"
                        onClick={value.close}>
                        <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-auto px-4 bg-white py-6 shadow-xl justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className={`text-xl font-semibold leading-6 text-gray-900`}>
                        {title}
                      </Dialog.Title>
                      <button
                        type="button"
                        className="block sm:hidden relative rounded-full text-gray-30 focus:outline-none focus:ring-2 focus:ring-white p-2 mr-4"
                        onClick={value.close}>
                        <RiCloseLine className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="flex-1">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
