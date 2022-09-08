import { Fragment, useEffect, useState } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { SearchIcon } from "../node_modules/@heroicons/react/outline";
import { projects } from "./contants";

export default function ComantPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredProjects = query
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    function onKeydown(event) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => {
      window.removeEventListener("keydown", onKeydown);
    };
  }, [isOpen]);

  return (
    <Transition.Root
      as={Fragment}
      show={isOpen}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={setIsOpen}
        className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-300/75" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="relative bg-gray-300 text-neutral-600 max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100 overflow-hidden"
            onChange={(project) => {
              setIsOpen(false);
            }}
          >
            <div className="flex items-center px-4">
              <SearchIcon className="h-6 w-6 text-gray-500" />
              <Combobox.Input
                className="w-full bg-transparent border-0 focus:ring-0 text-sm text-gray-800 h-12"
                placeholder="Search"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
            </div>
            {filteredProjects.length > 0 && (
              <Combobox.Options
                static
                className="max-h-96 overflow-y-auto py-4 text-sm"
              >
                {filteredProjects.map((project) => (
                  <Combobox.Option key={project.id} value={project}>
                    {({ active }) => (
                      <div
                        className={`cursor-pointer rounded-md px-4 py-3 space-x-1 hover:bg-gray-500/60`}
                      >
                        <span
                          className={`font-medium ${
                            active ? "text-white" : "text-gray-900"
                          } `}
                        >
                          {project.title}
                        </span>
                        <span
                          className={`${
                            active ? "text-indigo-200" : "text-gray-400"
                          }`}
                        >
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filteredProjects.length === 0 && (
              <p className="p-4 text-sm text-gray-500">No results found.</p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
