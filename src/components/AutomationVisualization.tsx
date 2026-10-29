"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bot, Database, Mail, Send, MessageSquare } from "lucide-react";

/**
 * Интерактивная SVG-визуализация системы автоматизации:
 * центральный AI-агент, узлы CRM / Telegram / Email / БД,
 * линии с бегущими пакетами данных и карточки событий.
 */

const W = 460;
const H = 380;
const CENTER = { x: W / 2, y: H / 2 };

interface NodeDef {
  id: string;
  label: string;
  icon: typeof Bot;
  x: number;
  y: number;
  color: string;
}

const nodes: NodeDef[] = [
  { id: "crm", label: "CRM", icon: Database, x: 70, y: 64, color: "#8B5CF6" },
  { id: "tg", label: "Telegram", icon: Send, x: 390, y: 64, color: "#67E8F9" },
  { id: "mail", label: "Email", icon: Mail, x: 60, y: 312, color: "#A78BFA" },
  { id: "db", label: "База данных", icon: MessageSquare, x: 400, y: 312, color: "#67E8F9" },
];

function edgePath(n: NodeDef) {
  // Плавная кривая от узла к центру
  const mx = (n.x + CENTER.x) / 2;
  const my = (n.y + CENTER.y) / 2;
  return `M ${n.x} ${n.y} Q ${mx} ${n.y} ${CENTER.x} ${CENTER.y}`;
}

const events = [
  { text: "Лид обработан", delay: 0.4, top: "12%", left: "4%" },
  { text: "Задача создана", delay: 2.2, top: "44%", right: "2%" },
  { text: "Ответ отправлен", delay: 4.1, top: "78%", left: "8%" },
];

export default function AutomationVisualization() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
      {/* Мягкое свечение под панелью */}
      <div className="absolute -inset-8 rounded-[2.5rem] bg-accent/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface/70 p-4 backdrop-blur-sm">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Линии связей */}
          {nodes.map((n) => (
            <g key={`edge-${n.id}`}>
              <motion.path
                d={edgePath(n)}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 1, delay: reduce ? 0 : 0.3 }}
              />
              {/* Бегущий пакет данных (CSS-анимация, уважает prefers-reduced-motion через global CSS) */}
              {!reduce && (
                <circle r="3.5" fill={n.color} className="packet">
                  <animateMotion
                    dur="3.2s"
                    repeatCount="indefinite"
                    begin={`${nodes.indexOf(n) * 0.8}s`}
                    path={edgePath(n)}
                    rotate="auto"
                  />
                </circle>
              )}
            </g>
          ))}

          {/* Узлы */}
          {nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reduce ? 0 : 0.5 + i * 0.12, duration: 0.4 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r="26" fill="#101218" stroke="rgba(255,255,255,0.14)" />
              <circle cx={n.x} cy={n.y} r="26" fill="none" stroke={n.color} strokeOpacity="0.35" strokeWidth="1.5" />
              <text
                x={n.x}
                y={n.y + 44}
                textAnchor="middle"
                fill="#989EAA"
                fontSize="11"
                fontFamily="inherit"
              >
                {n.label}
              </text>
              <foreignObject x={n.x - 11} y={n.y - 11} width="22" height="22">
                <n.icon size={22} color={n.color} strokeWidth={1.6} />
              </foreignObject>
            </motion.g>
          ))}

          {/* Центральный AI-агент */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reduce ? 0 : 0.2, duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
          >
            {!reduce && (
              <circle cx={CENTER.x} cy={CENTER.y} r="40" fill="none" stroke="#8B5CF6" strokeOpacity="0.25">
                <animate attributeName="r" values="38;52;38" dur="4s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="4s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={CENTER.x} cy={CENTER.y} r="34" fill="#14161f" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
            <circle cx={CENTER.x} cy={CENTER.y} r="34" fill="url(#core-glow)" />
            <foreignObject x={CENTER.x - 15} y={CENTER.y - 15} width="30" height="30">
              <Bot size={30} color="#F5F7FA" strokeWidth={1.5} />
            </foreignObject>
            <text x={CENTER.x} y={CENTER.y + 56} textAnchor="middle" fill="#F5F7FA" fontSize="12" fontWeight="600" fontFamily="inherit">
              AI-агент
            </text>
            <defs>
              <radialGradient id="core-glow">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </motion.g>
        </svg>

        {/* Карточки событий */}
        {events.map((e) => (
          <motion.div
            key={e.text}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : e.delay, duration: 0.4 }}
            className="absolute rounded-lg border border-white/10 bg-base/80 px-3 py-2 text-xs text-ink shadow-glow-sm backdrop-blur-sm"
            style={{ top: e.top, left: e.left, right: e.right }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyanish align-middle" />
            {e.text}
          </motion.div>
        ))}
      </div>

      {/* Статусная строка панели */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] bg-surface/60 px-4 py-2.5 text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Система активна · 24/7
        </span>
        <span>очередь: 0 ошибок</span>
      </div>
    </div>
  );
}
