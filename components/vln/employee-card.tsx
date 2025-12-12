"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Github, Linkedin, Mail, Send } from "lucide-react";

interface EmployeeCardProps {
  name: string;
  role: string;
  shortIntro: string;
  fullBio: string;
  github?: string;
  linkedin?: string;
  email?: string;
  telegram?: string;
  imageUrl?: string;
}

export default function EmployeeCard({
  name,
  role,
  shortIntro,
  fullBio,
  github,
  linkedin,
  email,
  telegram,
  imageUrl = "/placeholder-avatar.svg",
}: EmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="group p-6 sm:p-8 rounded-vln border-2 border-vln-sage/20 hover:border-vln-sage/40 bg-vln-bg transition-all duration-300 glow-lift hover:-translate-y-1">
      {/* Header with Photo and Name */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-vln overflow-hidden border-2 border-vln-sage/30">
          <Image
            src={imageUrl}
            alt={`${name} headshot`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-2xl sm:text-3xl font-bold text-vln-white mb-1">
            {name}
          </h3>
          <p className="text-vln-sage text-sm sm:text-base font-medium mb-2">
            {role}
          </p>
        </div>
      </div>

      {/* Short Intro */}
      <p className="text-vln-gray leading-relaxed mb-4">
        {shortIntro}
      </p>

      {/* Social Links */}
      <div className="flex flex-wrap gap-3 mb-4">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-vln border border-vln-sage/30 hover:border-vln-sage/60 bg-vln-sage/10 hover:bg-vln-sage/20 text-vln-sage transition-all duration-200"
            aria-label={`${name}'s GitHub`}
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">GitHub</span>
          </a>
        )}
        {linkedin && linkedin.length > 30 && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-vln border border-vln-bluegray/30 hover:border-vln-bluegray/60 bg-vln-bluegray/10 hover:bg-vln-bluegray/20 text-vln-bluegray transition-all duration-200"
            aria-label={`${name}'s LinkedIn`}
          >
            <Linkedin className="w-4 h-4" />
            <span className="text-sm">LinkedIn</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-vln border border-vln-amber/30 hover:border-vln-amber/60 bg-vln-amber/10 hover:bg-vln-amber/20 text-vln-amber transition-all duration-200"
            aria-label={`Email ${name}`}
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Email</span>
          </a>
        )}
        {telegram && (
          <a
            href={telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-vln border border-vln-purple/30 hover:border-vln-purple/60 bg-vln-purple/10 hover:bg-vln-purple/20 text-vln-purple transition-all duration-200"
            aria-label={`${name}'s Telegram`}
          >
            <Send className="w-4 h-4" />
            <span className="text-sm">Telegram</span>
          </a>
        )}
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-vln border border-vln-sage/30 hover:border-vln-sage/50 bg-vln-bg hover:bg-vln-sage/5 text-vln-sage transition-all duration-200"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse ${name}'s bio` : `Expand ${name}'s bio`}
      >
        <span className="font-medium">
          {isExpanded ? "Show Less" : "Read More"}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expandable Bio */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 rounded-vln bg-vln-bg-light border border-vln-sage/10">
          <p className="text-vln-gray leading-relaxed whitespace-pre-line">
            {fullBio}
          </p>
        </div>
      </div>
    </div>
  );
}
