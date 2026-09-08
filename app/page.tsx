import Link from 'next/link';
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Image,
  MessageCircle,
  Sparkles,
  Asterisk,
} from 'lucide-react';
import { projects } from '@/data/projects';

const icons = { image: Image, chat: MessageCircle, code: Code2 };

export default function Home() {
  return (
    <main id="main-content" className="page">
      <section className="intro">
        <div>
          <span className="eyebrow">
            <span className="tiny-dot" /> MY LITTLE CORNER OF THE INTERNET
          </span>
          <h1>
            Small projects.
            <br />
            <span>A little possibility.</span>
          </h1>
          <p>
            Hi, I’m Meltyheart. This is where I keep the things I build —
            <br className="desktop-break" /> handy tools, side projects, and a
            few things just for fun.
          </p>
          <a className="primary-link" href="#projects">
            Explore the projects <ArrowDown size={17} />
          </a>
        </div>
        <div className="intro-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="art-tile tile-image">
            <Image size={34} />
          </div>
          <div className="art-tile tile-code">
            <Code2 size={42} />
          </div>
          <div className="art-tile tile-chat">
            <MessageCircle size={32} />
          </div>
          <Asterisk className="art-star" size={38} />
          <span className="art-dot" />
          <span className="art-caption">always a work in progress</span>
        </div>
      </section>
      <section
        id="projects"
        className="project-section"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE COLLECTION</span>
            <h2 id="projects-title">
              Things I’m building<span className="count">03</span>
            </h2>
          </div>
          <span className="section-note">
            A few useful things. A little fun.
          </span>
        </div>
        <div className="project-grid">
          {projects.map((project) => {
            const Icon = icons[project.icon];
            const content = (
              <>
                <div className="card-top">
                  <span className={`project-icon ${project.icon}`}>
                    <Icon size={25} />
                  </span>
                  <span className={`status ${project.href ? 'ready' : ''}`}>
                    {project.status}
                  </span>
                </div>
                <span className="category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="card-bottom">
                  {project.href ? (
                    <>
                      Explore template <ArrowUpRight size={19} />
                    </>
                  ) : (
                    <span>On the drawing board</span>
                  )}
                </div>
              </>
            );
            return project.href ? (
              <Link
                className="project-card open-card"
                key={project.title}
                href={project.href}
              >
                {content}
              </Link>
            ) : (
              <article className="project-card" key={project.title}>
                {content}
              </article>
            );
          })}
        </div>
      </section>
      <aside className="closing-note">
        <span className="note-icon">
          <Sparkles size={22} />
        </span>
        <div>
          <strong>A small space, with room to grow.</strong>
          <p>
            More experiments will find their way here. Come back and see what’s
            new.
          </p>
        </div>
        <span className="note-decoration" aria-hidden="true">
          ↗
        </span>
      </aside>
    </main>
  );
}
