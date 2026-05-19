import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Briefcase,
  Cpu,
  Download,
  Folder,
  Gamepad2,
  GraduationCap,
  Grid2X2,
  Mail,
  Monitor,
  Search,
  Terminal,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const portfolioPath = "C:\\Users\\Michael\\Portfolio";

const folders = [
  {
    id: "personnel",
    title: "PERSONNEL",
    icon: Briefcase,
    subtitle: "CV · timeline · credentials",
    tag: "PERSONNEL.FILE",
    heading: "Personnel Archive",
    body: "Core profile containing CV records, professional timeline, education, credentials, awards, and industry experience.",
  },
  {
    id: "game-design",
    title: "GAME DESIGN",
    icon: Gamepad2,
    subtitle: "Rupture case file",
    tag: "DESIGN.ARCHIVE",
    heading: "Game Design Archive",
    body: "Primary design partition containing the Rupture project archive, including documentation, screenshots, posters, systems, level design, and prototype records.",
  },
  {
    id: "3d-art",
    title: "3D ARTIST",
    icon: Box,
    subtitle: "models · textures · renders",
    tag: "ART.PIPELINE",
    heading: "3D Art Archive",
    body: "Asset partition containing 3D modelling, textured assets, rendered outputs, hard-surface work, environment pieces, and selected animation tests.",
  },
  {
    id: "academic",
    title: "ACADEMIC",
    icon: GraduationCap,
    subtitle: "modules · programmes · QA",
    tag: "ACADEMIC.SYS",
    heading: "Academic Archive",
    body: "Academic systems partition containing module design, programme descriptors, assessment frameworks, validation work, and teaching records.",
  },
  {
    id: "masters",
    title: "MASTERS",
    icon: Monitor,
    subtitle: "research · projects · experiments",
    tag: "RESEARCH.LOG",
    heading: "Masters Project Archive",
    body: "Research partition containing MA project work, experimental media, process documentation, interactive prototypes, and conceptual development records.",
  },
];

const subdirectories = {
  personnel: ["CV_MASTER", "EXPERIENCE_TIMELINE", "EDUCATION", "CREDENTIALS"],
  "game-design": ["RUPTURE"],
  "3d-art": ["MODELLING", "TEXTURES", "RENDERS", "ANIMATION_TESTS", "ENVIRONMENTS"],
  academic: ["MODULES", "PROGRAMME_DESCRIPTORS", "ASSESSMENTS", "VALIDATION_QA", "TEACHING_RECORDS"],
  masters: ["MA_PROJECTS", "RESEARCH", "EXPERIMENTS", "PROCESS_DOCS"],
};

const commandLines = [
  "BOOTING PORTFOLIO_OS...",
  "MOUNTING DESIGN ARCHIVE...",
  "INDEXING RUPTURE FILES...",
  "SYNCING 3D ART PIPELINE...",
  "ARCHIVE SYSTEM READY",
];

const diagnostics = [
  ["ACADEMIC_NETWORK", "ACTIVE"],
  ["PROJECT_ARCHIVE", "MOUNTED"],
  ["ART_PIPELINE", "ONLINE"],
  ["QA_VALIDATION", "COMPLETE"],
  ["DESIGN_RECORDS", "SYNCED"],
  ["RUPTURE_BUILD", "ARCHIVED"],
];

const ruptureGallery = [
  { title: "Storyboard", label: "OPENING SEQUENCE", src: "/assets/rupture-storyboard.webp" },
  { title: "Level Design", label: "MAZE STRUCTURE", src: "/assets/rupture-level-design.webp" },
  { title: "Sentinel Design", label: "ROTH ENEMY CONCEPT", src: "/assets/rupture-sentinel-design.webp" },
  { title: "Poster Art", label: "PROMOTIONAL ART", src: "/assets/rupture-poster.webp" },
  { title: "Level Concept 01", label: "ICE TUNNEL", src: "/assets/rupture-level-concept-1.webp" },
  { title: "Level Concept 02", label: "ENVIRONMENT MOOD", src: "/assets/rupture-level-concept-2.webp" },
  { title: "Level Concept 03", label: "COMBAT SPACE", src: "/assets/rupture-level-concept-3.webp" },
  { title: "Level Concept 04", label: "BOSS ARENA / FLOW", src: "/assets/rupture-level-concept-4.webp" },
  { title: "Character Sheet", label: "JACE MERCER", src: "/assets/rupture-character-sheet.webp" },
];

const smokeTests = [
  {
    name: "Game Design only contains Rupture",
    pass: () => subdirectories["game-design"].length === 1 && subdirectories["game-design"][0] === "RUPTURE",
  },
  {
    name: "Rupture gallery has project assets",
    pass: () => ruptureGallery.length > 0,
  },
  {
    name: "Every folder has a directory list",
    pass: () => folders.every((folder) => Array.isArray(subdirectories[folder.id])),
  },
  {
    name: "Rupture source paths are strings",
    pass: () => ruptureGallery.every((item) => typeof item.src === "string" && item.src.length > 0),
  },
  {
    name: "All folders have display metadata",
    pass: () => folders.every((folder) => folder.title && folder.heading && folder.body),
  },
  {
    name: "Rupture can open as fullscreen case file",
    pass: () => subdirectories["game-design"].includes("RUPTURE"),
  },
  {
    name: "All folder ids are unique",
    pass: () => new Set(folders.map((folder) => folder.id)).size === folders.length,
  },
  {
    name: "Diagnostics contain label and status values",
    pass: () => diagnostics.every((item) => item.length === 2 && item[0] && item[1]),
  },
  {
    name: "Carousel has enough media for next and previous controls",
    pass: () => ruptureGallery.length > 1,
  },
];

function runSmokeTests() {
  smokeTests.forEach((test) => {
    console.assert(test.pass(), `Portfolio smoke test failed: ${test.name}`);
  });
}

function WindowControls() {
  return (
    <div className="flex items-center gap-3 pr-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-100/70">
      <span className="hidden sm:inline">LINK ACTIVE</span>
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-200 shadow-[0_0_8px_rgba(103,232,249,0.9)]" />
      <span className="h-3 w-px bg-cyan-200/20" />
      <span className="text-slate-500">PANEL</span>
    </div>
  );
}

function WindowBar({ icon: Icon, title, children }) {
  return (
    <div className="relative flex h-11 items-center justify-between overflow-hidden border-b border-cyan-200/10 bg-slate-950/95 px-4">
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full"
        animate={{ opacity: [0.18, 0.72, 0.18] }}
        transition={{ duration: 3.5, repeat: Infinity }}
        style={{ background: "linear-gradient(90deg, transparent, rgba(103,232,249,0.6), transparent)" }}
      />
      <div className="relative flex min-w-0 flex-1 items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-300">
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-cyan-200" /> : null}
        <div className="flex min-w-0 flex-1 items-center gap-3 overflow-hidden">{children ?? <span className="truncate">{title}</span>}</div>
      </div>
      <WindowControls />
    </div>
  );
}

function IconForWindow({ folderId }) {
  const folder = folders.find((item) => item.id === folderId);
  const Icon = folder?.icon ?? Folder;
  return <Icon className="h-4 w-4 shrink-0 text-cyan-200" />;
}

function MiniRunner({ onExit }) {
  const phasePalette = ["#67e8f9", "#fde68a", "#c4b5fd", "#a7f3d0", "#fda4af", "#93c5fd", "#d9f99d", "#f0abfc", "#fdba74", "#5eead4"];

  function getPhase(index) {
    const accent = phasePalette[index % phasePalette.length];
    const obstacle = phasePalette[(index + 4) % phasePalette.length];
    return { name: `P${String(index + 1).padStart(2, "0")}`, accent, obstacle, speed: 1 + index * 0.1 };
  }

  const [running, setRunning] = useState(false);
  const [playerY, setPlayerY] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [trackOffset, setTrackOffset] = useState(0);
  const [score, setScore] = useState(0);
  const [crashed, setCrashed] = useState(false);
  const [deathPixels, setDeathPixels] = useState([]);

  const phaseIndex = Math.floor(score / 10);
  const phase = getPhase(phaseIndex);

  function createObstacle(id, startX = 105) {
    const templates = [
      { type: "block", height: 26, width: 2.2 },
      { type: "block", height: 34, width: 2.4 },
      { type: "spike", height: 24, width: 2.8 },
    ];
    const template = templates[Math.floor(Math.random() * templates.length)];
    return { id, x: startX + 18 + Math.random() * 28, ...template, scored: false };
  }

  function resetGame() {
    setObstacles([createObstacle(1, 85), createObstacle(2, 155), createObstacle(3, 230)]);
    setScore(0);
    setPlayerY(1);
    setTrackOffset(0);
    setCrashed(false);
    setDeathPixels([]);
    setRunning(true);
  }

  function endGame() {
    setRunning(false);
    setCrashed(true);
    setDeathPixels(
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        x: 11 + (Math.random() - 0.5) * 8,
        y: 32 + Math.random() * 18,
        dx: (Math.random() - 0.5) * 42,
        dy: (Math.random() - 0.5) * 44,
        size: 2 + Math.random() * 4,
      }))
    );
  }

  useEffect(() => {
    if (!running || crashed) return undefined;

    const interval = window.setInterval(() => {
      setTrackOffset((current) => (current + phase.speed) % 64);
      setObstacles((current) => {
        let next = current.map((obstacle) => ({ ...obstacle, x: obstacle.x - phase.speed * 1.6 }));

        next = next.map((obstacle) => {
          if (!obstacle.scored && obstacle.x < 4) {
            setScore((value) => value + 1);
            return { ...obstacle, scored: true };
          }
          return obstacle;
        });

        next = next.filter((obstacle) => obstacle.x > -10);
        if (next.length < 3) {
          const furthest = next.reduce((max, obstacle) => Math.max(max, obstacle.x), 90);
          const nextId = Math.max(0, ...next.map((obstacle) => obstacle.id)) + 1;
          next.push(createObstacle(nextId, furthest + 40));
        }

        const playerLeft = 10.45;
        const playerRight = 13.45;
        const playerBottom = playerY + 1;
        const playerTop = playerY + 17;

        const hit = next.some((obstacle) => {
          const obstacleLeft = obstacle.x + 0.15;
          const obstacleRight = obstacle.x + obstacle.width - 0.15;
          const obstacleTop = obstacle.height - 2;
          return playerRight > obstacleLeft && playerLeft < obstacleRight && playerBottom < obstacleTop && playerTop > 4;
        });

        if (hit) window.setTimeout(endGame, 0);
        return next;
      });
    }, 32);

    return () => window.clearInterval(interval);
  }, [running, crashed, phase.speed, playerY]);

  function jump() {
    if (crashed || !running || playerY > 1) return;
    setPlayerY(46);
    window.setTimeout(() => setPlayerY(1), 280);
  }

  function handlePlayAreaClick(event) {
    event.preventDefault();
    if (!running) {
      resetGame();
      return;
    }
    jump();
  }

  function closeGame(event) {
    event.preventDefault();
    event.stopPropagation();
    setRunning(false);
    setCrashed(false);
    setDeathPixels([]);
    onExit();
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Escape") {
        event.preventDefault();
        onExit();
        return;
      }
      if (event.code !== "Space") return;
      event.preventDefault();
      if (!running) {
        resetGame();
        return;
      }
      jump();
    }

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [running, crashed, playerY, onExit]);

  return (
    <div className="mt-4 border border-cyan-200/15 bg-black/60 p-4 font-mono text-xs text-cyan-100">
      <div className="mb-3 flex items-center justify-between">
        <span>RUNNER.EXE</span>
        <button type="button" onPointerDown={(event) => event.stopPropagation()} onClick={closeGame} className="relative z-20 border border-cyan-200/20 px-2 py-1 text-slate-300 hover:bg-cyan-200/10">
          EXIT GAME
        </button>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-3 text-slate-400">
        <span>SCORE: <span style={{ color: phase.accent }}>{score}</span></span>
        <span>PHASE: <span style={{ color: phase.accent }}>{phase.name}</span></span>
        <span className="text-right">SPD {phase.speed.toFixed(1)}x</span>
      </div>

      <button type="button" onPointerDown={handlePlayAreaClick} className="relative h-40 w-full overflow-hidden border bg-slate-950/90 text-left" style={{ borderColor: `${phase.accent}33` }}>
        <div className="absolute inset-0 opacity-45" style={{ backgroundImage: `linear-gradient(${phase.accent}10 1px, transparent 1px)`, backgroundSize: "24px 24px", backgroundPosition: `-${trackOffset}px 0px` }} />
        <div className="absolute bottom-7 left-0 right-0 h-[2px]" style={{ backgroundColor: `${phase.accent}dd` }} />

        {!crashed ? (
          <motion.div
            className="absolute bottom-[29px] left-[11%] h-4 w-4 border-2 border-slate-950"
            animate={{ y: -Math.max(playerY, 1), rotate: running ? [0, -8, 8, 0] : 0 }}
            transition={{ y: { duration: playerY > 1 ? 0.12 : 0.1, ease: "easeOut" }, rotate: { duration: 0.2 } }}
            style={{ backgroundColor: phase.accent, boxShadow: `0 0 0 2px ${phase.accent}`, imageRendering: "pixelated" }}
          />
        ) : null}

        {deathPixels.map((pixel) => (
          <motion.div
            key={pixel.id}
            className="absolute"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{ x: pixel.dx, y: pixel.dy, opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            style={{
              left: `${pixel.x}%`,
              bottom: `${pixel.y}px`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              backgroundColor: pixel.id % 2 === 0 ? phase.accent : phase.obstacle,
              imageRendering: "pixelated",
            }}
          />
        ))}

        {obstacles.map((obstacle) => {
          if (obstacle.type === "spike") {
            return (
              <div key={obstacle.id} className="absolute bottom-7" style={{ left: `${obstacle.x}%`, width: `${obstacle.width}%`, height: `${obstacle.height}px` }}>
                <div className="absolute inset-0" style={{ backgroundColor: phase.obstacle, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", imageRendering: "pixelated" }} />
                <div className="absolute left-[18%] top-[28%] h-[68%] w-[64%]" style={{ backgroundColor: "#020617", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)", imageRendering: "pixelated" }} />
                <div className="absolute left-[42%] top-[18%] h-[18%] w-[16%]" style={{ backgroundColor: phase.obstacle, imageRendering: "pixelated" }} />
              </div>
            );
          }
          return <div key={obstacle.id} className="absolute bottom-7 border-2" style={{ left: `${obstacle.x}%`, width: `${obstacle.width}%`, height: `${obstacle.height}px`, borderColor: phase.obstacle, backgroundColor: `${phase.obstacle}33` }} />;
        })}

        {!running && !crashed ? <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-slate-300">CLICK OR PRESS SPACE TO START · SPACE / CLICK TO JUMP</div> : null}
        {crashed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-center">
            <div className="border border-red-300/40 bg-black/70 p-5 text-red-100">
              <p className="text-[10px] uppercase tracking-[0.3em] text-red-300">SYSTEM COLLISION</p>
              <p className="mt-2 text-xl text-white">GAME OVER</p>
              <p className="mt-2 text-slate-300">FINAL SCORE: <span style={{ color: phase.accent }}>{score}</span></p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-slate-400">Click or press space to try again</p>
            </div>
          </div>
        ) : null}
      </button>
    </div>
  );
}

function TerminalPanel({ terminalIndex }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(["Type HELP for available commands."]);
  const [gameOpen, setGameOpen] = useState(false);

  function runCommand(event) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;

    if (["play", "game", "runner", "runner.exe", "run runner.exe"].includes(command)) {
      setHistory((current) => [...current.slice(-4), `> ${input}`, "RUNNER.EXE launched."]);
      setGameOpen(true);
    } else if (command === "help") {
      setHistory((current) => [...current.slice(-4), "> HELP", "Commands: HELP, DIR, CLEAR, RUNNER.EXE"]);
    } else if (command === "dir") {
      setHistory((current) => [...current.slice(-4), "> DIR", "PERSONNEL  GAME_DESIGN  3D_ART  ACADEMIC  MASTERS"]);
    } else if (command === "clear") {
      setHistory([]);
    } else {
      setHistory((current) => [...current.slice(-4), `> ${input}`, "Unknown command. Try HELP."]);
    }
    setInput("");
  }

  return (
    <div className={`overflow-hidden border border-cyan-200/15 bg-black/45 font-mono text-xs shadow-2xl backdrop-blur-xl md:text-sm ${gameOpen ? "relative z-50" : ""}`}>
      <WindowBar icon={Terminal} title="Command Interface" />
      <div className="relative min-h-[212px] space-y-3 overflow-hidden p-5 text-slate-300">
        <div className="absolute inset-0 animate-pulse bg-[linear-gradient(to_bottom,transparent,rgba(103,232,249,0.2),transparent)] bg-[length:100%_6px] opacity-10" />
        {commandLines.map((line, index) => (
          <motion.p key={line} animate={{ opacity: index <= terminalIndex ? 1 : 0.25 }}>
            <span className="text-cyan-200">&gt;</span> {line}
          </motion.p>
        ))}
        {history.map((line, index) => <p key={`${line}-${index}`} className="relative text-cyan-100/80">{line}</p>)}
        <form onSubmit={runCommand} className="relative flex items-center gap-2">
          <span className="text-cyan-200">&gt;</span>
          <input value={input} onChange={(event) => setInput(event.target.value)} className="w-full bg-transparent text-cyan-100 outline-none placeholder:text-slate-600" placeholder="type command..." />
        </form>
        {gameOpen ? <MiniRunner onExit={() => setGameOpen(false)} /> : null}
      </div>
    </div>
  );
}

function FileExplorer({ activeFolder, onSelect }) {
  return (
    <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="relative overflow-hidden rounded-none border-cyan-200/15 bg-slate-950/70 shadow-2xl backdrop-blur-xl before:absolute before:right-0 before:top-0 before:h-px before:w-12 before:bg-cyan-200/50">
        <WindowBar icon={Grid2X2} title="Archive Navigator" />
        <CardContent className="p-5">
          <div className="relative mb-5 flex items-center gap-2 overflow-hidden border border-cyan-200/10 bg-black/25 px-3 py-2 text-xs text-slate-400">
            <Search className="relative h-3.5 w-3.5" />
            <span className="relative truncate">{portfolioPath}</span>
          </div>
          <div className="relative grid grid-cols-1 gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {folders.map((folder) => {
              const active = activeFolder?.id === folder.id;
              return (
                <motion.button
                  key={folder.id}
                  layout
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(folder)}
                  className={`group relative overflow-hidden border p-4 text-left backdrop-blur-sm transition duration-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.08)] ${
                    active ? "border-cyan-200/70 bg-cyan-200/[0.09]" : "border-cyan-200/10 bg-black/25 hover:border-cyan-200/25 hover:bg-cyan-200/[0.025]"
                  }`}
                >
                  {active ? (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ x: "-120%" }}
                      animate={{ x: "120%" }}
                      transition={{ duration: 1.25, repeat: Infinity, repeatDelay: 0.35, ease: "easeInOut" }}
                      style={{ width: "80%", background: "linear-gradient(90deg, transparent 0%, rgba(103,232,249,0.5) 50%, transparent 100%)", opacity: 0.65 }}
                    />
                  ) : null}
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="mb-4 flex h-12 items-start">
                      <Folder className={`h-10 w-10 shrink-0 drop-shadow-[0_0_6px_rgba(103,232,249,0.16)] ${active ? "text-cyan-200" : "text-slate-400"}`} />
                    </div>
                    <p className="min-h-[40px] text-sm font-semibold tracking-[0.12em]">{folder.title}</p>
                    <p className="mt-1 min-h-[40px] text-[10px] uppercase leading-5 tracking-[0.12em] text-slate-500">{folder.subtitle}</p>
                    <p className="mt-auto pt-3 font-mono text-[10px] text-cyan-200/80">{folder.tag}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function DiagnosticsPanel() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden border border-cyan-200/10 bg-black/20 p-6 shadow-[0_0_14px_rgba(34,211,238,0.04)] transition duration-300 hover:border-cyan-200/20 hover:shadow-[0_0_22px_rgba(34,211,238,0.08)]">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">System Diagnostics</p>
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
        </div>
        <div className="space-y-4 font-mono text-xs">
          {diagnostics.map(([label, status], index) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between text-slate-300">
                <span>{label}</span>
                <span className="text-cyan-200">{status}</span>
              </div>
              <div className="h-1 overflow-hidden border border-cyan-200/10 bg-black/60">
                <motion.div className="h-full bg-cyan-200" initial={{ width: 0 }} animate={{ width: `${85 + index * 3}%` }} transition={{ duration: 1.2, delay: index * 0.08 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden border border-cyan-200/10 bg-black/20 p-5 transition duration-300 hover:border-cyan-200/20 hover:shadow-[0_0_18px_rgba(34,211,238,0.06)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">Archive Status</p>
          <span className="font-mono text-xs text-cyan-200">ONLINE</span>
        </div>
        <div className="space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3"><span>ACTIVE MODULES</span><span className="text-cyan-200">05</span></div>
          <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3"><span>ARCHIVE HEALTH</span><span className="text-cyan-200">STABLE</span></div>
          <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3"><span>RUNTIME STATUS</span><span className="text-cyan-200">ACTIVE</span></div>
        </div>
      </div>
    </div>
  );
}

function RuptureViewer({ onClose }) {
  const [selectedMedia, setSelectedMedia] = useState(ruptureGallery[3] ?? ruptureGallery[0]);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [videoViewerOpen, setVideoViewerOpen] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);
  const selectedIndex = ruptureGallery.findIndex((item) => item.title === selectedMedia.title);

  function nextMedia() {
    const nextIndex = (selectedIndex + 1) % ruptureGallery.length;
    setSelectedMedia(ruptureGallery[nextIndex]);
  }

  function previousMedia() {
    const previousIndex = (selectedIndex - 1 + ruptureGallery.length) % ruptureGallery.length;
    setSelectedMedia(ruptureGallery[previousIndex]);
  }

  function openImageViewer(item) {
    setSelectedMedia(item);
    setImageViewerOpen(true);
  }

  return (
    <motion.div
              initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
      transition={{ duration: 0.24 }}
      className="fixed inset-0 z-[999] bg-[#020617] backdrop-blur-xl"
    >
      <div className="relative h-screen w-screen overflow-hidden bg-[#05070d] shadow-[0_0_80px_rgba(34,211,238,0.12)] before:absolute before:left-0 before:top-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:via-cyan-200/50 before:to-transparent">
        <WindowBar icon={Gamepad2} title="RUPTURE_CASEFILE.exe">
          <div className="flex min-w-0 items-center gap-3">
            <button onClick={onClose} className="border border-cyan-200/15 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100 hover:bg-cyan-200/10">
              Return to Archive
            </button>
            <span className="hidden truncate text-slate-300 sm:inline">RUPTURE_CASEFILE.exe</span>
          </div>
        </WindowBar>

        <div className="h-[calc(100vh-44px)] overflow-y-auto p-5 pb-24 md:p-10 md:pb-32">
          <div className="relative mb-10 min-h-[520px] overflow-hidden border border-cyan-200/10 bg-black/35">
            <img
              src="/assets/rupture-level-concept-4.webp"
              alt="Rupture level concept background"
              className="absolute inset-0 h-full w-full scale-[1.04] object-cover object-center opacity-[0.42]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#05070d]/98 via-[#05070d]/78 to-[#05070d]/15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/90 via-transparent to-black/35" />
            <div className="absolute left-0 top-0 h-full w-[55%] backdrop-blur-[5px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(103,232,249,0.08),transparent_28%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.55)_100%)]" />

            <div className="relative z-10 flex min-h-[520px] items-center px-8 py-10 md:px-14 md:py-14">
              <div className="max-w-5xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200">CASE FILE // RUPTURE</p>
                <h1 className="title-tech mt-5 text-6xl leading-[0.9] text-white md:text-8xl xl:text-9xl">RUPTURE</h1>
                <p className="mt-7 max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
                  Award winning sci-fi arcade shooter developed in Unreal Engine. Built around maze navigation, environmental pressure, enemy pursuit systems, and cinematic atmosphere within the frozen tunnel systems of Titan.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-10 grid gap-6 border-b border-cyan-200/10 pb-8 xl:grid-cols-[1fr_360px]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-200">PROJECT OVERVIEW</p>
              <h2 className="title-tech mt-4 text-3xl text-white md:text-5xl">RUPTURE</h2>
              <p className="mt-6 max-w-3xl text-sm leading-8 text-slate-300 md:text-base">
                Winner of the 2020 GamesFleadh Award for Best 3D Art. Rupture is an intense sci-fi arcade shooter set on Titan's moon, where players take control of Jace Mercer as he navigates hostile tunnel systems, survives the Roth hive-mind species, and escapes increasingly dangerous environments.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  "Maze navigation and branching routes",
                  "Raycast enemy pursuit AI",
                  "Vehicle traversal gameplay sections",
                  "Boss encounters and arena design",
                  "Retro inspired HUD concepts",
                  "Halo and Gears inspired visual direction",
                ].map((item) => (
                  <div key={item} className="border border-cyan-200/10 bg-black/25 p-4 text-sm leading-7 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-cyan-200/10 bg-black/25 p-5">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200">BUILD WIDGET</p>
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-200" />
              </div>

              <div className="space-y-4 font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
                <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3">
                  <span>Status</span>
                  <span className="text-cyan-200">Complete</span>
                </div>
                <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3">
                  <span>Award</span>
                  <span className="text-cyan-200">GamesFleadh 2020</span>
                </div>
                <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3">
                  <span>Engine</span>
                  <span className="text-cyan-200">Unreal Engine</span>
                </div>
                <div className="flex items-center justify-between border-b border-cyan-200/10 pb-3">
                  <span>Role</span>
                  <span className="text-cyan-200">Design / 3D Art</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tech</span>
                  <span className="text-cyan-200">Blueprints</span>
                </div>
              </div>

              <div className="mt-6 border border-cyan-200/10 bg-slate-950/70 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Archive Signal</p>
                <div className="mt-4 space-y-3">
                  {["Art Direction", "Prototype", "Gameplay", "Presentation"].map((label, index) => (
                    <div key={label}>
                      <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                        <span>{label}</span>
                        <span className="text-cyan-200">{88 + index * 3}%</span>
                      </div>
                      <div className="h-1 border border-cyan-200/10 bg-black/60">
                        <motion.div
                          className="h-full bg-cyan-200"
                          initial={{ width: 0 }}
                          animate={{ width: `${88 + index * 3}%` }}
                          transition={{ duration: 1.2, delay: index * 0.08 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-5xl border border-cyan-200/10 bg-black/20 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">DEMO TRAILER</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">GAMESFLEADH BUILD</p>
            </div>
            <button
              type="button"
              onClick={() => setVideoViewerOpen(true)}
              className="group relative mx-auto block w-full max-w-4xl overflow-hidden border border-cyan-200/10 bg-black"
            >
              <video
                src="/assets/rupture-demo-trailer.mp4"
                className="block max-h-[420px] w-full object-contain transition duration-300 group-hover:scale-[1.01]"
                muted
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 transition group-hover:bg-black/20">
                <div className="border border-cyan-200/30 bg-black/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-sm">
                  Open Trailer Viewer
                </div>
              </div>
            </button>
          </div>

          <div className="mt-10 overflow-hidden border border-cyan-200/10 bg-black/20">
            <WindowBar icon={Grid2X2} title="Rupture Media Archive" />
            <div className="grid gap-6 p-5 xl:grid-cols-[1fr_320px]">
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">ARCHIVE GALLERY</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">PROJECT MATERIAL</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {ruptureGallery.map((item, index) => (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => openImageViewer(item)}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="group overflow-hidden border border-cyan-200/10 bg-black/30 text-left transition duration-300 hover:border-cyan-200/40 hover:bg-cyan-200/[0.04] hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]"
                    >
                      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-950">
                        <img src={item.src} alt={`Rupture ${item.title}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">{item.label}</p>
                          <p className="mt-2 text-lg uppercase tracking-[0.12em] text-white">{item.title}</p>
                        </div>
                      </div>
                      <div className="border-t border-cyan-200/10 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200">{`ARCHIVE_CAPTURE_${String(index + 1).padStart(2, "0")}`}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              <aside className="border border-cyan-200/10 bg-slate-950/60 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">MEDIA INDEX</p>
                <div className="mt-5 space-y-3">
                  {ruptureGallery.map((item, index) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => openImageViewer(item)}
                      className="flex w-full items-center justify-between border-b border-cyan-200/10 pb-3 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 transition hover:text-cyan-100"
                    >
                      <span className="truncate pr-3">{String(index + 1).padStart(2, "0")} // {item.title}</span>
                      <span className="text-cyan-200">OPEN</span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 border border-cyan-200/10 bg-black/35 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-slate-500">Selected Asset</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em] text-slate-300">Click any tile to open the fullscreen carousel viewer.</p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {imageViewerOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl"
            >
              <div className="relative flex h-full w-full flex-col border border-cyan-200/15 bg-[#030712] shadow-[0_0_70px_rgba(34,211,238,0.16)]">
                <div className="flex h-12 items-center justify-between border-b border-cyan-200/10 bg-slate-950/95 px-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">MEDIA VIEWER</p>
                    <p className="truncate text-xs uppercase tracking-[0.16em] text-slate-300">{selectedMedia.title}</p>
                  </div>
                  <button onClick={() => setImageViewerOpen(false)} className="border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200 hover:bg-red-500/20">
                    Exit
                  </button>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center p-4 md:p-8">
                  <button onClick={previousMedia} className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border border-cyan-200/20 bg-black/60 px-4 py-3 text-xs uppercase tracking-[0.2em] text-cyan-100 hover:bg-cyan-200/10">
                    Previous
                  </button>

                  <img src={selectedMedia.src} alt={`Rupture ${selectedMedia.title}`} className="max-h-full max-w-full object-contain" />

                  <button onClick={nextMedia} className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border border-cyan-200/20 bg-black/60 px-4 py-3 text-xs uppercase tracking-[0.2em] text-cyan-100 hover:bg-cyan-200/10">
                    Next
                  </button>
                </div>

                <div className="border-t border-cyan-200/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">{selectedMedia.label}</p>
                      <h3 className="mt-1 text-xl uppercase tracking-[0.12em] text-white">{selectedMedia.title}</h3>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{selectedIndex + 1} / {ruptureGallery.length}</p>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {ruptureGallery.map((item, index) => {
                      const active = selectedMedia.title === item.title;
                      return (
                        <button key={item.title} onClick={() => setSelectedMedia(item)} className={`shrink-0 border p-1 transition ${active ? "border-cyan-200/70 bg-cyan-200/[0.08]" : "border-cyan-200/10 bg-black/40 hover:border-cyan-200/30"}`}>
                          <img src={item.src} alt={`Rupture ${item.title} carousel thumbnail`} className="h-16 w-24 object-cover" />
                          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">{String(index + 1).padStart(2, "0")}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {videoViewerOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[1250] flex items-center justify-center bg-black/95 p-5 backdrop-blur-xl md:p-10"
            >
              <div className="relative flex max-h-[86vh] w-full max-w-5xl flex-col overflow-hidden border border-cyan-200/15 bg-[#030712] shadow-[0_0_70px_rgba(34,211,238,0.16)]">
                <div className="flex h-12 shrink-0 items-center justify-between border-b border-cyan-200/10 bg-slate-950/95 px-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">TRAILER VIEWER</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">RUPTURE DEMO TRAILER</p>
                  </div>

                  <button
                    onClick={() => setVideoViewerOpen(false)}
                    className="border border-red-400/20 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-red-200 hover:bg-red-500/20"
                  >
                    Exit
                  </button>
                </div>

                <div
                  className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black p-4 md:p-6"
                  onMouseEnter={() => setVideoHovered(true)}
                  onMouseLeave={() => setVideoHovered(false)}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="relative mx-auto w-full max-w-4xl overflow-hidden border border-cyan-200/10 bg-black"
                  >
                    <video
                      src="/assets/rupture-demo-trailer.mp4"
                      controls={videoHovered}
                      autoPlay
                      className="block max-h-[68vh] w-full object-contain bg-black"
                    />

                    <div className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-screen">
                      <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:100%_4px]" />
                    </div>

                    <motion.div
                      animate={{ opacity: [0.03, 0.08, 0.04] }}
                      transition={{ duration: 0.18, repeat: Infinity, repeatType: "mirror" }}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"1.1\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.35\"/%3E%3C/svg%3E')",
                        backgroundSize: "180px 180px",
                      }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)]" />

                    {!videoHovered ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="pointer-events-none absolute bottom-5 right-5 border border-cyan-200/20 bg-black/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-sm"
                      >
                        Hover To Access Controls
                      </motion.div>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function RuptureLoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24 }}
      className="fixed inset-0 z-[998] flex items-center justify-center bg-[#020617] backdrop-blur-xl"
    >
      <div className="w-full max-w-xl border border-cyan-200/15 bg-black/40 p-8 shadow-[0_0_70px_rgba(34,211,238,0.12)]">
        <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-200">
          <span>RUPTURE_CASEFILE.exe</span>
          <span className="animate-pulse">ACCESSING</span>
        </div>

        <h2 className="title-tech text-4xl text-white md:text-5xl">MOUNTING RUPTURE</h2>
        <div className="mt-6 space-y-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
          <p>&gt; locating project archive...</p>
          <p>&gt; decrypting media index...</p>
          <p>&gt; loading trailer and gallery assets...</p>
          <p className="text-cyan-200">&gt; access granted</p>
        </div>

        <div className="mt-7 border border-cyan-200/15 bg-black/60 p-2">
          <div className="h-3 overflow-hidden bg-slate-900">
            <motion.div
              className="h-full bg-cyan-200"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArchiveWindow({ activeFolder, activeIndex, onBack, onOpenRupture }) {
  const directories = subdirectories[activeFolder.id] ?? [];
  const activePath = `${portfolioPath}\\${activeFolder.title}`;

  return (
    <motion.div key={activeFolder.id} initial={{ opacity: 0, scale: 0.98, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -18 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="relative min-h-[550px] overflow-hidden rounded-none border-cyan-200/15 bg-slate-950/82 shadow-2xl backdrop-blur-xl">
        <WindowBar>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={onBack}
              className="flex h-7 shrink-0 items-center justify-center border border-cyan-200/15 bg-black/30 px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-200/10"
            >
              Back
            </button>
            <IconForWindow folderId={activeFolder.id} />
            <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
              {activePath}
            </span>
          </div>
        </WindowBar>
        <CardContent className="p-6 md:p-8">
          <div className="relative grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Mounted Directory 0{activeIndex + 1}</p>
              <h2 className="title-tech mt-5 text-3xl leading-[1.1] md:text-5xl">{activeFolder.heading}</h2>
              <p className="body-tech mt-6 max-w-3xl text-[15px] uppercase tracking-[0.08em] text-slate-300/90">{activeFolder.body}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center justify-between border border-cyan-200/10 bg-black/20 p-3 text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:col-span-2">
                  <span>Subdirectories</span>
                  <span className="text-cyan-200">{directories.length} FOUND</span>
                </div>
                {directories.map((item, index) => {
                  const isRupture = activeFolder.id === "game-design" && item === "RUPTURE";
                  return (
                    <motion.button
                      key={item} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} onClick={() => isRupture && onOpenRupture()} className="group border border-cyan-200/10 bg-black/25 p-4 text-left transition duration-300 hover:border-cyan-200/25 hover:bg-cyan-200/[0.025] hover:shadow-[0_0_18px_rgba(34,211,238,0.06)]">
                      <p className="mb-2 font-mono text-[10px] text-cyan-200/70">DIR_{String(index + 1).padStart(2, "0")}</p>
                      <div className="flex items-center gap-3">
                        <Folder className="h-5 w-5 text-cyan-200/70" />
                        <p className="body-tech text-base leading-6 text-slate-200">{item}</p>
                      </div>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-slate-500 opacity-0 transition group-hover:opacity-100">
                        {isRupture ? "launch case file" : "open archive"}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
            <DiagnosticsPanel />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function MountingWindow({ folder, progress }) {
  return (
    <motion.div key={`mounting-${folder.id}`} initial={{ opacity: 0, scale: 0.98, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -18 }} transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="relative min-h-[550px] overflow-hidden rounded-none border-cyan-200/15 bg-slate-950/82 shadow-2xl backdrop-blur-xl">
        <WindowBar icon={Folder} title={`${portfolioPath}\\${folder.title}`} />
        <CardContent className="relative flex min-h-[510px] items-center justify-center overflow-hidden p-8">
          <div className="w-full max-w-xl border border-cyan-200/10 bg-black/25 p-8 text-center shadow-[0_0_18px_rgba(34,211,238,0.04)]">
            <Folder className="mx-auto mb-5 h-14 w-14 text-cyan-200/70" />
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-200">MOUNTING DIRECTORY</p>
            <h2 className="title-tech text-3xl leading-[1.1] md:text-5xl">{folder.title}</h2>
            <div className="mt-7 border border-cyan-200/15 bg-black/60 p-2">
              <div className="h-3 overflow-hidden bg-slate-900">
                <motion.div className="h-full bg-cyan-200" animate={{ width: `${progress}%` }} transition={{ duration: 0.08 }} />
              </div>
            </div>
            <div className="mt-5 text-left font-mono text-xs leading-6 text-cyan-100">
              <p>&gt; locating archive partition...</p>
              <p>&gt; decrypting {folder.tag}</p>
              <p>&gt; loading case file index... {progress}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EmptyArchiveWindow() {
  return (
    <motion.div key="choose-folder" initial={{ opacity: 0, scale: 0.98, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98, y: -18 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
      <Card className="relative min-h-[550px] overflow-hidden rounded-none border-cyan-200/15 bg-slate-950/82 shadow-2xl backdrop-blur-xl">
        <WindowBar icon={Folder} title={portfolioPath} />
        <CardContent className="relative flex min-h-[510px] items-center justify-center overflow-hidden p-8">
          <div className="max-w-xl border border-cyan-200/10 bg-black/25 p-8 text-center shadow-[0_0_18px_rgba(34,211,238,0.04)]">
            <Folder className="mx-auto mb-5 h-14 w-14 text-cyan-200/70" />
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-cyan-200">NO DIRECTORY MOUNTED</p>
            <h2 className="title-tech text-3xl leading-[1.1] md:text-5xl">ARCHIVE AWAITING INPUT</h2>
            <p className="body-tech mt-5 max-w-2xl text-[14px] uppercase tracking-[0.08em] text-slate-300/85">Select a root directory from the Archive Navigator to mount that archive partition and begin navigation.</p>
            <div className="mt-7 border border-cyan-200/10 bg-black/60 p-4 text-left font-mono text-xs leading-6 text-cyan-100">
              <p>&gt; waiting for input...</p>
              <p>&gt; no root directory mounted</p>
              <p>&gt; terminal accepts: HELP, DIR</p>
              <p className="animate-pulse">&gt; select_folder_</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function App() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [pendingFolder, setPendingFolder] = useState(null);
  const [mountProgress, setMountProgress] = useState(0);
  const [booted, setBooted] = useState(false);
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [ruptureOpen, setRuptureOpen] = useState(false);
  const [ruptureLoading, setRuptureLoading] = useState(false);

  useEffect(() => {
    runSmokeTests();
    const timer = window.setTimeout(() => setBooted(true), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setTerminalIndex((current) => (current + 1) % commandLines.length), 1800);
    return () => window.clearInterval(interval);
  }, []);

  const activeIndex = useMemo(() => (activeFolder ? folders.findIndex((folder) => folder.id === activeFolder.id) : -1), [activeFolder]);

  function mountFolder(folder) {
    setPendingFolder(folder);
    setMountProgress(0);
    setActiveFolder(null);
  }

  function launchRupture() {
    setRuptureLoading(true);
    window.setTimeout(() => {
      setRuptureLoading(false);
      setRuptureOpen(true);
    }, 1300);
  }

  useEffect(() => {
    if (!pendingFolder) return undefined;
    const interval = window.setInterval(() => {
      setMountProgress((current) => {
        if (current >= 100) {
          window.clearInterval(interval);
          setActiveFolder(pendingFolder);
          setPendingFolder(null);
          return 100;
        }
        if (current < 55) return current + 5;
        if (current < 82) return current + 3;
        if (current < 92) return current + 1;
        return Math.min(current + 2, 100);
      });
    }, 85);
    return () => window.clearInterval(interval);
  }, [pendingFolder]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070d] font-[IBM_Plex_Sans,Inter,ui-sans-serif,system-ui] text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        .display-tech { font-family: 'Space Grotesk', ui-sans-serif, system-ui; letter-spacing: 0.08em; font-weight: 700; text-transform: uppercase; }
        .title-tech { font-family: 'Space Grotesk', ui-sans-serif, system-ui; letter-spacing: 0.04em; font-weight: 700; text-transform: uppercase; }
        .body-tech { font-family: 'IBM Plex Sans', Inter, ui-sans-serif, system-ui; letter-spacing: 0.025em; line-height: 1.7; }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,7,18,0.98),rgba(15,23,42,0.96))]" />
      <motion.div
        className="absolute inset-0 bg-[linear-gradient(rgba(125,249,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(125,249,255,0.07)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.14]"
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <AnimatePresence>
        {!booted ? (
          <motion.div className="absolute inset-0 z-50 flex items-center justify-center bg-[#05070d]" exit={{ opacity: 0 }} transition={{ duration: 0.55 }}>
            <div className="text-center">
              <Cpu className="mx-auto mb-5 h-10 w-10 text-cyan-200" />
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200">Starting Waypoint Archive Shell</p>
              <div className="mt-6 h-1 w-72 overflow-hidden bg-slate-800">
                <motion.div className="h-full bg-cyan-200" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="relative z-10 mx-auto max-w-[1700px] cursor-default p-4 pb-24 md:p-8">
        <header className="mb-5 grid items-start gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border border-cyan-200/15 bg-slate-950/70 shadow-2xl backdrop-blur-xl transition duration-300">
            <WindowBar icon={Monitor} title="Desktop_Profile.exe" />
            <div className="relative overflow-hidden p-6 md:p-8 lg:pr-[360px]">
              <div className="absolute right-16 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <div className="relative overflow-hidden border border-cyan-200/20 bg-black/40 p-2 shadow-[0_0_28px_rgba(34,211,238,0.12)]">
                  <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />

                  <div className="relative h-[300px] w-[230px] overflow-hidden border border-cyan-200/10 bg-slate-950">
                    <img
                      src="/assets/michael-portrait.webp"
                      alt="Michael Joyce"
                      className="h-full w-full object-cover object-center grayscale-[10%] contrast-[1.05] brightness-[0.9] scale-[1.08]"
                    />

                    <div className="pointer-events-none absolute inset-0 opacity-[0.34] mix-blend-screen">
                      <div className="h-full w-full bg-[linear-gradient(to_bottom,rgba(255,255,255,0.28)_1px,transparent_1px)] bg-[size:100%_3px]" />
                    </div>

                    <motion.div
                      animate={{ opacity: [0.03, 0.08, 0.04] }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                      className="pointer-events-none absolute inset-0 opacity-80"
                      style={{
                        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\" viewBox=\"0 0 140 140\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"1.1\" numOctaves=\"2\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.35\"/%3E%3C/svg%3E')",
                        backgroundSize: "180px 180px",
                      }}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

                    <div className="absolute bottom-0 left-0 right-0 border-t border-cyan-200/10 bg-black/70 px-4 py-3 backdrop-blur-sm">
                      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cyan-200">WAYPOINT PROFILE</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-300">Michael Joyce</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-px w-40 bg-gradient-to-l from-cyan-200/30 to-transparent" />
              <p className="text-sm uppercase tracking-widest text-cyan-200">ARCHIVE SYSTEM ONLINE</p>
              <h1 className="display-tech mt-4 text-4xl leading-[0.98] tracking-[0.04em] md:text-6xl">Michael Joyce</h1>
              <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
                {["GAME DESIGNER", "3D ARTIST", "PROGRAMME DIRECTOR"].map((tag) => (
                  <div key={tag} className="border border-cyan-200/15 bg-cyan-200/[0.05] px-3 py-1 text-[11px] tracking-[0.16em] text-cyan-100/90 transition duration-300 hover:border-cyan-200/30 hover:bg-cyan-200/[0.08]">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button className="inline-flex h-11 items-center justify-center gap-2 rounded-none border border-cyan-100/30 bg-cyan-200 px-5 font-mono text-xs uppercase tracking-[0.18em] text-slate-950 shadow-[0_0_16px_rgba(103,232,249,0.10)] transition hover:bg-cyan-100">
                  <Download className="h-4 w-4 shrink-0" />
                  <span>DOWNLOAD CV</span>
                </Button>
                <Button className="inline-flex h-11 items-center justify-center gap-2 rounded-none border border-cyan-200/20 bg-slate-900/70 px-5 font-mono text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-200/10">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>CONTACT</span>
                </Button>
              </div>
            </div>
          </div>
          <TerminalPanel terminalIndex={terminalIndex} />
        </header>

        <section className="grid items-start gap-5 transition duration-300 lg:grid-cols-[340px_1fr]">
          <FileExplorer activeFolder={activeFolder || pendingFolder} onSelect={mountFolder} />
          <div className="relative">
            <AnimatePresence mode="wait">
              {pendingFolder ? (
                <MountingWindow folder={pendingFolder} progress={mountProgress} />
              ) : activeFolder ? (
                <ArchiveWindow activeFolder={activeFolder} activeIndex={activeIndex} onBack={() => setActiveFolder(null)} onOpenRupture={launchRupture} />
              ) : (
                <EmptyArchiveWindow />
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <AnimatePresence>{ruptureLoading ? <RuptureLoadingScreen /> : null}</AnimatePresence>
      <AnimatePresence>{ruptureOpen ? <RuptureViewer onClose={() => setRuptureOpen(false)} /> : null}</AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 z-20 flex h-14 items-center justify-between border-t border-cyan-200/15 bg-slate-950/85 px-3 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl transition duration-300 md:px-6">
        <div className="flex h-full items-center gap-3">
          <button
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyan-200/15 bg-cyan-200/10 transition hover:bg-cyan-200/20"
            aria-label="Open portfolio menu"
          >
            <Grid2X2 className="h-5 w-5 text-cyan-200" />
          </button>

          <div className="hidden h-10 min-w-[260px] items-center gap-2 border border-cyan-200/10 bg-black/30 px-4 text-xs text-slate-400 md:flex">
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Search archive records</span>
          </div>

          <div className="flex h-10 items-center gap-2 border border-cyan-200/20 bg-cyan-200/[0.08] px-4 text-xs text-cyan-100">
            <Folder className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Archive Link</span>
          </div>
        </div>
        <div className="flex h-full items-center gap-3 font-mono text-xs text-slate-400">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-cyan-200" />
          <span className="whitespace-nowrap">15:26 · WAYPOINT LINK ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
