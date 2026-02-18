import { motion } from "framer-motion";
import "../styles/PageHero.css";

export default function PageHero({ badge, title, accent, subtitle, bottomFill = "#ffffff" }) {
  return (
    <section className="page-hero" dir="rtl">
      <div className="page-hero__bg" />

      {/* wave pattern layer */}
      <div className="page-hero__pattern" aria-hidden="true">
        <svg className="page-hero__patternSvg" viewBox="0 0 1440 200" fill="none">
          <path
            d="M0 100L48 91.7C96 83.3 192 66.7 288 66.7C384 66.7 480 83.3 576 91.7C672 100 768 100 864 91.7C960 83.3 1056 66.7 1152 58.3C1248 50 1344 50 1392 50L1440 50V200H0V100Z"
            fill="white"
            opacity="0.18"
          />
        </svg>
      </div>

      {/* bottom wave */}
      <div className="page-hero__bottomWave" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" className="page-hero__bottomWaveSvg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
            fill={bottomFill}
          />
        </svg>
      </div>



      <div className="page-hero__container">
        {badge ? (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="page-hero__badge"
          >
            {badge}
          </motion.div>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="page-hero__title"
        >
          {title} {accent ? <span className="page-hero__titleAccent">{accent}</span> : null}
        </motion.h1>

        {subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="page-hero__subtitle"
          >
            {subtitle}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}
