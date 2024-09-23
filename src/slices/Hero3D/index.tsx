"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";

/**
 * Props for `Hero3D`.
 */
export type Hero3DProps = SliceComponentProps<Content.Hero3DSlice>;

/**
 * Component for "Hero3D" Slices.
 */
const Hero3D = ({ slice }: Hero3DProps): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          ".name-animation",
          { opacity: 0, x: -100, rotate: -10 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            ease: "elastic.out(1, 0.3)",
            duration: 1,
            delay: 0.5,
            transformOrigin: "left top",
            stagger: { each: 0.1, from: "random" },
          }
        )
        .fromTo(
          ".job-title",
          { y: 20, opacity: 0, scale: 1.2 },
          { opacity: 1, y: 0, duration: 1, scale: 1, ease: "back.out(1.7)" }
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return null;
    return name.split("").map((letter, index) => (
      <span
        className={`name-animation name-animation-${key} inline-block opacity-0`}
        key={index}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid min-h-[70vh] grid-cols-1 items-center md:grid-cols-2">
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[0.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero3D;
