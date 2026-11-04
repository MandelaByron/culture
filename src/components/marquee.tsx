import type { CSSProperties, ReactNode } from "react";
import Marquee from "react-fast-marquee";

// type MarqueeProps = {
//   children: ReactNode;
//   /** Seconds for one full loop. Higher is slower. */
//   duration?: number;
//   /** Reverse the scroll direction */
//   reverse?: boolean;
//   /** Pause while hovered */
//   pauseOnHover?: boolean;
//   className?: string;
// };


// export function Marquee({
//   children,
//   duration = 40,
//   reverse = false,
//   pauseOnHover = true,
//   className = "",
// }: MarqueeProps) {
//   return (
//     <div
//       className={`group flex w-full overflow-hidden ${className}`}
//       style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
//     >
//       {[0, 1].map((copy) => (
//         <div
//           key={copy}
//           // The second copy is a visual duplicate: hide it from screen readers
//           aria-hidden={copy === 1}
//           className={`flex min-w-full shrink-0 animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none ${
//             reverse ? "[animation-direction:reverse]" : ""
//           } ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
//         >
//           {children}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Marquee;