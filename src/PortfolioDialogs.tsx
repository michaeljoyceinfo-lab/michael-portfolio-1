import React, { useState } from "react";
import { Download, Mail, Send, X } from "lucide-react";

type ModalProps = { onClose: () => void };

const section = "mb-5 border-b border-cyan-200/20 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200";
const field = "w-full rounded-none border border-cyan-200/25 bg-black/50 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-200";

export function CVViewer({ onClose }: ModalProps) {
  return <div role="dialog" aria-modal="true" aria-label="Curriculum vitae" className="fixed inset-0 z-[100] overflow-y-auto bg-[#05070d]/95 p-3 sm:p-8">
    <div className="mx-auto max-w-5xl border border-cyan-200/30 bg-[#0b1420] shadow-2xl">
      <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-200/20 bg-[#0b1420] p-4">
        <div className="font-mono text-xs tracking-widest text-cyan-200">PERSONNEL.FILE / MICHAEL_JOYCE_CV</div>
        <div className="flex items-center gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 border border-cyan-200/40 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-200/10"><Download size={15}/> PRINT / SAVE PDF</button>
          <button onClick={onClose} aria-label="Close CV" className="border border-cyan-200/20 p-2 hover:bg-cyan-200/10"><X size={18}/></button>
        </div>
      </div>
      <article id="portfolio-cv" className="space-y-7 p-5 text-sm leading-relaxed text-slate-200 sm:p-9">
        <header className="border-b border-cyan-200/20 pb-6">
          <h1 className="text-3xl font-bold text-white sm:text-5xl">Michael Joyce</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-cyan-200">Programme Director · Senior Lecturer · Game Designer · Artist</p>
          <a className="mt-3 inline-block text-cyan-100 underline" href="mailto:michaeljoyceinfo@gmail.com">michaeljoyceinfo@gmail.com</a>
          <p>michaeljoyceinfo.com</p>
        </header>
        <section><h2 className={section}>About me</h2><p>Programme Director and lecturer specialising in game design, interactive systems, and real-time production pipelines, currently leading the Games Development programme at Pulse College in partnership with Griffith College. I teach modules including Game Theory, Game Design & Architecture, Level Design & Interactions, and 3D Modelling & Environments, with a focus on studio-based, practice-led learning using industry tools such as Unreal Engine, Unity, Blender, ZBrush, Substance Painter, 3ds Max, Adobe Creative Suite, Figma, and Trello. My work includes curriculum development, programme validation aligned with QQI and NFQ Level 8 standards, and the supervision of final-year projects.</p></section>
        <div className="grid gap-8 md:grid-cols-2">
          <section><h2 className={section}>Experience</h2>
            <div className="mb-5"><p className="font-bold text-white">2024–2026 · Pulse College</p><p className="italic text-cyan-100">Programme Director & Senior Lecturer</p><p>Programme leadership, curriculum development, programme validation and academic management of undergraduate games programmes. Teaching game design, level design and 3D production; supervising final projects and student portfolios.</p></div>
            <div><p className="font-bold text-white">2019–2021 · Mersus Technologies</p><p className="italic text-cyan-100">Lead Creative Developer / Concept Artist</p><p>VR development, concept art, 3D asset production, scene development, team leadership, game-engine and 3D software training.</p></div>
          </section>
          <section><h2 className={section}>Education</h2>
            <div className="mb-4"><p className="font-bold text-white">2022–2023 · University of Galway</p><p>MA, Digital Art, Design & Cultures (Hons).</p></div>
            <div className="mb-4"><p className="font-bold text-white">2021–2022 · Trinity College Dublin</p><p>Postgraduate Degree, Interactive Digital Media</p></div>
            <div><p className="font-bold text-white">2016–2020 · Atlantic Technological University</p><p>Bachelor's Degree in Design (Hons)</p></div>
          </section>
        </div>
        <section><h2 className={section}>Skills</h2><p>Game Design · Level Design · Gameplay Systems Development · 3D Modelling & Environment Art · Concept Art · 2D/3D Character Design · Narrative Design · Unreal Engine · Unity · Blender · ZBrush · Substance Painter · 3ds Max · Adobe Creative Suite · Figma · Trello · Real-Time Production Pipelines · Curriculum Development · Programme Validation · Studio-Based Teaching · Project Leadership · Team Leadership & Mentoring · Industry Engagement & Collaboration</p></section>
        <section><h2 className={section}>Accomplishments</h2><ul className="list-disc space-y-2 pl-5"><li>Programme Director for Games Development at Pulse College, overseeing programme delivery, curriculum development, and student progression.</li><li>Co-led validation of the NFQ Level 8 BA (Hons) Animation degree in partnership with Griffith College.</li><li>Successfully led revalidation of the BA (Hons) Digital Art & Creative Technologies into a BA (Hons) Game Design programme aligned with QQI NFQ Level 8 standards.</li><li>Recognized as a Trusted Educator by IMIRT (Irish Game Makers Association).</li><li>Designed and delivered undergraduate modules in game design, level design, and 3D modelling.</li><li>Supervised student game development projects and final portfolios aligned with industry workflows.</li></ul></section>
        <p className="border-t border-cyan-200/20 pt-4 text-xs text-slate-400">Professional references available on request. This web version omits private third-party contact details.</p>
      </article>
    </div>
    <style>{`@media print { body * { visibility:hidden!important; } #portfolio-cv, #portfolio-cv * {visibility:visible!important;} #portfolio-cv {position:absolute;left:0;top:0;width:100%;color:#111!important;background:white!important;} #portfolio-cv * {color:#111!important;border-color:#aaa!important;} }`}</style>
  </div>;
}

export function ContactTerminal({ onClose }: ModalProps) {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [subject,setSubject] = useState("");
  const [message,setMessage] = useState("");
  function send(e: React.FormEvent) {
    e.preventDefault();
    const body = `From: ${name}\nReply-to: ${email}\n\n${message}`;
    window.location.href = `mailto:michaeljoyceinfo@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return <div role="dialog" aria-modal="true" aria-label="Contact Michael Joyce" className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#05070d]/95 p-3">
    <div className="w-full max-w-xl border border-cyan-200/30 bg-[#0b1420] p-5 shadow-2xl sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-3 border-b border-cyan-200/20 pb-4">
        <div><p className="font-mono text-xs tracking-widest text-cyan-200">WAYPOINT / COMMS TERMINAL</p><h2 className="mt-2 text-xl font-bold text-white">NEW TRANSMISSION</h2></div>
        <button onClick={onClose} aria-label="Close contact form" className="border border-cyan-200/20 p-2 hover:bg-cyan-200/10"><X size={18}/></button>
      </div>
      <form onSubmit={send} className="space-y-4">
        <label className="block text-xs tracking-widest text-cyan-200">IDENTIFICATION<input className={field+" mt-2"} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required maxLength={100}/></label>
        <label className="block text-xs tracking-widest text-cyan-200">RETURN ADDRESS<input className={field+" mt-2"} type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" required maxLength={200}/></label>
        <label className="block text-xs tracking-widest text-cyan-200">SUBJECT<input className={field+" mt-2"} value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Project enquiry" required maxLength={150}/></label>
        <label className="block text-xs tracking-widest text-cyan-200">TRANSMISSION<textarea className={field+" mt-2 min-h-32"} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Enter your message..." required maxLength={4000}/></label>
        <button type="submit" className="flex w-full items-center justify-center gap-2 border border-cyan-200/40 bg-cyan-200 px-4 py-3 font-mono text-xs font-bold tracking-widest text-slate-950 hover:bg-cyan-100"><Send size={16}/> OPEN EMAIL TO TRANSMIT</button>
      </form>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">Your email application opens with the message prepared. Review it and press Send there; this website does not send emails directly.</p>
      <a href="mailto:michaeljoyceinfo@gmail.com" className="mt-3 inline-flex items-center gap-2 text-xs text-cyan-200 underline"><Mail size={14}/> michaeljoyceinfo@gmail.com</a>
    </div>
  </div>;
}
