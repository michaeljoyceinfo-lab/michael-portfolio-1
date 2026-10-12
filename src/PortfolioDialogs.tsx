import React, { useState } from "react";
import { Download, Mail, Send, X } from "lucide-react";

type ModalProps = { onClose: () => void };

const section = "mb-5 border-b border-cyan-200/20 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-200";
const field = "w-full rounded-none border border-cyan-200/25 bg-black/50 p-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-200";

export function CVViewer({ onClose }: ModalProps) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Curriculum vitae" className="fixed inset-0 z-[100] overflow-y-auto bg-[#05070d]/95 p-3 sm:p-8">
      <div className="mx-auto max-w-5xl border border-cyan-200/30 bg-[#0b1420] shadow-2xl">
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-cyan-200/20 bg-[#0b1420] p-4">
          <div className="font-mono text-xs tracking-widest text-cyan-200">PERSONNEL.FILE / MICHAEL_JOYCE_CV</div>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/assets/MJ_CV_26.png" target="_blank" rel="noopener noreferrer" className="border border-cyan-200/30 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-200/10">OPEN FULL SIZE</a>
            <a href="/assets/MJ_CV_26.png" download="Michael_Joyce_CV.png" className="flex items-center gap-2 border border-cyan-200/40 px-3 py-2 text-xs text-cyan-100 hover:bg-cyan-200/10"><Download size={15}/> DOWNLOAD CV</a>
            <button onClick={onClose} aria-label="Close CV" className="border border-cyan-200/20 p-2 hover:bg-cyan-200/10"><X size={18}/></button>
          </div>
        </div>
        <div className="p-3 sm:p-6">
          <img src="/assets/MJ_CV_26.png" alt="Michael Joyce curriculum vitae" className="mx-auto h-auto w-full max-w-4xl bg-white" />
        </div>
      </div>
    </div>
  );
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
