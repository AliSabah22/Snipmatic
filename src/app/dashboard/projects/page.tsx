'use client';

import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const projects = [
  {
    id: 1,
    name: 'Project Alpha',
    description: 'A revolutionary AI project',
    status: 'Active',
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    name: 'Project Beta',
    description: 'Machine learning implementation',
    status: 'In Progress',
    lastUpdated: '1 day ago',
  },
  {
    id: 3,
    name: 'Project Gamma',
    description: 'Data analysis pipeline',
    status: 'Completed',
    lastUpdated: '3 days ago',
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Projects
        </h2>
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="font-medium text-indigo-600 dark:text-indigo-400 truncate">
                        {project.name}
                      </p>
                      <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-2 flex flex-shrink-0">
                    <p className="inline-flex rounded-full bg-green-100 dark:bg-green-900 px-2 text-xs font-semibold leading-5 text-green-800 dark:text-green-200">
                      {project.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      Last updated {project.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 