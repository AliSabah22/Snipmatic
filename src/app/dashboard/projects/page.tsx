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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Projects
        </h2>
        <button
          type="button"
          className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold shadow-md transition-all duration-300 bg-gradient-to-r from-amber-200 to-pink-300 hover:from-amber-300 hover:to-pink-400 text-emerald-950 dark:from-amber-300 dark:to-pink-400 dark:hover:from-amber-400 dark:hover:to-pink-500 dark:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 hover:shadow-pink-500/25"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-emerald-950 dark:text-emerald-950" aria-hidden="true" />
          New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="overflow-hidden bg-white dark:bg-black/20 dark:backdrop-blur-sm shadow-lg sm:rounded-xl border border-neutral-200 dark:border-amber-500/30">
        <ul role="list" className="divide-y divide-neutral-200 dark:divide-amber-500/30">
          {projects.map((project) => (
            <li key={project.id} className="hover:bg-neutral-50 dark:hover:bg-black/30 transition-colors duration-150">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="truncate flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row text-sm">
                      <p className="font-semibold text-gray-800 dark:text-amber-100 truncate">
                        {project.name}
                      </p>
                      <p className="sm:ml-2 flex-shrink-0 text-gray-600 dark:text-amber-100/80 truncate">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 items-center">
                    {/* Example status badge - can be made dynamic based on project.status */}
                    <p className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold leading-5 ${ 
                      project.status === 'Active' ? 'bg-emerald-100 dark:bg-emerald-900/70 text-emerald-800 dark:text-emerald-200' : 
                      project.status === 'Completed' ? 'bg-blue-100 dark:bg-blue-900/70 text-blue-800 dark:text-blue-200' : 
                      'bg-amber-100 dark:bg-amber-900/70 text-amber-800 dark:text-amber-200' /* In Progress or other */
                    }`}>
                      {project.status}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500 dark:text-amber-100/70">
                      Last updated {project.lastUpdated}
                    </p>
                  </div>
                  {/* Add action buttons here if needed, e.g., Edit, Delete */}
                  {/* <div className="mt-2 flex items-center space-x-3 sm:mt-0 sm:ml-4">
                    <button type="button" className="text-sm font-medium text-pink-600 dark:text-pink-400 hover:text-pink-500 dark:hover:text-pink-300">Edit</button>
                    <button type="button" className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">Delete</button>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 