// Audio synthesis for royal chime sounds using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a royal harp / chime chord
 */
export function playChimeChord(isMuted: boolean = false) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Pentatonic celestial frequencies: F#4, A#4, C#5, D#5, F#5, G#5
  const notes = [370.0, 466.16, 554.37, 622.25, 739.99, 830.61];

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + idx * 0.08);

    gain.gain.setValueAtTime(0, now + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 2.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.08);
    osc.stop(now + idx * 0.08 + 2.3);
  });
}

/**
 * Play soaring phoenix flight sound: ascending celestial sweep with flame shimmer
 */
export function playPhoenixFlightSound(isMuted: boolean = false) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Ascending majestic harmonics
  const freqs = [293.66, 369.99, 440.0, 554.37, 659.25, 880.0, 1108.73];
  freqs.forEach((baseFreq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = i % 2 === 0 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now + i * 0.12);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + i * 0.12 + 1.8);

    gain.gain.setValueAtTime(0, now + i * 0.12);
    gain.gain.linearRampToValueAtTime(0.06, now + i * 0.12 + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 2.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.12);
    osc.stop(now + i * 0.12 + 2.5);
  });
}
