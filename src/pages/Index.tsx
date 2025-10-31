import { useEffect, useState, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Code2, Briefcase, GraduationCap, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(["hero"]));
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            if (entry.isIntersecting) {
              newSet.add(sectionId);
            } else {
              newSet.delete(sectionId);
            }
            return newSet;
          });
        });
      },
      { threshold: 0.2, rootMargin: "0px" }
    );

    const sections = document.querySelectorAll(".snap-section");
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const hardSkills = [
    "Laravel", "Flutter", "React", "Python", "MySQL", "SQLServer", 
    "MongoDB", "PHP", "Dart", "CSS", "HTML", "JavaScript", "Java", 
    "Figma", "Canva"
  ];

  const softSkills = [
    "Leadership", "Teamwork", "Critical Thinking", "Analytical Thinking",
    "Communication", "Problem Solving", "Time Management"
  ];

  const projects = [
    {
      title: "Kolaborasi Malang Autism Center",
      period: "2025 - Sekarang",
      description: "Mengembangkan aplikasi untuk anak autisme non-verbal guna mendukung komunikasi dan pembelajaran.",
      tags: ["Flutter", "Firebase", "Accessibility"]
    },
    {
      title: "PresMa",
      period: "Jan - Jun 2025",
      description: "Website pencatatan prestasi dan rekomendasi lomba dengan metode KNN dan Naive Bayes.",
      tags: ["Laravel", "Machine Learning", "MySQL"]
    },
    {
      title: "KELANews",
      period: "Jun - Des 2024",
      description: "Website berita terkini dengan fitur pencarian dan kategori.",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "SiTaTib",
      period: "Jun - Des 2024",
      description: "Website sistem informasi manajemen tata tertib di JTI Polinema.",
      tags: ["Laravel", "MySQL", "Bootstrap"]
    }
  ];

  return (
    <div className="bg-background text-foreground relative">
      {/* Navigation removed per user request - layout & snap-scroll preserved */}

      {/* Fixed Background Layer - Applies to all sections */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 animate-gradient" 
             style={{ backgroundSize: "200% 200%" }} />
        
        {/* Morphing Blobs - More Dynamic */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 blur-3xl animate-morph" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 blur-3xl animate-morph" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 blur-3xl animate-morph" style={{ animationDelay: "4s" }} />
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-primary/15 blur-3xl animate-morph" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-secondary/15 blur-3xl animate-morph" style={{ animationDelay: "3s" }} />
        
        {/* Floating Particles - Extended */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full particle" 
             style={{ '--tx': '100px', '--ty': '-200px' } as React.CSSProperties} />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full particle" 
             style={{ '--tx': '-150px', '--ty': '-250px', animationDelay: '2s' } as React.CSSProperties} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent rounded-full particle" 
             style={{ '--tx': '200px', '--ty': '-300px', animationDelay: '4s' } as React.CSSProperties} />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-primary/50 rounded-full particle" 
             style={{ '--tx': '-100px', '--ty': '-150px', animationDelay: '1s' } as React.CSSProperties} />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary/50 rounded-full particle" 
             style={{ '--tx': '150px', '--ty': '-200px', animationDelay: '3s' } as React.CSSProperties} />
        <div className="absolute top-10 left-1/2 w-2 h-2 bg-accent rounded-full particle" 
             style={{ '--tx': '-120px', '--ty': '-280px', animationDelay: '1.5s' } as React.CSSProperties} />
        <div className="absolute bottom-10 right-1/2 w-3 h-3 bg-primary rounded-full particle" 
             style={{ '--tx': '180px', '--ty': '-320px', animationDelay: '2.5s' } as React.CSSProperties} />
        <div className="absolute top-1/3 left-1/5 w-2 h-2 bg-secondary rounded-full particle" 
             style={{ '--tx': '140px', '--ty': '-260px', animationDelay: '3.5s' } as React.CSSProperties} />
        <div className="absolute bottom-1/4 right-1/5 w-4 h-4 bg-accent/70 rounded-full particle" 
             style={{ '--tx': '-160px', '--ty': '-240px', animationDelay: '4.5s' } as React.CSSProperties} />
        
        {/* Glow Rings - More Layers */}
        <div className="absolute top-40 right-20 w-64 h-64 rounded-full border-2 border-primary/20 animate-rotate-glow" />
        <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full border-2 border-secondary/20 animate-rotate-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/3 left-1/3 w-56 h-56 rounded-full border border-accent/20 animate-rotate-glow" style={{ animationDelay: "0.75s" }} />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full border border-primary/15 animate-rotate-glow" style={{ animationDelay: "2.25s" }} />
      </div>

      {/* Hero Section */}
      <section id="hero" className="h-screen snap-section flex items-center justify-center relative z-10">
        
        <div className={`container mx-auto px-4 z-10 ${visibleSections.has("hero") ? "animate-shape-wipe" : ""}`}>
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-shape-wipe">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                <span className="inline-block animate-persona-slide drop-shadow-[0_0_30px_rgba(218,84,108,0.5)] hover:scale-110 transition-transform duration-500" 
                      style={{ animationDelay: "0.1s" }}>RIZQI</span>{" "}
                <span className="inline-block animate-persona-slide text-primary drop-shadow-[0_0_50px_rgba(218,84,108,0.8)] animate-text-shimmer hover:scale-110 transition-transform duration-500" 
                      style={{ animationDelay: "0.2s" }}>FAUZAN</span>
              </h1>
              <div className="flex items-center justify-center gap-3 animate-stagger-in" style={{ animationDelay: "0.4s" }}>
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary animate-gradient" style={{ backgroundSize: "200% 200%" }} />
                <p className="text-xl md:text-2xl text-secondary font-semibold drop-shadow-[0_0_20px_rgba(59,130,120,0.5)]">Mahasiswa D4 Teknik Informatika</p>
                <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent animate-gradient" style={{ backgroundSize: "200% 200%" }} />
              </div>
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider animate-stagger-in" style={{ animationDelay: "0.5s" }}>
                Politeknik Negeri Malang
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed animate-stagger-in relative" style={{ animationDelay: "0.6s" }}>
              <span className="relative inline-block">
                Mahasiswa Semester 5 dengan ketertarikan kuat pada 
                <span className="text-primary font-semibold hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.7)] transition-all duration-300"> pengembangan web</span>, 
                <span className="text-secondary font-semibold hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.7)] transition-all duration-300"> mobile</span>, dan 
                <span className="text-accent font-semibold hover:drop-shadow-[0_0_15px_rgba(255,78,78,0.7)] transition-all duration-300"> machine learning</span>. 
                Mahir berbahasa Inggris dan Jepang.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center animate-stagger-in" style={{ animationDelay: "0.7s" }}>
              <Button 
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-500 hover:scale-110 animate-glow-pulse relative overflow-hidden group"
              >
                <span className="relative z-10">Lihat Proyek Saya</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
              </Button>
              <Button 
                onClick={() => scrollToSection("contact")}
                size="lg"
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-6 text-lg transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-secondary/50 relative overflow-hidden group"
              >
                <span className="relative z-10">Hubungi Saya</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/50 to-secondary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </div>

            <div className="pt-8 animate-stagger-in" style={{ animationDelay: "0.8s" }}>
              <ChevronDown className="w-8 h-8 mx-auto text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen snap-section flex items-center relative z-10">
        <div className={`container mx-auto px-4 relative ${visibleSections.has("about") ? "animate-slide-in-diagonal" : "opacity-0"}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12 group">
              <Code2 className="w-10 h-10 text-primary animate-scale-bounce drop-shadow-[0_0_20px_rgba(218,84,108,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(218,84,108,0.9)] transition-all duration-500 group-hover:rotate-12" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Tentang <span className="text-primary drop-shadow-[0_0_30px_rgba(218,84,108,0.7)] hover:scale-110 inline-block transition-transform duration-500">Saya</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary via-accent to-transparent animate-gradient shadow-[0_0_15px_rgba(218,84,108,0.4)]" style={{ backgroundSize: "200% 200%" }} />
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className={`text-foreground/90 ${visibleSections.has("about") ? "animate-stagger-in" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                Kemampuan dalam mengembangkan aplikasi full stack menggunakan <span className="text-primary font-semibold hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.8)] transition-all duration-300 cursor-default">React</span>, 
                <span className="text-secondary font-semibold hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.8)] transition-all duration-300 cursor-default"> JavaScript</span>, dan <span className="text-primary font-semibold hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.8)] transition-all duration-300 cursor-default">Python</span>. 
                Memiliki pengalaman dalam proyek kolaborasi yang berdampak sosial.
              </p>
              <p className={`text-foreground/90 ${visibleSections.has("about") ? "animate-stagger-in" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
                Dengan keterampilan dalam <span className="text-secondary font-semibold hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.8)] transition-all duration-300 cursor-default">komunikasi</span>, 
                <span className="text-primary font-semibold hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.8)] transition-all duration-300 cursor-default"> pemecahan masalah</span>, dan 
                <span className="text-secondary font-semibold hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.8)] transition-all duration-300 cursor-default"> kolaborasi tim</span>, saya siap berkontribusi dalam 
                pengembangan solusi teknologi yang inovatif dan bermanfaat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="h-screen snap-section flex items-center relative z-10">
        <div className={`container mx-auto px-4 relative ${visibleSections.has("skills") ? "animate-zoom-in" : "opacity-0"}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12 group">
              <Briefcase className="w-10 h-10 text-secondary animate-scale-bounce drop-shadow-[0_0_20px_rgba(59,130,120,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(59,130,120,0.9)] transition-all duration-500 group-hover:rotate-[-12deg]" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-secondary drop-shadow-[0_0_30px_rgba(59,130,120,0.7)] hover:scale-110 inline-block transition-transform duration-500">Keahlian</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-secondary via-primary to-transparent animate-gradient shadow-[0_0_15px_rgba(59,130,120,0.4)]" style={{ backgroundSize: "200% 200%" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className={`bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 group hover:-translate-y-3 hover:scale-105 relative overflow-hidden ${visibleSections.has("skills") ? "animate-fade-in-scale" : ""}`} style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl text-primary group-hover:text-primary/80 transition-colors drop-shadow-[0_0_15px_rgba(218,84,108,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(218,84,108,0.7)]">Hard Skills</CardTitle>
                  <CardDescription className="group-hover:text-foreground/70 transition-colors">Technical expertise and tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-500 cursor-default hover:scale-110 hover:shadow-lg hover:shadow-primary/50 animate-fade-in-scale hover:-translate-y-1 hover:rotate-3"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-card/50 border-secondary/20 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 group hover:-translate-y-3 hover:scale-105 relative overflow-hidden ${visibleSections.has("skills") ? "animate-fade-in-scale" : ""}`} style={{ animationDelay: "0.4s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-2xl text-secondary group-hover:text-secondary/80 transition-colors drop-shadow-[0_0_15px_rgba(59,130,120,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,120,0.7)]">Soft Skills</CardTitle>
                  <CardDescription className="group-hover:text-foreground/70 transition-colors">Personal qualities and abilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-all duration-500 cursor-default hover:scale-110 hover:shadow-lg hover:shadow-secondary/50 animate-fade-in-scale hover:-translate-y-1 hover:rotate-[-3deg]"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen snap-section flex items-center relative overflow-y-auto z-10">
        <div className={`container mx-auto px-4 relative ${visibleSections.has("projects") ? "animate-persona-slide" : "opacity-0"}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12 group">
              <Code2 className="w-10 h-10 text-primary animate-scale-bounce drop-shadow-[0_0_20px_rgba(218,84,108,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(218,84,108,0.9)] transition-all duration-500 group-hover:rotate-12" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-primary drop-shadow-[0_0_30px_rgba(218,84,108,0.7)] hover:scale-110 inline-block transition-transform duration-500">Proyek</span> <span className="hover:scale-110 inline-block transition-transform duration-500">Saya</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary via-accent to-transparent animate-gradient shadow-[0_0_15px_rgba(218,84,108,0.4)]" style={{ backgroundSize: "200% 200%" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card 
                  key={project.title}
                  className={`bg-card/50 border-primary/20 hover:border-primary/60 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/40 group hover:-translate-y-4 hover:scale-105 cursor-pointer relative overflow-hidden ${visibleSections.has("projects") ? "animate-fade-in-scale" : ""}`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_rgba(218,84,108,0.6)]" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-500 drop-shadow-[0_0_10px_rgba(218,84,108,0)] group-hover:drop-shadow-[0_0_20px_rgba(218,84,108,0.6)]">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">{project.period}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-[0_0_10px_rgba(218,84,108,0)] group-hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.6)]" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <CardDescription className="text-base leading-relaxed group-hover:text-foreground/80 transition-colors">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tag}
                          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-primary/50 cursor-pointer hover:rotate-2 animate-fade-in-scale"
                          style={{ animationDelay: `${(index * 0.15) + (tagIndex * 0.05)}s` }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Achievements Section */}
      <section id="education" className="h-screen snap-section flex items-center relative z-10">
        <div className={`container mx-auto px-4 relative ${visibleSections.has("education") ? "animate-parallax-up" : "opacity-0"}`}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12 group">
              <GraduationCap className="w-10 h-10 text-secondary animate-scale-bounce drop-shadow-[0_0_20px_rgba(59,130,120,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(59,130,120,0.9)] transition-all duration-500 group-hover:rotate-[-12deg]" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="hover:scale-110 inline-block transition-transform duration-500">Pendidikan &</span> <span className="text-secondary drop-shadow-[0_0_30px_rgba(59,130,120,0.7)] hover:scale-110 inline-block transition-transform duration-500">Prestasi</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-secondary via-primary to-transparent animate-gradient shadow-[0_0_15px_rgba(59,130,120,0.4)]" style={{ backgroundSize: "200% 200%" }} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className={`bg-card/50 border-secondary/20 hover:border-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/30 hover:-translate-y-3 hover:scale-105 relative overflow-hidden group ${visibleSections.has("education") ? "animate-fade-in-scale" : ""}`} style={{ animationDelay: "0.2s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_rgba(59,130,120,0.6)]" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(59,130,120,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,120,0.8)]" />
                    <CardTitle className="text-2xl group-hover:text-secondary transition-colors drop-shadow-[0_0_10px_rgba(59,130,120,0)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.5)]">Pendidikan</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-foreground/90 transition-colors">Politeknik Negeri Malang</h3>
                    <p className="text-secondary font-medium drop-shadow-[0_0_10px_rgba(59,130,120,0)] group-hover:drop-shadow-[0_0_15px_rgba(59,130,120,0.5)] transition-all duration-500">D4 Teknik Informatika</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Agustus 2023 - Sekarang</span>
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30 hover:bg-secondary hover:text-secondary-foreground hover:scale-110 transition-all duration-500 hover:shadow-lg hover:shadow-secondary/50">IPK 3.87</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-3 hover:scale-105 relative overflow-hidden group ${visibleSections.has("education") ? "animate-fade-in-scale" : ""}`} style={{ animationDelay: "0.4s" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_rgba(218,84,108,0.6)]" />
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(218,84,108,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(218,84,108,0.8)]" />
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors drop-shadow-[0_0_10px_rgba(218,84,108,0)] group-hover:drop-shadow-[0_0_15px_rgba(218,84,108,0.5)]">Prestasi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 relative z-10">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 cursor-pointer group/item relative overflow-hidden hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 origin-top" />
                      <h3 className="font-semibold text-primary mb-1 relative z-10 drop-shadow-[0_0_10px_rgba(218,84,108,0)] group-hover/item:drop-shadow-[0_0_15px_rgba(218,84,108,0.5)] transition-all duration-500">🏆 Juara 1 Presentation Hackathon</h3>
                      <p className="text-sm text-muted-foreground relative z-10 group-hover/item:text-muted-foreground/80 transition-colors">KMIPN 2025 - Politeknik Negeri Padang</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 cursor-pointer group/item relative overflow-hidden hover:-translate-y-1">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-transparent scale-y-0 group-hover/item:scale-y-100 transition-transform duration-500 origin-top" />
                      <h3 className="font-semibold text-primary mb-1 relative z-10 drop-shadow-[0_0_10px_rgba(218,84,108,0)] group-hover/item:drop-shadow-[0_0_15px_rgba(218,84,108,0.5)] transition-all duration-500">💡 Best Innovation</h3>
                      <p className="text-sm text-muted-foreground relative z-10 group-hover/item:text-muted-foreground/80 transition-colors">Compsphere 2025 - President University</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen snap-section flex items-center relative z-10">
        <div className={`container mx-auto px-4 relative ${visibleSections.has("contact") ? "animate-shape-wipe" : "opacity-0"}`}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-primary animate-gradient shadow-[0_0_10px_rgba(218,84,108,0.4)]" style={{ backgroundSize: "200% 200%" }} />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="hover:scale-110 inline-block transition-transform duration-500">Mari</span> <span className="text-primary drop-shadow-[0_0_30px_rgba(218,84,108,0.7)] hover:scale-110 inline-block transition-transform duration-500">Terhubung</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent animate-gradient shadow-[0_0_10px_rgba(218,84,108,0.4)]" style={{ backgroundSize: "200% 200%" }} />
            </div>

            <p className={`text-xl text-muted-foreground mb-12 ${visibleSections.has("contact") ? "animate-stagger-in" : ""}`} style={{ animationDelay: "0.2s" }}>
              Tertarik berkolaborasi? Mari diskusikan proyek Anda!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a 
                href="mailto:rfrizqifauzan@gmail.com"
                className={`p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-500 group hover:-translate-y-3 hover:scale-105 relative overflow-hidden ${visibleSections.has("contact") ? "animate-fade-in-scale" : ""}`}
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_rgba(218,84,108,0.6)]" />
                <Mail className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-[0_0_15px_rgba(218,84,108,0)] group-hover:drop-shadow-[0_0_25px_rgba(218,84,108,0.7)] relative z-10 group-hover:rotate-12" />
                <p className="text-sm text-muted-foreground mb-1 relative z-10 group-hover:text-muted-foreground/80 transition-colors">Email</p>
                <p className="font-semibold text-foreground relative z-10 group-hover:text-primary transition-colors">rfrizqifauzan@gmail.com</p>
              </a>

              <a 
                href="tel:+6289776278778"
                className={`p-6 rounded-lg bg-card/50 border border-secondary/20 hover:border-secondary/60 hover:shadow-2xl hover:shadow-secondary/40 transition-all duration-500 group hover:-translate-y-3 hover:scale-105 relative overflow-hidden ${visibleSections.has("contact") ? "animate-fade-in-scale" : ""}`}
                style={{ animationDelay: "0.4s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left shadow-[0_0_10px_rgba(59,130,120,0.6)]" />
                <Phone className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-125 transition-all duration-500 drop-shadow-[0_0_15px_rgba(59,130,120,0)] group-hover:drop-shadow-[0_0_25px_rgba(59,130,120,0.7)] relative z-10 group-hover:rotate-12" />
                <p className="text-sm text-muted-foreground mb-1 relative z-10 group-hover:text-muted-foreground/80 transition-colors">Telepon</p>
                <p className="font-semibold text-foreground relative z-10 group-hover:text-secondary transition-colors">+62 897-7627-878</p>
              </a>
            </div>

            <div className={`flex justify-center gap-6 ${visibleSections.has("contact") ? "animate-stagger-in" : ""}`} style={{ animationDelay: "0.5s" }}>
              <a 
                href="https://linkedin.com/in/ruphasa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-125 hover:rotate-12 group relative overflow-hidden animate-glow-pulse"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Linkedin className="w-6 h-6 relative z-10 group-hover:rotate-[-12deg] transition-transform duration-500" />
              </a>
              <a 
                href="https://github.com/Ruphasa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 hover:scale-125 hover:rotate-12 group relative overflow-hidden animate-glow-pulse"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Github className="w-6 h-6 relative z-10 group-hover:rotate-[360deg] transition-transform duration-700" />
              </a>
              <a 
                href="https://bit.ly/Porto_Rizqi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-secondary/20 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-500 hover:scale-125 hover:rotate-12 group relative overflow-hidden animate-glow-pulse"
                style={{ animationDelay: "1s", boxShadow: "0 0 20px rgba(59, 130, 120, 0.3)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ExternalLink className="w-6 h-6 relative z-10 group-hover:scale-125 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/20 relative z-10">
        <div className="container mx-auto px-4 text-center relative">
          <p className="text-muted-foreground">
            © 2025 <span className="text-primary font-semibold drop-shadow-[0_0_10px_rgba(218,84,108,0.5)] hover:drop-shadow-[0_0_20px_rgba(218,84,108,0.8)] transition-all duration-500 cursor-pointer">Rizqi Fauzan</span>. Designed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
