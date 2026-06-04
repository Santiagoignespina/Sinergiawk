"use client";
import { useState, useRef, useEffect } from "react";

interface AudioRecorderProps {
  onAudioReady: (blob: Blob | null) => void;
}

type RecordingState = "idle" | "recording" | "paused" | "done";

export default function AudioRecorder({ onAudioReady }: AudioRecorderProps) {
  const [state, setState] = useState<RecordingState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startTimer = () => {
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onAudioReady(blob);
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorder.start();
      setState("recording");
      setSeconds(0);
      startTimer();
    } catch {
      setError("No se pudo acceder al micrófono. Verificá los permisos.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.pause();
      setState("paused");
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current?.state === "paused") {
      mediaRecorderRef.current.resume();
      setState("recording");
      startTimer();
    }
  };

  const finishRecording = () => {
    if (mediaRecorderRef.current && (state === "recording" || state === "paused")) {
      mediaRecorderRef.current.stop();
      stopTimer();
      setState("done");
    }
  };

  const deleteAudio = () => {
    setAudioUrl(null);
    setSeconds(0);
    setState("idle");
    onAudioReady(null);
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex flex-col items-center gap-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-2 text-sm w-full text-center">
          {error}
        </div>
      )}

      {state === "done" ? (
        <div className="flex flex-col items-center gap-3 w-full bg-[#FF4D00]/5 rounded-xl p-4 border border-[#FF4D00]/20">
          <div className="flex items-center gap-2 text-[#FF4D00] text-sm font-semibold">
            <span>✓</span>
            <span>Audio grabado ({formatTime(seconds)})</span>
          </div>
          <audio src={audioUrl!} controls className="w-full max-w-xs" />
          <button
            type="button"
            onClick={deleteAudio}
            className="text-white/30 hover:text-white/60 text-xs transition-colors underline"
          >
            Grabar de nuevo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 w-full">
          {/* Botón principal: mic / pausa / reanudar */}
          <button
            type="button"
            onClick={
              state === "idle"
                ? startRecording
                : state === "recording"
                ? pauseRecording
                : resumeRecording
            }
            className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              state === "recording"
                ? "bg-red-500/20 ring-2 ring-red-400 ring-offset-2 ring-offset-transparent"
                : state === "paused"
                ? "bg-yellow-500/20 ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent"
                : "bg-[#FF4D00]/10 hover:bg-[#FF4D00]/20 border border-[#FF4D00]/30"
            }`}
          >
            {state === "recording" ? (
              <>
                {/* Pausa */}
                <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
              </>
            ) : state === "paused" ? (
              /* Play (reanudar) */
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              /* Micrófono */
              <svg className="w-8 h-8 text-[#FF4D00]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v7a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-7 9a7 7 0 0 0 14 0h2a9 9 0 0 1-8 8.94V23h-2v-2.06A9 9 0 0 1 3 12h2z" />
              </svg>
            )}
          </button>

          {/* Estado / timer */}
          {state === "recording" && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span className="font-bold text-red-400 text-sm">{formatTime(seconds)}</span>
              <span className="text-white/40 text-sm">Grabando...</span>
            </div>
          )}
          {state === "paused" && (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="font-bold text-yellow-400 text-sm">{formatTime(seconds)}</span>
              <span className="text-white/40 text-sm">En pausa</span>
            </div>
          )}
          {state === "idle" && (
            <p className="text-white/40 text-sm">Presioná para grabar tu mensaje</p>
          )}

          {/* Botón terminar (visible solo mientras graba o pausa) */}
          {(state === "recording" || state === "paused") && (
            <button
              type="button"
              onClick={finishRecording}
              className="flex items-center gap-2 bg-[#FF4D00]/15 hover:bg-[#FF4D00]/25 border border-[#FF4D00]/40 text-[#FF4D00] font-semibold text-sm px-5 py-2 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="5" y="5" width="14" height="14" rx="2" />
              </svg>
              Terminar grabación
            </button>
          )}
        </div>
      )}
    </div>
  );
}
