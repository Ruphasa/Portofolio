import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, Code2, Briefcase, GraduationCap, Award, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <div className="bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-primary">RF</span>
              <span className="text-secondary">.</span>
            </div>
            <div className="hidden md:flex gap-6">
              {["hero", "about", "skills", "projects", "education", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === section ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section === "hero" ? "Home" : section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === section ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="h-screen snap-section flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4 animate-shape-wipe">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight">
                <span className="inline-block animate-persona-slide" style={{ animationDelay: "0.1s" }}>RIZQI</span>{" "}
                <span className="inline-block animate-persona-slide text-primary" style={{ animationDelay: "0.2s" }}>FAUZAN</span>
              </h1>
              <div className="flex items-center justify-center gap-3 animate-stagger-in" style={{ animationDelay: "0.4s" }}>
                <div className="h-px w-12 bg-primary" />
                <p className="text-xl md:text-2xl text-secondary font-semibold">Mahasiswa D4 Teknik Informatika</p>
                <div className="h-px w-12 bg-primary" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-wider animate-stagger-in" style={{ animationDelay: "0.5s" }}>
                Politeknik Negeri Malang
              </p>
            </div>

            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed animate-stagger-in" style={{ animationDelay: "0.6s" }}>
              Mahasiswa Semester 5 dengan ketertarikan kuat pada pengembangan web, mobile, dan machine learning. 
              Mahir berbahasa Inggris dan Jepang.
            </p>

            <div className="flex flex-wrap gap-4 justify-center animate-stagger-in" style={{ animationDelay: "0.7s" }}>
              <Button 
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
              >
                Lihat Proyek Saya
              </Button>
              <Button 
                onClick={() => scrollToSection("contact")}
                size="lg"
                variant="outline"
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 hover:scale-105"
              >
                Hubungi Saya
              </Button>
            </div>

            <div className="pt-8 animate-stagger-in" style={{ animationDelay: "0.8s" }}>
              <ChevronDown className="w-8 h-8 mx-auto text-primary animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="h-screen snap-section flex items-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Code2 className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Tentang <span className="text-primary">Saya</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent" />
            </div>

            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground/90">
                Kemampuan dalam mengembangkan aplikasi full stack menggunakan <span className="text-primary font-semibold">Laravel</span>, 
                <span className="text-secondary font-semibold"> JavaScript</span>, dan <span className="text-primary font-semibold">Python</span>. 
                Memiliki pengalaman dalam proyek kolaborasi yang berdampak sosial.
              </p>
              <p className="text-foreground/90">
                Dengan keterampilan dalam <span className="text-secondary font-semibold">komunikasi</span>, 
                <span className="text-primary font-semibold"> pemecahan masalah</span>, dan 
                <span className="text-secondary font-semibold"> kolaborasi tim</span>, saya siap berkontribusi dalam 
                pengembangan solusi teknologi yang inovatif dan bermanfaat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="h-screen snap-section flex items-center bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Briefcase className="w-10 h-10 text-secondary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-secondary">Keahlian</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-secondary to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary group-hover:text-primary/80 transition-colors">Hard Skills</CardTitle>
                  <CardDescription>Technical expertise and tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hardSkills.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20 group">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary group-hover:text-secondary/80 transition-colors">Soft Skills</CardTitle>
                  <CardDescription>Personal qualities and abilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill, index) => (
                      <Badge 
                        key={skill} 
                        variant="outline"
                        className="border-secondary/30 hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 cursor-default"
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
      <section id="projects" className="h-screen snap-section flex items-center relative overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <Code2 className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-primary">Proyek</span> Saya
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <Card 
                  key={project.title}
                  className="bg-card/50 border-primary/20 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 group hover:-translate-y-2 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{project.period}</p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed">
                      {project.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge 
                          key={tag}
                          className="bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
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
      <section id="education" className="h-screen snap-section flex items-center bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <GraduationCap className="w-10 h-10 text-secondary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Pendidikan & <span className="text-secondary">Prestasi</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-secondary to-transparent" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-card/50 border-secondary/20 hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <GraduationCap className="w-6 h-6 text-secondary" />
                    <CardTitle className="text-2xl">Pendidikan</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Politeknik Negeri Malang</h3>
                    <p className="text-secondary font-medium">D4 Teknik Informatika</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Agustus 2023 - Sekarang</span>
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30">IPK 3.87</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-primary/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-primary" />
                    <CardTitle className="text-2xl">Prestasi</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-1">🏆 Juara 1 Presentation Hackathon</h3>
                      <p className="text-sm text-muted-foreground">KMIPN 2025 - Politeknik Negeri Padang</p>
                    </div>
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <h3 className="font-semibold text-primary mb-1">💡 Best Innovation</h3>
                      <p className="text-sm text-muted-foreground">Compsphere 2025 - President University</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen snap-section flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="flex-1 h-1 bg-gradient-to-r from-transparent to-primary" />
              <h2 className="text-4xl md:text-5xl font-bold">
                Mari <span className="text-primary">Terhubung</span>
              </h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-primary to-transparent" />
            </div>

            <p className="text-xl text-muted-foreground mb-12">
              Tertarik berkolaborasi? Mari diskusikan proyek Anda!
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a 
                href="mailto:rfrizqifauzan@gmail.com"
                className="p-6 rounded-lg bg-card/50 border border-primary/20 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group"
              >
                <Mail className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-1">Email</p>
                <p className="font-semibold text-foreground">rfrizqifauzan@gmail.com</p>
              </a>

              <a 
                href="tel:+6289776278778"
                className="p-6 rounded-lg bg-card/50 border border-secondary/20 hover:border-secondary/60 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group"
              >
                <Phone className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-sm text-muted-foreground mb-1">Telepon</p>
                <p className="font-semibold text-foreground">+62 897-7627-8778</p>
              </a>
            </div>

            <div className="flex justify-center gap-6">
              <a 
                href="https://linkedin.com/in/ruphasa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/Ruphasa"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-primary/20 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 group"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://bit.ly/Porto_Rizqi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-secondary/20 hover:border-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110 group"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-primary/20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 <span className="text-primary font-semibold">Rizqi Fauzan</span>. Designed with passion.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
