import { useState, useEffect, useRef } from "react";
import { ExpandableChat, ExpandableChatHeader, ExpandableChatBody } from "@/components/ui/expandable-chat";
import { MorphingCardStack } from "@/components/ui/morphing-card-stack";
import { Send, Layers, Palette, Clock, Sparkles } from "lucide-react";

/* ═══ IMAGES ═══ */
const IMG = (n) => `/images/${n}`;
const GALLERY_IMG_EXCEL = IMG("gallery_img_excel.jpg");
const EXCEL_2 = IMG("excel_2.jpg");
const EXCEL_3 = IMG("excel_3.jpg");
const GALLERY_IMG_HARDWARE = IMG("gallery_img_hardware.jpg");
const HARDWARE_2 = IMG("hardware_2.jpg");
const HARDWARE_3 = IMG("hardware_3.jpg");
const GALLERY_IMG_ORQUIDEAS = IMG("gallery_img_orquideas.jpg");
const PROJ_GOVIRAL = IMG("proj_goviral.png");
const PROJ_JARDIM = IMG("proj_jardim.png");
const PROJ_UPCLASS = IMG("proj_upclass.png");
const GALLERY_IMG_FLORES = IMG("gallery_img_flores.jpg");
const GALLERY_IMG_FAZENDA = IMG("gallery_img_fazenda.jpg");
const GALLERY_IMG_JARDIM = IMG("gallery_img_jardim.jpg");
const GALLERY_IMG_BAHIA = IMG("gallery_img_bahia.jpg");
const CRM_PAINEL = IMG("crm_painel.jpg");
const CRM_PIPELINE = IMG("crm_pipeline.jpg");
const CRM_LEADS = IMG("crm_leads.jpg");
const SIM_HOME = IMG("sim_home.jpg");
const SIM_DADOS = IMG("sim_dados.jpg");
const SIM_RESULTADOS = IMG("sim_resultados.jpg");
const SIM_CENARIOS = IMG("sim_cenarios.jpg");
const SIM_EXECUTIVA = IMG("sim_executiva.jpg");

/* ═══ HOOKS ═══ */
function useReveal(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ═══ TEXT DISPERSE ═══ */
const dT = [
  { x: -0.8, y: -0.6, r: -29 }, { x: -0.2, y: -0.4, r: -6 }, { x: -0.05, y: 0.1, r: 12 },
  { x: -0.05, y: -0.1, r: -9 }, { x: -0.1, y: 0.55, r: 3 }, { x: 0, y: -0.1, r: 9 },
  { x: 0, y: 0.15, r: -12 }, { x: 0, y: 0.15, r: -17 }, { x: 0, y: -0.65, r: 9 },
  { x: 0.1, y: 0.4, r: 12 }, { x: 0, y: -0.15, r: -9 }, { x: 0.2, y: 0.15, r: 12 },
  { x: 0.8, y: 0.6, r: 20 }, { x: -0.3, y: 0.3, r: 15 }, { x: 0.5, y: -0.5, r: -20 },
];
function TextDisperse({ children, className = "" }) {
  const [a, setA] = useState(false);
  return (
    <span className={`inline-flex cursor-pointer select-none ${className}`} onMouseEnter={() => setA(true)} onMouseLeave={() => setA(false)}>
      {String(children).split("").map((c, i) => {
        const t = dT[i % dT.length];
        return <span key={i} className="inline-block" style={{ transition: "transform 0.75s cubic-bezier(0.33,1,0.68,1)", transform: a ? `translate(${t.x}em,${t.y}em) rotate(${t.r}deg)` : "none" }}>{c === " " ? "\u00A0" : c}</span>;
      })}
    </span>
  );
}

/* ═══ TIMELINE ═══ */
function Timeline({ data }) {
  const ref = useRef(null);
  const cRef = useRef(null);
  const lineRef = useRef(null);
  const [h, setH] = useState(0);
  const rafTL = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(() => setH(ref.current.getBoundingClientRect().height));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    if (!h) return;
    const fn = () => {
      if (rafTL.current) return;
      rafTL.current = requestAnimationFrame(() => {
        rafTL.current = null;
        if (!cRef.current || !lineRef.current) return;
        const r = cRef.current.getBoundingClientRect();
        const vH = window.innerHeight;
        const scrolled = (vH * 0.5 - r.top) / r.height;
        const p = Math.max(0, Math.min(1, scrolled));
        lineRef.current.style.height = (p * h) + "px";
        lineRef.current.style.opacity = Math.min(1, p / 0.1);
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => { window.removeEventListener("scroll", fn); if (rafTL.current) cancelAnimationFrame(rafTL.current); };
  }, [h]);

  return (
    <div className="w-full px-4 md:px-16 lg:px-24" ref={cRef} style={{ paddingLeft: "clamp(1rem, 4vw, calc(1.5cm + 1.5rem))" }}>
      <div ref={ref} className="relative mx-auto pb-20" style={{ maxWidth: "1200px" }}>
        {data.map((item, i) => (
          <div key={i} className="flex justify-start pt-12 md:pt-60 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <h3 className="hidden md:block md:pl-12 font-light" style={{ fontFamily: "var(--ff)", fontSize: "clamp(2rem,4vw,3.8rem)", color: "rgba(255,255,255,0.85)" }}>{item.title}</h3>
            </div>
            <div className="relative pl-14 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 font-light" style={{ fontFamily: "var(--ff)", color: "rgba(255,255,255,0.85)" }}>{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div className="hidden md:block" style={{ height: h + "px", position: "absolute", left: "20px", top: 0, width: "2px", overflow: "hidden", background: "linear-gradient(to bottom,transparent 0%,rgba(255,255,255,0.04) 10%,rgba(255,255,255,0.04) 90%,transparent 99%)", maskImage: "linear-gradient(to bottom,transparent 0%,black 10%,black 90%,transparent 100%)" }}>
          <div ref={lineRef} style={{ height: "0px", opacity: 0, position: "absolute", top: 0, width: "2px", borderRadius: "9999px", background: "linear-gradient(to top,rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.2) 10%,transparent)" }} />
        </div>
      </div>
    </div>
  );
}

/* ═══ WEBGL SMOKE BACKGROUND ═══ */
const smokeFragShader = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}
void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);
  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);
  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);
  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));
  col=mix(vec3(.04),col,min(time*.1,1.));
  col=clamp(col,.04,1.);
  O=vec4(col,1);
}`;

const smokeVertShader = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

class SmokeRenderer {
  constructor(canvas, fragSrc) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2");
    this.color = [0.13, 0.83, 0.93];
    this.program = null; this.vs = null; this.fs = null; this.buffer = null;
    if (this.gl) { this._setup(fragSrc); this._init(); }
  }
  updateColor(c) { this.color = c; }
  updateScale() {
    const dpr = Math.max(1, window.devicePixelRatio * 0.3);
    this.canvas.width = this.canvas.offsetWidth * dpr;
    this.canvas.height = this.canvas.offsetHeight * dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }
  _compile(s, src) { const g = this.gl; g.shaderSource(s, src); g.compileShader(s); }
  _setup(fragSrc) {
    const g = this.gl;
    this.vs = g.createShader(g.VERTEX_SHADER);
    this.fs = g.createShader(g.FRAGMENT_SHADER);
    this._compile(this.vs, smokeVertShader);
    this._compile(this.fs, fragSrc);
    this.program = g.createProgram();
    g.attachShader(this.program, this.vs);
    g.attachShader(this.program, this.fs);
    g.linkProgram(this.program);
  }
  _init() {
    const g = this.gl, p = this.program;
    this.buffer = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
    g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1,1,-1,-1,1,1,1,-1]), g.STATIC_DRAW);
    const pos = g.getAttribLocation(p, "position");
    g.enableVertexAttribArray(pos);
    g.vertexAttribPointer(pos, 2, g.FLOAT, false, 0, 0);
    p._res = g.getUniformLocation(p, "resolution");
    p._time = g.getUniformLocation(p, "time");
    p._color = g.getUniformLocation(p, "u_color");
  }
  render(now = 0) {
    const g = this.gl, p = this.program;
    if (!p) return;
    g.clearColor(0, 0, 0, 1); g.clear(g.COLOR_BUFFER_BIT); g.useProgram(p);
    g.bindBuffer(g.ARRAY_BUFFER, this.buffer);
    g.uniform2f(p._res, this.canvas.width, this.canvas.height);
    g.uniform1f(p._time, now * 1e-3);
    g.uniform3fv(p._color, this.color);
    g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
  }
  reset() {
    const g = this.gl;
    if (this.vs) { g.detachShader(this.program, this.vs); g.deleteShader(this.vs); }
    if (this.fs) { g.detachShader(this.program, this.fs); g.deleteShader(this.fs); }
    if (this.program) g.deleteProgram(this.program);
  }
}

function SmokeBackground({ smokeColor = "#22d3ee" }) {
  const canvasRef = useRef(null);
  const rendRef = useRef(null);
  const visibleRef = useRef(true);
  useEffect(() => {
    if (!canvasRef.current) return;
    const r = new SmokeRenderer(canvasRef.current, smokeFragShader);
    rendRef.current = r;
    const onResize = () => r.updateScale();
    onResize();
    window.addEventListener("resize", onResize);
    let raf, lastFrame = 0;
    const interval = 1000 / 30;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visibleRef.current || now - lastFrame < interval) return;
      lastFrame = now;
      r.render(now);
    };
    loop(0);
    const obs = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting; }, { threshold: 0 });
    if (canvasRef.current.parentElement) obs.observe(canvasRef.current.parentElement);
    return () => { window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); obs.disconnect(); r.reset(); };
  }, []);
  useEffect(() => {
    if (!rendRef.current) return;
    const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(smokeColor);
    if (res) rendRef.current.updateColor([parseInt(res[1],16)/255, parseInt(res[2],16)/255, parseInt(res[3],16)/255]);
  }, [smokeColor]);
  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

/* ═══ HERO ═══ */
function Hero() {
  const [ref, vis] = useReveal(0.05);
  return (
    <section ref={ref} className="relative flex flex-col items-center justify-start overflow-hidden w-full" style={{ backgroundColor: "#0a0a0a", minHeight: "120vh", paddingTop: "clamp(60px, 12vh, 120px)" }}>
      <div className="absolute inset-0 z-0" style={{ opacity: vis ? 0.7 : 0, transition: "opacity 2s ease 0.3s" }}>
        <SmokeBackground smokeColor="#22d3ee" />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 30%, #0a0a0a 80%)" }} />
      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ marginTop: "clamp(30px, 6vh, 80px)" }}>
        <div className={`mb-6 md:mb-10 transition-all duration-[1s] ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`} style={{ transitionDelay: "200ms" }}>
          <div className="w-36 h-36 md:w-64 md:h-64 rounded-full mx-auto overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "2px solid rgba(255,255,255,0.1)", boxShadow: "0 0 60px rgba(34,211,238,0.08)" }}>
            <img src={IMG("inline_img_line350.jpg")} alt="Gustavo" className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
          </div>
        </div>
        <h1 className={`transition-all duration-[1.2s] ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "400ms" }}>
          <span className="block font-light" style={{ fontFamily: "var(--ff)", fontSize: "clamp(3rem,12vw,8rem)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "white", textShadow: "0 0 80px rgba(34,211,238,0.15)" }}>Gustavo</span>
        </h1>
        <p className={`mt-3 md:mt-5 text-base md:text-3xl font-light tracking-wide transition-all duration-[1s] ${vis ? "opacity-100" : "opacity-0 translate-y-8"}`} style={{ fontFamily: "var(--ff)", transitionDelay: "600ms", background: "linear-gradient(to right, #94a3b8, #64748b, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Empreendedor · Inventor de IA · Criador
        </p>
        <p className={`mt-4 md:mt-6 text-sm md:text-lg max-w-lg mx-auto leading-relaxed transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0"}`} style={{ fontFamily: "var(--ff)", fontWeight: 300, transitionDelay: "800ms", color: "rgba(255,255,255,0.3)" }}>
          Co-fundador da <span style={{ color: "rgba(255,255,255,0.7)" }}>UPclass</span> construindo o futuro com código, criatividade e as próprias mãos.
        </p>
        <div className={`flex justify-center gap-10 md:gap-20 mt-8 md:mt-14 mb-6 md:mb-10 transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "1000ms" }}>
          {[{ n: "01", l: "Startup" }, { n: "9", l: "Invenções IA" }, { n: "∞", l: "Ambição" }].map((s, i) => (
            <div key={i}>
              <div className="text-2xl md:text-4xl font-light text-white" style={{ fontFamily: "var(--ff)" }}>{s.n}</div>
              <div className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase mt-1 md:mt-2" style={{ color: "rgba(255,255,255,0.15)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[11]" style={{ background: "linear-gradient(to bottom, transparent, #0a0a0a)" }} />
    </section>
  );
}

/* ═══ QUEM É GUSTAVO ═══ */
function QuemSou() {
  const [ref, vis] = useReveal(0.05);
  return (
    <section id="sobre" ref={ref} className="relative py-20 md:py-60">
      <div className="px-6 md:px-0" style={{ paddingLeft: "clamp(1rem, 4vw, 1.5cm)", paddingRight: "clamp(1rem, 4vw, 1.5cm)" }}>
        <div className={`transition-all duration-[1.2s] ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          <h2 className="font-light" style={{ fontFamily: "var(--ff)", fontSize: "clamp(2.5rem,7vw,7rem)", lineHeight: 0.9, color: "white" }}>Quem é</h2>
          <h2 className="font-light italic" style={{ fontFamily: "var(--ff)", fontSize: "clamp(2.5rem,7vw,7rem)", lineHeight: 0.9, color: "rgba(255,255,255,0.7)", transition: "all 1.2s", transitionDelay: "200ms", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)" }}>Gustavo?</h2>
        </div>
        <div className={`flex flex-col justify-center transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: "500ms", paddingTop: "100px" }}>
          <div className="text-[15px] font-light leading-[1.9]" style={{ fontFamily: "var(--ff)", color: "rgba(255,255,255,0.3)" }}>
            <p>Sou um jovem de 19 anos, nascido na Bahia e criado em São Paulo, que aprendeu desde cedo o valor do trabalho duro. Com um perfil extrovertido, confiante e guiado por resultados, atuo sempre pautado pelo respeito.</p>
            <p className="mt-4">Após construir uma forte base comercial B2B atuando de ponta a ponta na Mundivox, encontrei na Inteligência Artificial minha verdadeira paixão para solucionar gargalos e otimizar processos. Hoje, desenvolvo automações e arquiteturas front e back, transformando dados em eficiência real para os negócios.</p>
            <p className="mt-4">Aplico toda essa visão estratégica como cofundador da UPclass, uma startup de IA focada em revolucionar a educação e preparar alunos para provas. Sigo movido pelo impacto e pronto para o próximo grande desafio.</p>
          </div>
          <div className="pl-5 border-l" style={{ borderColor: "rgba(34,211,238,0.2)", marginTop: "50px" }}>
            <p className="text-xl font-light italic leading-relaxed" style={{ fontFamily: "var(--ff)", color: "rgba(255,255,255,0.4)" }}>"Não precisa crescer para amadurecer."</p>
            <span className="block mt-3 text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>Gustavo</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══ ZOOM PARALLAX ═══ */
function ZoomParallax({ images }) {
  const containerRef = useRef(null);
  const layerRefs = useRef([]);
  const rafRef = useRef(null);
  const visRef = useRef(false);

  useEffect(() => {
    const scaleFactors = [2.5, 3.5, 4, 3.5, 4, 5.5, 6];
    const onScroll = () => {
      if (rafRef.current || !visRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalH = rect.height - window.innerHeight;
        const p = Math.max(0, Math.min(1, -rect.top / totalH));
        layerRefs.current.forEach((el, i) => {
          if (!el) return;
          const s = 1 + (scaleFactors[i % scaleFactors.length] - 1) * p;
          el.style.transform = `scale3d(${s},${s},1)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting; }, { threshold: 0, rootMargin: "200px" });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => { window.removeEventListener("scroll", onScroll); if (rafRef.current) cancelAnimationFrame(rafRef.current); obs.disconnect(); };
  }, []);

  const positions = [
    {},
    { top: "-30vh", left: "5vw", height: "30vh", width: "35vw" },
    { top: "-10vh", left: "-25vw", height: "45vh", width: "20vw" },
    { left: "27.5vw", height: "25vh", width: "25vw" },
    { top: "27.5vh", left: "5vw", height: "25vh", width: "20vw" },
    { top: "27.5vh", left: "-22.5vw", height: "25vh", width: "30vw" },
    { top: "22.5vh", left: "25vw", height: "15vh", width: "15vw" },
  ];

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh", contain: "layout style" }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ contain: "layout style paint" }}>
        {images.slice(0, 7).map((img, i) => {
          const pos = positions[i] || {};
          return (
            <div key={i} ref={el => { layerRefs.current[i] = el; }} className="absolute top-0 flex h-full w-full items-center justify-center" style={{ willChange: "transform", transform: "scale3d(1,1,1)", backfaceVisibility: "hidden" }}>
              <div className="relative overflow-hidden" style={{ height: pos.height || "25vh", width: pos.width || "25vw", top: pos.top || "0", left: pos.left || "0", position: "relative", borderRadius: "4px" }}>
                <img src={img.src} alt={img.alt || ""} className="h-full w-full object-cover" style={img.pos ? { objectPosition: img.pos } : {}} loading={i === 0 ? "eager" : "lazy"} onError={e => { e.target.style.display = "none"; }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══ TRAJETÓRIA ═══ */
function TrajetoriaSection() {
  const [ref, vis] = useReveal(0.03);
  const txt = "text-white/50 text-sm mb-8 font-light leading-[1.9]";
  const imgWrap = "rounded-lg w-full overflow-hidden";
  const imgWrapStyle = { border: "1px solid rgba(255,255,255,0.04)", marginTop: "60px", marginBottom: "80px" };

  const parallaxImages = [
    { src: IMG("gallery_img_corrida2.jpg"), alt: "Corrida", pos: "center 20%" },
    { src: IMG("gallery_img_corrida.jpg"), alt: "Corrida", pos: "center 40%" },
    { src: GALLERY_IMG_FLORES, alt: "Arranjo floral" },
    { src: GALLERY_IMG_BAHIA, alt: "Bahia", pos: "center 60%" },
    { src: GALLERY_IMG_ORQUIDEAS, alt: "Orquídeas" },
    { src: GALLERY_IMG_JARDIM, alt: "Jardinagem", pos: "center 90%" },
    { src: GALLERY_IMG_FAZENDA, alt: "Fazenda", pos: "center 70%" },
  ];

  const data = [
    { title: "Jardineiro", content: (
      <div>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>O que começou aos 12 anos como um gesto para ajudar meu pai, acabou se tornando minha primeira grande escola de vida e negócios. Durante dois anos, vivi o dia a dia da jardinagem e entendi que o trabalho braçal ganha uma nova força quando somado à organização.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Ao perceber o potencial do que meu pai já fazia com tanta dedicação, decidi profissionalizar nossa estrutura. Formalizei a empresa, organizei os processos de atendimento e passei a buscar clientes de forma mais estratégica.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Hoje, sigo ao lado dele cuidando da parte que não aparece no jardim, mas que faz tudo funcionar.</p>
        <div className={imgWrap} style={imgWrapStyle}>
          <img src={IMG("img_jardineiro.jpg")} alt="Jardinagem com meu pai" className="w-full h-auto rounded-lg" style={{ objectFit: "cover", objectPosition: "center 30%" }} />
        </div>
      </div>
    )},
    { title: "Mundivox", content: (
      <div>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Minha entrada no meio corporativo foi marcada pela busca por protagonismo. Comecei como estagiário na Mundivox lidando com processos operacionais, mas logo passei a desenvolver projetos de IA para apoiar as decisões da liderança.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Ao mesmo tempo, assumi a linha de frente comercial, prospectando clientes e participando de reuniões estratégicas. Essa combinação de tecnologia e vendas deu resultado: juntos, batemos o recorde mensal de vendas da história da companhia, provando que a vontade de resolver problemas reais é o que realmente move o ponteiro de um negócio.</p>
        <div className={imgWrap} style={imgWrapStyle}>
          <img src={IMG("img_mundivox.jpg")} alt="Mundivox escritório" className="rounded-lg" style={{ width: "85%", maxHeight: "280px", objectFit: "cover", objectPosition: "center 40%" }} />
        </div>
      </div>
    )},
    { title: "UPclass", content: (
      <div>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>A UP Class nasceu da vontade de transformar tempo livre em impacto real. Como Co-fundador, sou o responsável por idealizar as funcionalidades da plataforma e liderar a estratégia de captação de investidores.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Nosso diferencial é uma tecnologia de IA que cria um ensino específico e personalizado para cada pessoa, adaptando o conteúdo ao ritmo e às dificuldades individuais de cada aluno, algo que rompe com o modelo tradicional de educação.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Enquanto nosso time técnico, que conta com um especialista da IBM, cuida da robustez do sistema, eu foco em trazer a visão de negócio e as ideias que tornam nossa ferramenta única.</p>
        <div className={imgWrap} style={imgWrapStyle}>
          <img src={IMG("img_upclass.jpg")} alt="UPclass plataforma" className="w-full h-auto" />
        </div>
      </div>
    )},
    { title: "IA", content: (
      <div>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Minha trajetória me levou a uma paixão profunda por Inteligência Artificial. Hoje, busco automatizar tudo o que é possível e utilizo a IA como ferramenta principal para resolver problemas complexos. No meu tempo livre, transformo ideias em realidade construindo sites e aplicações do zero.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Meu arsenal inclui ferramentas como Cursor, v0, Claude, Gemini Pro, Replit Agent, n8n, Lovable, Google AI Studio e 21st.dev. Mais do que apenas utilizar essas tecnologias, meu foco é orquestrá-las para criar fluxos de trabalho inteligentes e soluções que realmente funcionam, unindo design e funcionalidade com máxima eficiência.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)", color: "rgba(255,255,255,0.7)" }}>Meu primeiro fluxo e contato com IA:</p>
        <div className={imgWrap} style={imgWrapStyle}>
          <img src={IMG("img_fluxo_ia.png")} alt="Primeiro fluxo de IA" className="w-full h-auto" />
        </div>
      </div>
    )},
    { title: "Hoje", content: (
      <div>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Sigo em evolução constante e, honestamente, adoro um desafio que me tire da zona de conforto! Meu foco é construir uma trajetória incrível em grandes ecossistemas, onde eu possa colocar a mão na massa e ajudar a resolver problemas de verdade. Sei que o caminho é intenso, mas minha fórmula é simples: ouvir com atenção, anotar tudo e aplicar na velocidade da luz.</p>
        <p className={txt} style={{ fontFamily: "var(--ff)" }}>Acredito demais no trabalho em equipe e sou aquele cara que topa ajudar no que for preciso, seja desenhando um processo, dando um tapa no design ou criando uma automação maluca para facilitar a vida de todo mundo. Mais do que só crescer, quero ser aquele motor que traz inovação e energia por onde passa. Para mim, cada desafio é uma chance de aprender algo novo e transformar o comum em algo extraordinário!</p>
        <div className={imgWrap} style={imgWrapStyle}>
          <img src="/images/WhatsApp Image 2026-03-18 at 22.27.12.jpeg" alt="Hoje" className="rounded-lg" style={{ width: "85%", maxHeight: "400px", objectFit: "cover", objectPosition: "center 25%" }} />
        </div>
      </div>
    )},
  ];

  return (
    <section id="trajetória" ref={ref} className="relative">
      <div className="hidden md:block"><ZoomParallax images={parallaxImages} /></div>
      <div className="md:hidden grid grid-cols-2 gap-2 px-4 pt-8" style={{ marginBottom: "80px" }}>
        {parallaxImages.map((img, i) => (
          <div key={i} className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2" : ""}`} style={{ height: i === 0 ? "200px" : "150px" }}>
            <img src={img.src} alt={img.alt || ""} className="w-full h-full object-cover" style={img.pos ? { objectPosition: img.pos } : {}} loading="lazy" />
          </div>
        ))}
      </div>
      <div className="py-16 md:py-40">
        <Timeline data={data} />
      </div>
    </section>
  );
}


/* ═══ STAGGER TEXT ═══ */
function StaggerText({ text, isActive, onHover }) {
  return (
    <span className="relative inline-block cursor-pointer" onMouseEnter={onHover}>
      {text.split("").map((char, i) => (
        <span key={`${char}-${i}`} className="relative inline-block overflow-hidden">
          <span className="inline-block" style={{ opacity: isActive ? 0 : 0.2, transform: isActive ? "translateY(-110%)" : "translateY(0%)", transition: `transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.025}s, opacity 0.3s ease ${i * 0.025}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
          <span className="absolute left-0 top-0 inline-block" style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0%)" : "translateY(110%)", transition: `transform 0.3s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.025}s, opacity 0.3s ease ${i * 0.025}s` }}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ═══ MORPHING CARDS ═══ */
const morphingCards = [
  { id: "1", title: "Automações IA", description: "Fluxos inteligentes com n8n, Claude e APIs para automatizar processos comerciais", icon: <Sparkles className="h-5 w-5" /> },
  { id: "2", title: "UPclass", description: "Startup de educação com IA que personaliza o aprendizado para cada aluno", icon: <Layers className="h-5 w-5" /> },
  { id: "3", title: "Design & Front-end", description: "Sites e aplicações criados do zero com React, Tailwind e ferramentas modernas", icon: <Palette className="h-5 w-5" /> },
  { id: "4", title: "Estratégia Comercial", description: "Prospecção B2B, gestão de contratos e recorde de vendas na Mundivox", icon: <Clock className="h-5 w-5" /> },
];

function MorphingCardsSection() {
  const [ref, vis] = useReveal(0.06);
  return (
    <section ref={ref} className="relative px-4 md:px-12" style={{ paddingTop: "clamp(60px, 12vw, 160px)", paddingBottom: "clamp(60px, 12vw, 160px)" }}>
      <div className={`transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <MorphingCardStack cards={morphingCards} defaultLayout="stack" />
      </div>
    </section>
  );
}

/* ═══ GALERIA ═══ */
function GaleriaSection() {
  const [ref, vis] = useReveal(0.05);
  const [active, setActive] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const slides = [
    { id: "s1", title: "Excel", imgs: [GALLERY_IMG_EXCEL, EXCEL_2, EXCEL_3] },
    { id: "s2", title: "Hardware", imgs: [GALLERY_IMG_HARDWARE, HARDWARE_2, HARDWARE_3] },
    { id: "s3", title: "CRM Próprio", imgs: [CRM_PAINEL, CRM_PIPELINE, CRM_LEADS] },
    { id: "s4", title: "Simulador", imgs: [SIM_HOME, SIM_DADOS, SIM_RESULTADOS, SIM_CENARIOS, SIM_EXECUTIVA] },
    { id: "s5", title: "Projetos", imgs: [PROJ_GOVIRAL, PROJ_JARDIM, PROJ_UPCLASS] },
  ];
  return (
    <section id="galeria" ref={ref} className="relative py-16 md:py-40 px-4 md:px-12">
      <div style={{ paddingLeft: "clamp(0.5rem, 3vw, 1.5cm)", paddingRight: "clamp(0.5rem, 3vw, 1.5cm)" }}>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20" style={{ minHeight: "350px" }}>
          <div className="flex flex-row md:flex-col flex-wrap justify-center gap-x-4 gap-y-1 md:space-y-4 md:w-[40%] items-center md:items-start shrink-0">
            {slides.map((slide, i) => (
              <StaggerText key={slide.id} text={slide.title} isActive={active === i} onHover={() => setActive(i)} />
            ))}
          </div>
          <div className="w-full md:w-[50%] rounded-lg overflow-hidden cursor-pointer" style={{ height: "clamp(250px, 50vw, 420px)", border: "1px solid rgba(255,255,255,0.06)" }} onClick={() => { const img = slides[active].imgs ? slides[active].imgs[0] : slides[active].img; setLightboxSrc(img); }}>
            {slides[active].imgs ? (
              <div className={`w-full h-full gap-1 p-1 ${slides[active].imgs.length <= 3 ? "grid grid-rows-2" : "grid grid-cols-3 grid-rows-2"}`} style={slides[active].imgs.length <= 3 ? { gridTemplateColumns: "1fr 1fr" } : {}}>
                {slides[active].imgs.map((imgSrc, idx) => (
                  <img key={idx} src={imgSrc} alt={slides[active].title} className="w-full h-full object-contain rounded cursor-pointer" style={slides[active].imgs.length <= 3 && idx === 0 ? { gridRow: "1 / 3" } : {}} onClick={(e) => { e.stopPropagation(); setLightboxSrc(imgSrc); }} />
                ))}
              </div>
            ) : (
              <img src={slides[active].img} alt={slides[active].title} className="w-full h-full object-cover" style={{ objectPosition: "center center", transition: "opacity 0.3s ease" }} />
            )}
          </div>
          {lightboxSrc && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.9)" }} onClick={() => setLightboxSrc(null)}>
              <button onClick={() => setLightboxSrc(null)} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors cursor-pointer" style={{ fontSize: "2rem", lineHeight: 1 }}>✕</button>
              <img src={lightboxSrc} alt="" className="max-w-[90vw] max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
            </div>
          )}
        </div>
      </div>
      <style>{`.relative.inline-block.cursor-pointer{font-family:var(--ff);font-size:clamp(1.5rem,4vw,3.5rem);font-weight:700;text-transform:uppercase;letter-spacing:-0.05em;color:white}`}</style>
    </section>
  );
}

/* ═══ CONTATO ═══ */
function CopyText({ children, text, className, style }) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <TextDisperse className={className} style={style}>{children}</TextDisperse>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs text-white/90" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", animation: "fadeUp 0.3s ease", whiteSpace: "nowrap" }}>Copiado!</span>
      )}
    </div>
  );
}

function ContactDisperse() {
  const [ref, vis] = useReveal(0.08);
  return (
    <section className="px-4 md:px-12" style={{ paddingTop: "clamp(60px, 10vw, 140px)", paddingBottom: "clamp(30px, 5vw, 60px)" }}>
      <div ref={ref} className={`text-center transition-all duration-1000 ${vis ? "opacity-100" : "opacity-0"}`} style={{ maxWidth: 1400, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="text-[9px] tracking-[0.3em] uppercase block mb-8" style={{ color: "rgba(255,255,255,0.15)" }}>Contato</span>
        <div className="flex flex-col items-center gap-3">
          <CopyText text="gustavosantana.adm@gmail.com" className="font-light text-white" style={{ fontSize: "clamp(0.9rem, 3vw, 2.5rem)" }}>gustavosantana.adm@gmail.com</CopyText>
          <CopyText text="+55 (11) 91031-5577" className="font-light" style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.9rem, 3vw, 2.5rem)" }}>+55 (11) 91031-5577</CopyText>
        </div>
      </div>
    </section>
  );
}

/* ═══ IFOOD CTA ═══ */
function IFoodCTA() {
  const [ref, vis] = useReveal(0.08);
  return (
    <section id="contato" ref={ref} className="relative overflow-hidden" style={{ padding: "clamp(20px, 4vw, 40px) 16px clamp(60px, 10vw, 120px)", display: "flex", justifyContent: "center" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"><span className="font-light" style={{ fontFamily: "var(--ff)", fontSize: "28vw", color: "rgba(255,255,255,0.01)" }}>iFOOD</span></div>
      <div className={`relative transition-all duration-[1.5s] ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`} style={{ maxWidth: 800, textAlign: "center" }}>
        <h2 className="font-light text-white" style={{ fontFamily: "var(--ff)", fontSize: "clamp(2.5rem,6vw,5.5rem)", lineHeight: 0.93 }}>
          Pronto para fazer<br /><span style={{ color: "rgba(255,255,255,0.7)" }}>história no iFood.</span>
        </h2>
        <p className="font-light" style={{ fontFamily: "var(--ff)", marginTop: 32, fontSize: 14, lineHeight: 1.9, color: "rgba(255,255,255,0.18)", maxWidth: 520, margin: "32px auto 0" }}>Trago a mentalidade de startup, a criatividade de inventor e a resiliência de quem constrói com as próprias mãos.</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 40 }}>
          {["Inovação", "IA", "Empreendedorismo", "Resiliência"].map(t => <span key={t} style={{ padding: "6px 16px", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)", cursor: "default" }}>{t}</span>)}
        </div>
      </div>
    </section>
  );
}


/* ═══ FLOATING CHAT ═══ */
function FloatingChat() {
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Olá! Pergunte qualquer coisa sobre o Gustavo." }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMsgs(m => [...m, { from: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("https://gustavo7763.app.n8n.cloud/webhook/mundi-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      const botText = data.output || data.response || data.text || data.message || JSON.stringify(data);
      setMsgs(m => [...m, { from: "bot", text: botText }]);
    } catch {
      setMsgs(m => [...m, { from: "bot", text: "Erro ao conectar. Tente novamente." }]);
    }
    setIsLoading(false);
  };

  const bubble = (from) => ({
    maxWidth: "80%",
    padding: "10px 14px",
    fontSize: 13,
    lineHeight: 1.5,
    fontFamily: "var(--ff)",
    fontWeight: 300,
    borderRadius: from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
    backgroundColor: from === "user" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.05)",
    color: from === "user" ? "#0a0a0a" : "rgba(255,255,255,0.6)",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            <div style={bubble(m.from)}>{m.text}</div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ ...bubble("bot"), display: "flex", gap: 4, padding: "14px 18px" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", animation: "fadeUp 0.6s ease infinite" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", animation: "fadeUp 0.6s ease 0.15s infinite" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.3)", animation: "fadeUp 0.6s ease 0.3s infinite" }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Pergunte algo..."
          style={{
            flex: 1, padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 300,
            fontFamily: "var(--ff)", outline: "none", border: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "rgba(255,255,255,0.03)", color: "white",
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          style={{
            width: 36, height: 36, borderRadius: 10, border: "none", cursor: "pointer",
            backgroundColor: input.trim() ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.05)",
            color: input.trim() ? "#0a0a0a" : "rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease",
          }}
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

/* ═══ MAIN ═══ */
export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => { setLoading(false); document.body.style.overflow = ""; document.documentElement.style.scrollBehavior = "smooth"; }, 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-white" style={{ backgroundColor: "#0a0a0a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700&display=swap');
        :root{--ff:'Sora',sans-serif}*{font-family:var(--ff)}html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:#0a0a0a}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:10px}
        @keyframes fadeUp{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}
        ::selection{background:rgba(255,255,255,0.15);color:white}
        @keyframes fadeOut{to{opacity:0;pointer-events:none}}
      `}</style>

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: "#0a0a0a", animation: "fadeOut 0.6s ease forwards 1.5s" }}>
          <span className="text-3xl md:text-5xl font-light" style={{ fontFamily: "var(--ff)", color: "rgba(255,255,255,0.7)", animation: "fadeUp 1.5s ease forwards" }}>Gustavo</span>
        </div>
      )}

      <Hero />
      <QuemSou />
      <TrajetoriaSection />
      <MorphingCardsSection />
      <GaleriaSection />
      <ContactDisperse />
      <IFoodCTA />

      <ExpandableChat position="bottom-right">
        <ExpandableChatHeader>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#0a0a0a" }}>G</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 400, color: "white", fontFamily: "var(--ff)" }}>Assistente do Gustavo</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#34d399" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--ff)" }}>Online</span>
              </div>
            </div>
          </div>
        </ExpandableChatHeader>
        <ExpandableChatBody>
          <FloatingChat />
        </ExpandableChatBody>
      </ExpandableChat>
    </div>
  );
}
