import Image from "next/image";
import { MoveRight } from "lucide-react";
import { PROJECTS, type Project } from "@/app/data/site-data";

function ProjectCard({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 sm:gap-8 lg:gap-12 group cursor-pointer`}
    >
      {/* Image */}
      <div className="grow aspect-4/3 sm:aspect-16/10 bg-neutral-100 overflow-hidden relative rounded-sm">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
        />
        {/* Overlay — visible on touch devices via active */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="px-6 py-4 sm:p-12 border border-white/20 backdrop-blur-md">
            <span className="text-white text-[10px] sm:text-xs font-black uppercase tracking-widest">
              Detail Proyek
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="lg:w-1/3 flex flex-col justify-end pb-0 lg:pb-12">
        <div className="flex items-center gap-4 mb-3 sm:mb-4">
          <span className="font-mono text-xs sm:text-sm opacity-30">
            {project.id}
          </span>
          <div className="h-px grow bg-black/10" />
        </div>
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-3 sm:mb-4 group-hover:ml-2 lg:group-hover:ml-4 transition-all duration-500">
          {project.title}
        </h3>
        <div className="grid grid-cols-3 gap-4 border-t border-black/5 pt-4 sm:pt-6 uppercase text-[10px] font-bold tracking-widest opacity-60">
          <div>
            <span className="block opacity-40 mb-1">Kategori</span>
            {project.category}
          </div>
          <div>
            <span className="block opacity-40 mb-1">Luas</span>
            {project.size}
          </div>
          <div>
            <span className="block opacity-40 mb-1">Tahun</span>
            {project.year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="karya" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-12 sm:mb-16 lg:mb-20">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
              Proyek Terpilih
            </h2>
            <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-black mt-3 sm:mt-4" />
          </div>
          <a
            href="#"
            className="flex items-center gap-2 group text-[10px] sm:text-xs font-bold uppercase tracking-widest self-start sm:self-auto"
          >
            Lihat Semua Karya
            <MoveRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-16 sm:gap-24 lg:gap-32">
          {PROJECTS.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              reversed={idx % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
