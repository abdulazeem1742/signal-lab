import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProjectPreview } from "@/components/work/ProjectPreview";
import { getProjectBySlug, projects } from "@/data/projects";
import { SITE } from "@/lib/constants";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} · ${SITE.name}`,
      description: project.description,
    },
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main id="main" className="page-content pt-[var(--nav-height)]">
        <article>
          <Container className="py-section">
            <Link
              href="/#work"
              className="mb-10 inline-flex items-center gap-2 text-small text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <ArrowLeft className="size-4" aria-hidden />
              All work
            </Link>

            <p className="text-caption text-accent mb-4">
              {project.number} · {project.category} · {project.year}
            </p>

            <h1 className="text-hero max-w-4xl">{project.title}</h1>

            <p className="mt-8 max-w-2xl text-subheading text-muted-foreground text-pretty font-normal">
              {project.description}
            </p>

            <ProjectPreview project={project} className="mt-12 md:mt-16" />

            <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="text-caption text-muted mb-4">Technologies</h2>
                <ul className="flex flex-col gap-2">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="text-small text-foreground">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <h2 className="text-caption text-muted mb-4">Overview</h2>
                <p className="text-body text-muted-foreground text-pretty">
                  {project.description} Built in partnership with the client
                  team — from early narrative and information architecture
                  through production engineering and launch.
                </p>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-6 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-caption text-muted mb-2">Next project</p>
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="font-display text-2xl font-bold tracking-tight hover:text-accent transition-colors duration-300"
                >
                  {nextProject.title}
                </Link>
              </div>
              <Button href={`mailto:${SITE.email}`} variant="primary" external>
                Start a project
                <ArrowUpRight className="size-4" aria-hidden />
              </Button>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
