"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";

const slides = [
  {
    kicker: "WELCOME TO RABYTE-TECH",
    title: "Discover Premium Digital Products & Assets",
    desc: "The premier directory for Notion templates, e-books, design resources, and marketing funnels. Built by creators, for creators.",
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    link: "/products"
  },
  {
    kicker: "FOR CREATORS",
    title: "Zero Fees. Direct Links.",
    desc: "Import your Gumroad, Lemon Squeezy, or custom checkout links. We drive traffic to your digital products, you keep 100% of the sales.",
    bg: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2000&auto=format&fit=crop",
    link: "/submit"
  },
  {
    kicker: "E-BOOKS & GUIDES",
    title: "Scale Your Creator Business",
    desc: "Find proven marketing playbooks, audience growth guides, and step-by-step strategies to monetize your audience effectively.",
    bg: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=2000&auto=format&fit=crop",
    link: "/categories/ebooks"
  },
  {
    kicker: "NOTION TEMPLATES",
    title: "Master Your Productivity",
    desc: "Explore aesthetic and highly functional Notion templates for finance tracking, project management, and daily journaling.",
    bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
    link: "/categories/templates"
  },
  {
    kicker: "DESIGN & UI ASSETS",
    title: "Premium Design Resources",
    desc: "Elevate your brand with high-quality UI kits, slide deck templates, and exclusive icon packs crafted by top designers.",
    bg: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    link: "/categories/design"
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds per slide for cinematic feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider-wrapper">
      {slides.map((slide, index) => (
        <div key={index} className={`slide ${index === current ? "active" : ""}`}>
          <img src={slide.bg} alt="Background" className="slide-bg" />
          <div className="slide-overlay"></div>
          
          <div className="slide-content">
            <span className="slide-kicker">
              <Icon name="star" size={14} /> {slide.kicker}
            </span>
            <h1 className="slide-title">{slide.title}</h1>
            <p className="slide-desc">{slide.desc}</p>
            <div className="slide-actions">
              <Link href={slide.link} className="btn-slide-primary">
                Explore Now &rarr;
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="slider-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
