'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Search,
  Image,
  Wrench,
  Braces,
  Code2,
  CalendarDays,
  Gamepad2,
  Palette,
  AudioLines,
  FolderOpen,
  LayoutGrid,
  ChevronRight,
} from 'lucide-react';
import { categories, filterProjects, projects } from '@/data/projects';

const icons = [
  Image,
  Wrench,
  Braces,
  Code2,
  CalendarDays,
  AudioLines,
  FolderOpen,
  LayoutGrid,
  ChevronRight,
  Gamepad2,
  Palette,
];

export function AppDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const visible = filterProjects(query, category);
  return (
    <section
      id="projects"
      className="project-section directory"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">PICK SOMETHING & PLAY</span>
          <h2 id="projects-title">
            Browse the collection{' '}
            <span className="count">{projects.length}</span>
          </h2>
        </div>
        <span className="section-note">Useful tools. Happy distractions.</span>
      </div>
      <div className="directory-controls">
        <label className="search-field">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Search apps</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find an app, a tool, a little inspiration…"
          />
        </label>
        <label className="category-select">
          <span className="sr-only">Category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All categories</option>
            {categories.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="directory-layout">
        <aside
          className="collection-rail category-rail"
          aria-label="App categories"
        >
          <h3>
            <FolderOpen size={18} aria-hidden="true" /> Categories
          </h3>
          <div className="category-tabs" aria-label="Filter by category">
            {['All', ...categories].map((value) => {
              const Icon =
                value === 'All'
                  ? LayoutGrid
                  : icons[categories.indexOf(value)] || Code2;
              const count =
                value === 'All'
                  ? projects.length
                  : projects.filter((project) => project.category === value)
                      .length;
              return (
                <button
                  type="button"
                  key={value}
                  aria-pressed={category === value}
                  onClick={() => setCategory(value)}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{value === 'All' ? 'All apps' : value}</span>
                  <span className="category-count">{count}</span>
                  <ChevronRight size={14} aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </aside>
        <div className="directory-results">
          <output className="result-count" aria-live="polite">
            {visible.length} of {projects.length} apps
            {category !== 'All' ? ` · ${category}` : ''}
          </output>
          <div className="project-grid">
            {visible.map((project) => {
              const index = categories.indexOf(project.category);
              const Icon = icons[index] || Code2;
              return (
                <Link
                  prefetch={false}
                  className="project-card open-card"
                  key={project.slug}
                  href={`/script-apps?app=${project.slug}`}
                >
                  <div className="card-top">
                    <span className={`project-icon app-color-${index}`}>
                      <Icon size={24} />
                    </span>
                    <ArrowUpRight className="card-arrow" size={19} />
                  </div>
                  <span className="category">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="card-bottom">
                    Open app{' '}
                    <span className="app-number">
                      {project.slug.slice(0, 3)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          {!visible.length && (
            <div className="directory-empty">
              <Search size={30} />
              <h3>No apps found</h3>
              <p>Try a different name or category.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setCategory('All');
                }}
              >
                Show all apps
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
